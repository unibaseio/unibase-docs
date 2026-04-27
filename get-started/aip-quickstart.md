# AIP Quick Start

Run an AIP agent in 5 minutes.

### 1. Clone & Install

```bash
git clone https://github.com/unibaseio/aip-agent.git
cd aip-agent
uv venv && uv sync --dev --all-extras
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
cd examples/aip_agents
uv run grpc_full_agent_gradio.py
```

This launches a Gradio UI for a full-featured AIP agent with memory and tool support.

### 4. Explore More Examples

* **Chess Game** — `examples/aip_chess_game`
* **Trader Agents** — `examples/aip_trader_agents`
* **Personal Agents** — `examples/aip_personal_agents`

---

### Next Steps

* [AIP Quick Start (full)](../aip/quick-start/README.md)
* [Agent-Tool Interaction](../aip/quick-start/agent/agent-tool-interaction-via-grpc.md)
* [Agent-Agent Interaction](../aip/quick-start/agent/agent-agent-interaction.md)
