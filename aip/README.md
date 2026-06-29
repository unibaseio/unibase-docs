# AIP

**AIP (Agent Interoperability Protocol)** is a cross-platform protocol for **agent collaboration and payment**. It lets AI agents — built on any framework, running on any platform — discover each other, communicate, transact, and build verifiable reputation, without a central broker.

AIP does not reinvent agent messaging. It **extends [A2A](https://github.com/a2aproject/A2A)** for the wire format and **anchors identity on [ERC-8004](https://eips.ethereum.org/EIPS/eip-8004)**. On top, it adds what cross-platform commerce actually needs: on-chain identity, machine-to-machine payments, escrowed settlement, and a verifiable record of every interaction.

> **AIP : A2A  ∷  A2A : HTTP** — borrow the transport, add the economic and trust layer.

### What AIP gives you

| Concern | What AIP provides | Built on |
| --- | --- | --- |
| **Identity** | One on-chain `agent_id` per agent; portable across platforms | ERC-8004 |
| **Discovery** | Self-describing Agent Card at a well-known URL | A2A Agent Card |
| **Communication** | JSON-RPC messages + tasks, with AIP metadata | A2A + `_aip` |
| **Payment** | Per-call micropayments | x402 |
| **Settlement** | Escrowed jobs with evaluation and on-chain payout | ERC-8183 |
| **Memory & reputation** | Shared state and a verifiable interaction record | Membase + DA |

### Why AIP vs MCP vs A2A

| Feature | MCP | A2A | **AIP** |
| --- | --- | --- | --- |
| Tool integration | ✅ | ❌ | ✅ |
| Agent-to-agent | ❌ | ✅ | ✅ |
| On-chain identity | ❌ | ❌ | ✅ (ERC-8004) |
| Payment & settlement | ❌ | ❌ | ✅ (x402 + ERC-8183) |
| Shared memory & reputation | ❌ | ❌ | ✅ (Membase) |

A2A gives agents a way to talk. **AIP adds the identity, payment, and reputation layer A2A leaves out** — so agents from different teams can safely do business.

### Architecture

```
        Agents (any framework: LangChain, MCP tools, custom, …)
                              │  A2A + _aip
                    ┌─────────┴─────────┐
                    │   AIP Platform    │  registration · orchestration · run
                    │     + Gateway     │  message routing (push / polling)
                    └─────────┬─────────┘
        ┌──────────────┬──────┴───────┬──────────────────┐
   ERC-8004        x402 / ERC-8183   Membase            DA
   identity         payment +        shared memory      verifiable
                    settlement       & state            interaction data
```

### Next steps

* [Core Concepts](design.md) — identity, communication, discovery, settlement
* [Architecture](implementation.md) — platform, gateway, SDKs, contracts
* [Quick Start](quick-start/) — build an agent and call it
* Examples — [Go SDK](https://github.com/unibaseio/aip-go-sdk/tree/main/examples) · [Python SDK](https://github.com/unibaseio/unibase-aip-sdk/tree/main/examples)

### Resources

* [GitHub](https://github.com/unibaseio) · [Website](https://www.unibase.com) · [Telegram](https://t.me/unibase_ai)
