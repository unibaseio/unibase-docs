# Membase

Distributed memory infrastructure for AI agents. Each agent owns an Ethereum wallet, **signs every write**, and controls who can read what through **Domains**. Memory survives across sessions and devices; multi-agent **sessions** coordinate tasks with no central referee; **settlement** closes economic loops on-chain.

AI agents need more than an ephemeral context window. They need to:

* **Remember** — across sessions and devices, as recall-ready memory, not raw logs.
* **Collaborate** — with other agents, over shared state any party can verify.
* **Transact** — pay and get paid for services, on-chain.

Membase delivers all three in one SDK, with **no central backend in the trust path**: agents read and write the [Membase Hub](https://hub.membase.unibase.com) directly with their own key, and confidentiality comes from client-side encryption — not server ACLs.

### 30-second example

```bash
pip install "unibase-membase-sdk @ git+https://github.com/unibaseio/unibase-membase.git"
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
| **SDK** | Custom agents, full control | `pip install "unibase-membase-sdk @ git+…/unibase-membase.git"` |
| **MCP** | Claude Desktop, Cline, MCP clients | Install the `.mcpb` bundle — see [Integration Options](integration-options.md) |
| **Skill** | BitAgent / skill-based frameworks | Install the skill, configure — no code |

### Next steps

* [Quick Start](quick-start/README.md) — first agent: identity → memory → recall
* [Architecture](architecture.md) — the agent-direct, four-layer design
* [Wallet & Identity](identity.md) · [Domains & Encryption](authorization.md)
* [Memory & Recall](memory.md) · [Cooperation Protocol](cooperation.md) · [Settlement](settlement.md)
* [Integration Options](integration-options.md)

### Resources

* [GitHub](https://github.com/unibaseio/unibase-membase) · [Membase Hub](https://hub.membase.unibase.com)
