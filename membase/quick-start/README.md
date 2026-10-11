# Quick Start

Build your first agent: identity → private memory → shared domain → recall.

### 1. Install & set a key

> The protocol SDK is not published — its repository is private. If you do not have access, install the shipping product instead (`pip install unibaseio-membase`) and use [docs.membase.ai](https://docs.membase.ai); it is a different API and the code below will not run against it. See [Integration Options](../integration-options.md).

```bash
pip install "unibase-membase-sdk[recovery,runtime] @ git+https://github.com/unibaseio/membase-protocol.git"
export MEMBASE_PRIVATE_KEY="0x..."     # or omit and use Wallet.generate()
```

The `[recovery,runtime]` extras enable `memory.ingest` / `memory.answer`. Drop them for raw KV + cooperation only.

### 2. Create an agent

```python
from unibase_membase import Membase, Wallet

agent = Membase(Wallet.from_env())     # identity = wallet address
print(agent.address)
```

### 3. Private memory

Only this wallet can decrypt — a single-member [domain](../authorization.md).

```python
agent.private().set("profile/lang", {"value": "zh"})
print(agent.private().get("profile/lang"))   # → {"value": "zh"}
```

### 4. Shared memory across agents

```python
alice = Membase(Wallet.from_env())
bob   = Membase(Wallet.generate())

team = alice.create_domain("team:engineering")
team.set("roadmap/q3", {"goal": "ship the agent-direct evolution"})

code, _ = alice.invite_to(team)              # ECIES-wrapped key
bob_team, _ = bob.accept_invite(code)
print(bob_team.get("roadmap/q3", author=alice.address))
# → {'goal': 'ship the agent-direct evolution'}
```

### 5. Recall (ask about the past)

```python
agent.memory.ingest(turns=[
    {"role": "user", "content": "I'll go to Tokyo in November 2026."},
    {"role": "user", "content": "Actually, moving the trip to August 2026."},
])
print(agent.memory.answer("When is the Tokyo trip?", query_date="2026-08-01"))
# → {'answer': 'August 2026', ...}
```

### Next

* [Memory & Recall](../memory.md) · [Domains & Encryption](../authorization.md)
* [Cooperation Protocol](../cooperation.md) — multi-agent sessions & games
* [Settlement](../settlement.md) — on-chain metering
* Runnable examples: `examples/` in the private `membase-protocol` repository
