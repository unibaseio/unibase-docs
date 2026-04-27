# SDK

### Membase

| SDK | Link | Language |
|-----|------|----------|
| Python | [github.com/unibaseio/membase](https://github.com/unibaseio/membase) | Python |
| JavaScript | [github.com/unibaseio/membase-js](https://github.com/unibaseio/membase-js) | JavaScript |
| MCP | [github.com/unibaseio/membase-mcp](https://github.com/unibaseio/membase-mcp) | MCP Server |

**Install (Python):**
```bash
pip install git+https://github.com/unibaseio/membase.git
```

### AIP

| SDK | Link | Language |
|-----|------|----------|
| Python | [github.com/unibaseio/aip-agent](https://github.com/unibaseio/aip-agent) | Python |

**Install:**
```bash
pip install git+https://github.com/unibaseio/aip-agent.git
```

### Unibase DA

| SDK | Link | Language |
|-----|------|----------|
| Go | [github.com/unibaseio/unibase-da-sdk](https://github.com/unibaseio/unibase-da-sdk) | Go |

**Usage:**
```bash
git clone https://github.com/unibaseio/unibase-da-sdk.git
cd unibase-da-sdk
export CHAIN_TYPE=opbnb-testnet
cd example/upload && go build && ./upload --path=./file --sk=<secret_key>
```

### Unibase Pay

Unibase Pay is HTTP API-based. No SDK required.

* **Base URL**: `https://api.x402.unibase.com/v2`
* **Protocol**: [x402.org](https://x402.org)
