# SDK Reference

The Membase Python API at a glance (`unibase-membase-sdk`). Import everything from the top-level package:

```python
from unibase_membase import Membase, Wallet
```

### Wallet

| Call | Returns | Notes |
|---|---|---|
| `Wallet.from_env()` | `Wallet` | from `MEMBASE_PRIVATE_KEY` |
| `Wallet.from_key("0x…")` | `Wallet` | from a raw private key |
| `Wallet.generate()` | `Wallet` | fresh keypair |
| `wallet.address` | `str` | the agent's identity (0x…) |

### Agent

```python
agent = Membase(wallet, config=None, *, hub=None, server_url="")
```

* `config` — optional `Config` / dict (see [below](#configuration)); defaults otherwise.
* `hub` — inject a custom storage backend; defaults to the official Hub.
* `server_url` — set to enable metering / settlement via a Membase Server.
* `agent.address` — the wallet address. `agent.close()` — flush & release.

### Memory — key-value

```python
agent.private()                       # → handle for this wallet's private domain
handle.set(key: str, value)           # value: JSON-serializable
handle.get(key: str, *, author=None)  # → value | None
```

`key` is a path-like string (e.g. `"notes/today"`). `private()` is a single-member domain — only this wallet can decrypt.

### Memory — recall

```python
agent.memory.ingest(turns=[{"role": "user", "content": "..."}],
                    session_id=None, session_date=None)   # distill turns (Recovery)
agent.memory.recall(query: str, query_date: str, k: int = 10)  # ranked candidates, no LLM
agent.memory.answer(query: str, query_date: str)               # NL answer + citations (one LLM call)
```

`ingest` / `answer` need the `recovery,runtime` extras + an LLM key. `query_date` (ISO `YYYY-MM-DD`) scopes results to facts valid on that date.

### Domains (shared memory)

```python
team = agent.create_domain(domain_id: str)   # mint a domain key
team.set(key, value); team.get(key, author=agent.address)

code, _ = agent.invite_to(team)              # ECIES-wrapped key
handle, _ = other_agent.accept_invite(code)  # join the domain
```

See [Domains & Encryption](authorization.md).

### Cooperation (multi-agent)

The agent-direct protocol (signed logs, sessions, games) lives under `unibase_membase.core.protocol` and `unibase_membase.games` (`rps`, `vote`, `auction`, `compare`). For a server-mediated coordination API use `Cooperation` / `MembaseClient`. See [Cooperation Protocol](cooperation.md) and [`examples/04_protocol.py`](https://github.com/unibaseio/unibase-membase/blob/main/examples/04_protocol.py).

### Settlement (server-mediated)

```python
from unibase_membase.client import MembaseClient
client = MembaseClient(wallet=wallet, server_url="https://…")
await client.settle_metering()        # flush metered usage on-chain (ERC-8183)
```

See [Settlement](settlement.md).

### Configuration

Pass a dict or `Config` instead of env vars (secrets stay in env):

```python
from unibase_membase.client import MembaseClient
client = MembaseClient(
    wallet=Wallet.from_key(os.environ["MY_AGENT_KEY"]),
    config={"server": {"hub_url": "https://hub.membase.unibase.com"},
            "runtime": {"reader_model": "gpt-4o"}},
)
```

`Config.from_json("path.json")` and `Config.from_dict({...})` also work. Unknown keys raise (typos won't pass silently).

> Full, runnable examples: [`examples/`](https://github.com/unibaseio/unibase-membase/tree/main/examples) (grouped by layer: persistence → recovery → runtime → cooperation).
