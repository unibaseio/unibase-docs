# Membase Quick Start

Give an AI agent persistent, owned memory in 5 minutes.

### 1. Install

```bash
pip install "unibase-membase-sdk[recovery,runtime] @ git+https://github.com/unibaseio/unibase-membase.git"
```

The `[recovery,runtime]` extras enable LLM recall (`memory.ingest` / `memory.answer`). Omit them for raw KV + cooperation only.

### 2. Set a key (optional)

```bash
export MEMBASE_PRIVATE_KEY="0x..."     # or skip it and use Wallet.generate()
```

The wallet **is** the agent's identity — no account to register.

### 3. First agent

```python
from unibase_membase import Membase, Wallet

agent = Membase(Wallet.from_env())     # or Wallet.generate()

# Private memory — only this wallet can decrypt
agent.private().set("notes/today", {"v": "Hello! I have persistent memory now."})
print(agent.private().get("notes/today"))
```

### 4. Recall

```python
agent.memory.ingest(turns=[
    {"role": "user", "content": "I'll go to Tokyo in November 2026."},
    {"role": "user", "content": "Actually, moving the trip to August 2026."},
])
print(agent.memory.answer("When is the Tokyo trip?", query_date="2026-08-01"))
# → {'answer': 'August 2026', ...}
```

Synced memory is verifiable on the [Membase Hub](https://hub.membase.unibase.com).

---

### Next steps

* [Full Quick Start](../membase/quick-start/README.md) — identity, domains, recall
* [Architecture](../membase/architecture.md) · [Integration Options](../membase/integration-options.md) — SDK, MCP, Skill
