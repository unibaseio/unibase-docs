# Memory & Recall

Membase memory has two faces:

* **Raw memory** — a content-addressed key-value store on the Hub. Durable, signed, encrypted. The lossless record.
* **Recall memory** — distilled, queryable memory on the agent's own machine, so the agent can answer questions about its past **without** replaying raw history into a prompt.

### Raw key-value memory

Values are content-addressed (CID = SHA256) and carried by a signed pointer. Keys are structured as `{domain}/{key}`.

```python
alice.private().set("profile/lang", {"value": "zh"})
alice.private().get("profile/lang")          # → {"value": "zh"}
```

Raw memory survives restarts and syncs across the user's devices via a wallet-derived key — no third party in the middle.

### Recall: ingest → recall / answer

Raw turns are not directly usable at inference time: they contain contradictions ("Tokyo in November" → "actually August") and overflow the context window. Membase splits the work in two:

* **Recovery** (offline, once per session) distills turns into immutable **observations**, linked by typed **supersession edges** ("which fact wins"). Re-runnable and content-hashed, so it's safe to replay.
* **Runtime** (online) answers queries over that store with a deterministic, multi-lane retrieval pipeline — **no LLM on the read path** for `recall`.

```python
alice.memory.ingest(turns=[
    {"role": "user", "content": "I'll go to Tokyo in November 2026."},
    {"role": "user", "content": "Actually, moving the trip to August 2026."},
])

# Deterministic, sub-second, no LLM — returns ranked candidates with citations
alice.memory.recall("When is the Tokyo trip?", query_date="2026-08-01")

# Same pipeline + one Reader LLM call → a natural-language answer with citations
alice.memory.answer("When is the Tokyo trip?", query_date="2026-08-01")
# → {'answer': 'August 2026', ...}
```

`recall` returns ranked observations/sessions/turns; `answer` adds a single Reader-model call on top. The Reader model is configurable independently of your app's chat model.

### Currency by date

Every observation carries a validity window. A query at `query_date=d` returns only observations valid at `d` — so a superseded fact (November) is filtered out once a newer one (August) arrives, and historical queries ("what did I plan in July?") still resolve. The decision is made once at ingest; the read path just applies a range check.

### Where it runs

Both `recall` and `answer` run on the agent's machine against its local store (SQLite + FAISS). The Hub and chain are not in the loop unless you opt into cross-device sync or on-chain metering.

> `ingest` / `answer` need the LLM extras: install with `unibase-membase-sdk[recovery,runtime]`.
