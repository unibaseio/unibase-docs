---
title: "Membase"
---

Distributed memory infrastructure for AI agents. Each agent owns an Ethereum wallet, **signs every write**, and controls who can read what through **Domains**. Memory survives across sessions and devices; multi-agent **sessions** coordinate tasks with no central referee; **settlement** closes economic loops on-chain.

AI agents need more than an ephemeral context window. They need to:

* **Remember** — across sessions and devices, as recall-ready memory, not raw logs.
* **Collaborate** — with other agents, over shared state any party can verify.
* **Transact** — pay and get paid for services, on-chain.

Membase delivers all three in one SDK, with **no central backend in the trust path**: agents read and write the [Membase Hub](https://hub.membase.com) directly with their own key, and confidentiality comes from client-side encryption — not server ACLs.

### 30-second example

> The protocol SDK is not published — its repository is private. If you do not have access, install the shipping product instead (`pip install unibaseio-membase`) and use [docs.membase.com](https://docs.membase.com); it is a different API and the code below will not run against it. See [Integration Options](/membase/integration-options/).

```bash
pip install "unibase-membase-sdk @ git+https://github.com/unibaseio/membase-protocol.git"
```

```python
from unibase_membase import Membase, Wallet

alice = Membase(Wallet.from_env())          # MEMBASE_PRIVATE_KEY

# Private memory — only alice's wallet can decrypt
alice.private().set("notes/today", {"v": "ship the agent-direct evolution"})

# Recall — distilled, deterministic, runs on alice's own machine
alice.memory.ingest(turns=[
    {"role": "user", "content": "I'll go to Tokyo in November 2026."},
    {"role": "user", "content": "Actually, moving the trip to August 2026."},
])
print(alice.memory.answer("When is the Tokyo trip?", query_date="2026-08-01"))
# → {'answer': 'August 2026', ...}
```

### Core concepts

| Concept | One line |
|---|---|
| **Wallet** | The agent's identity + signing key. The address is who it is. |
| **Domain** | A 32-byte key shared by an opt-in set of wallets → who can decrypt. Private memory = a single-member domain. |
| **Memory** | Content-addressed KV with signed pointers (raw), plus on-device **recall** (observations + retrieval). |
| **Protocol** | Per-wallet append-only logs of signed entries → multi-agent collaboration, third-party replayable. |
| **Settlement** | Off-chain metering, settled on-chain via ERC-8183. |

### Integration options

| Option | Best for | Setup |
|---|---|---|
| **SDK** | Custom agents, full control | Private repo — see [Integration Options](/membase/integration-options/) |
| **MCP** | Claude Desktop, Cline, MCP clients | Install the `.mcpb` bundle — see [Integration Options](/membase/integration-options/) |
| **Skill** | BitAgent / skill-based frameworks | Install the skill, configure — no code |

### Next steps

* [Quick Start](/membase/quick-start/) — first agent: identity → memory → recall
* [Architecture](/membase/architecture/) — the agent-direct, four-layer design
* [Wallet & Identity](/membase/identity/) · [Domains & Encryption](/membase/authorization/)
* [Memory & Recall](/membase/memory/) · [Cooperation Protocol](/membase/cooperation/) · [Settlement](/membase/settlement/)
* [Storage Backends](/membase/storage-backends/) — the hot Hub, or Unibase DA for verifiable durability
* [Integration Options](/membase/integration-options/)

### Resources

* [Membase Hub](https://hub.membase.com) · the published product: [docs.membase.com](https://docs.membase.com), [github.com/unibaseio/membase](https://github.com/unibaseio/membase)
