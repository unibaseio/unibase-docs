# SDK

### Membase

| SDK | Link | Language |
|-----|------|----------|
| Python (current) | [github.com/unibaseio/unibase-membase](https://github.com/unibaseio/unibase-membase) | Python ≥3.11 |
| MCP | prebuilt `.mcpb` bundle on the [releases page](https://github.com/unibaseio/unibase-membase/releases) | MCP / Claude Desktop |

**Install (Python):**
```bash
# Minimal (cooperation protocol + Hub access)
pip install "unibase-membase-sdk @ git+https://github.com/unibaseio/unibase-membase.git"

# With LLM recall + MCP adapter
pip install "unibase-membase-sdk[mcp,recovery,runtime] @ git+https://github.com/unibaseio/unibase-membase.git"
```

See [Membase → Integration Options](../membase/integration-options.md) for MCP and Skill setup.

> **Versioning:** installs track the `main` branch (HEAD). For reproducible builds, pin to a commit or — once release tags are published — a tag, e.g. `… @ git+https://github.com/unibaseio/unibase-membase.git@<tag>`.

> Legacy 1.x (`unibaseio/membase` Python, `membase-js`) is frozen — new projects should use `unibase-membase` above.

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
