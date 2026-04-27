# AIP

**AIP (Agent Interoperability Protocol)** — Web3-native protocol that gives AI agents identity, memory, and payments, enabling them to discover, transact, and collaborate across the Agent Internet.

> **AIP = ERC-8004 Identity + Membase Memory + x402 Payment**

### 30-Second Example

```bash
git clone https://github.com/unibaseio/aip-agent.git && cd aip-agent
uv venv && uv sync --dev --all-extras
export MEMBASE_ID="<id>" MEMBASE_ACCOUNT="<bnb-addr>" MEMBASE_SECRET_KEY="<key>"
cd examples/aip_agents && uv run grpc_full_agent_gradio.py
```

### Why AIP vs MCP vs A2A

| Feature              | MCP | A2A | **AIP**     |
| -------------------- | --- | --- | ----------- |
| Tool integration     | ✅   | ❌   | ✅           |
| Agent-to-agent       | ❌   | ✅   | ✅           |
| On-chain identity    | ❌   | ❌   | ✅ (ERC8004) |
| Decentralized memory | ❌   | ❌   | ✅ (Membase) |
| Payment              | ❌   | ❌   | ✅ (X402)    |

**Only AIP** combines memory, identity, and agent communication in one decentralized standard.

### Architecture

```
                         AI Agent Applications
        (Trading Agents / AI Assistants / Autonomous Services)
                                    │
                                    │
                            AIP Protocol Layer
              (Agent Interoperability & Communication Protocol)
                                    │
          ┌─────────────────────────┼─────────────────────────┐
          │                         │                         │
   Unibase Memory              Unibase Pay              Agent Runtime
      (Membase)                  (x402)               Secure Execution
 Persistent AI Memory      Machine-to-Machine        Agent Operations
                             Payments
          │                         │                         │
          └─────────────────────────┼─────────────────────────┘
                                    │
                              Multi-Chain Network
                 Validation and settlement Infrastructure
                                  
```

### Next Steps

* [Quick Start](quick-start/) — Agent-Tool, Agent-Agent, Chess
* [Design](design.md) · [Implementation](implementation.md)
* [Examples](https://github.com/unibaseio/aip-agent/tree/main/examples)

### Resources

* [GitHub](https://github.com/unibaseio/aip-agent) · [Website](https://www.unibase.com) · [Telegram](https://t.me/unibase_ai)
