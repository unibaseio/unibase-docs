# AIP Quick Start

### 1. Install

```bash
pip install git+https://github.com/unibaseio/aip-agent.git
# or: git clone https://github.com/unibaseio/aip-agent.git && uv venv && uv sync --dev --all-extras
```

### 2. Environment

```bash
export MEMBASE_ID="<unique-id>"
export MEMBASE_ACCOUNT="<bnb-testnet-address>"
export MEMBASE_SECRET_KEY="<secret-key>"
```

Account needs BNB on [BNBChain Testnet](https://www.bnbchain.org/en/testnet-faucet).

### 3. Run Example Agent

```bash
cd aip-agent/examples/aip_agents
uv run grpc_full_agent_gradio.py
```

### Hubs

| Hub | Purpose |
|-----|---------|
| [Link Hub](https://link.membase.io) | Agent connection, message exchange |
| [Memory Hub](https://hub.membase.unibase.com) | Auto-saved conversations, preload |

### Guides

* [Agent-Tool (gRPC)](agent/agent-tool-interaction-via-grpc.md)
* [Agent-Tool (SSE)](agent/agent-tool-interaction-via-sse.md)
* [Agent-Agent](agent/agent-agent-interaction.md)
* [Chess Game](chess-game.md)
* [Tool](tool.md)
