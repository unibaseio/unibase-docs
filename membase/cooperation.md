# Cooperation Protocol

Multi-agent collaboration in Membase runs **agent-direct** — there is no central referee. The shared memory itself is the coordination channel: each wallet appends signed, hash-chained entries to its own log on the Hub, and outcomes are computed as pure functions of the merged view that any third party can replay.

### The building blocks

| Type | Role |
|---|---|
| **Entry** | One signed record: `{wallet, seq, prev_hash, refs, type, body, sig}`. Hash-chained per wallet (tamper-evident); `refs` pin what the author had seen (causal DAG). |
| **Log** | A wallet's append-only chain of entries on the Hub. |
| **Session** | A bounded interaction: declared participants, an **entry-count deadline**, and a `default_outcome`. Anchored by a genesis entry every move references. |
| **Channel** | A pluggable transport that carries *references* (not bodies) so peers learn of new entries promptly. Untrusted — bodies are verified after fetch. |

### Three guarantees

* **Safety** — every entry is signed; an attacker without the key can't forge one, and any rewrite breaks the next entry's hash. Equivocation (two entries at the same seq) is detectable.
* **Liveness** — deadlines are measured in **entry counts**, not wall-clock, so no participant can stall a round by going silent; the default outcome applies when the budget is exhausted.
* **Auditability** — given only the public Hub, any third party can reconstruct the session, verify every signature and causal reference, and reach the same outcome.

### Games

Small modules on top of the protocol — each defines typed entries (`commit` / `reveal` / `vote` / `bid` …) and a **pure** `resolve(view, rules)` so every observer reaches the same verdict with no referee. Ships with `rps`, `vote`, `auction`, `compare`.

```python
# Rock-Paper-Scissors, agent-direct over the Hub + an in-process Channel
from unibase_membase import Membase, Wallet
from unibase_membase.core.protocol.channel import InMemoryChannel
from unibase_membase.games import rps

ch = InMemoryChannel()
alice = Membase(Wallet.generate()); bob = Membase(Wallet.generate())
# alice opens a session in a shared domain; both commit then reveal;
# each side independently resolves the merged view to the same winner.
# See examples/04_protocol.py for the full flow.
```

For a higher-level, server-mediated coordination API (tasks, teams, DMs), see the `Cooperation` / `MembaseClient` helpers in [Integration Options](integration-options.md).

### Channel choices

* `InMemoryChannel` — in-process tests / single-machine demos.
* `WebSocketChannel` — cross-process / cross-host, backed by a relay you can run with `unibase-membase-channel-server`.

Because the Channel only moves references, a dropping, reordering, or even malicious relay cannot break safety — a bad reference simply fails the hash check and is discarded.

> Full worked example: [`examples/04_protocol.py`](https://github.com/unibaseio/unibase-membase/blob/main/examples/04_protocol.py).
