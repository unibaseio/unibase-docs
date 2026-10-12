---
title: "SDK"
---

### Membase

| SDK | Package | Language |
|-----|---------|----------|
| Python | [`unibaseio-membase`](https://pypi.org/project/unibaseio-membase/) | Python ≥3.10 |
| TypeScript | [`@unibaseio/membase`](https://www.npmjs.com/package/@unibaseio/membase) | Node ≥18, Deno, Bun |
| Command line | [`@unibaseio/membase-cli`](https://www.npmjs.com/package/@unibaseio/membase-cli) | the `membase` command, Node ≥18.3 |
| MCP | hosted endpoint, or `membase --local mcp` | any MCP client |

**Install:**
```bash
pip install unibaseio-membase              # hosted; needs MEMBASE_API_KEY
pip install 'unibaseio-membase[local]'     # local engine; Python 3.12 or 3.13
npm install @unibaseio/membase
npm install -g @unibaseio/membase-cli
```

```python
from membase import Membase

m = Membase()
m.memories.add("We picked Postgres for the ledger service.", container="Engineering")
m.ask("Which database did we choose for the ledger?")
```

Source: [github.com/unibaseio/membase-ai](https://github.com/unibaseio/membase-ai). Full method,
REST and MCP reference: [docs.membase.ai](https://docs.membase.ai).

> `local` is the only extra. It pulls in `unibaseio-membase-core`, the compiled memory engine,
> which supports **Python 3.12 and 3.13 only** — the hosted client alone runs on 3.10+.

> **This is not the same SDK as the [Membase](/membase/) section of these docs.** That
> section documents the protocol SDK — wallet identity, domains, cooperation, settlement — which
> is a separate codebase (`unibaseio/membase-protocol`, private) and is not published. The
> packages above are the shipping product: one hosted memory with containers, documents and MCP.
> They share a name and nothing else; `create_domain`, `Wallet` and `unibase_membase` do not
> exist in them.

> Legacy 1.x (`membase-js`) is frozen. Note that `membase` on PyPI and `membase` / `@membase` on
> npm belong to unrelated parties — the Unibase packages are the `unibaseio` ones above.

### AIP

| SDK | Link | Language |
|-----|------|----------|
| Go | [github.com/unibaseio/aip-go-sdk](https://github.com/unibaseio/aip-go-sdk) | Go |
| Python | [github.com/unibaseio/unibase-aip-sdk](https://github.com/unibaseio/unibase-aip-sdk) (`aip_sdk`) | Python |

**Install:**
```bash
go get github.com/unibaseio/aip-go-sdk
# Python:
pip install git+https://github.com/unibaseio/unibase-aip-sdk.git
```

### Unibase DA

| SDK | Link | Language |
|-----|------|----------|
| Go | [github.com/unibaseio/unibase-da-sdk](https://github.com/unibaseio/unibase-da-sdk) | Go |

**Usage:**
```bash
git clone https://github.com/unibaseio/unibase-da-sdk.git
cd unibase-da-sdk
export CHAIN_TYPE=base-sepolia
cd example/upload && go build && ./upload --path=./file --sk=<secret_key>
```

### Unibase Pay

Unibase Pay is HTTP API-based. No SDK required.

* **Base URL**: `https://api.x402.unibase.com/v2`
* **Protocol**: [x402.org](https://x402.org)
