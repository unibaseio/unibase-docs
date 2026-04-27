# Privy Custodial Wallet

Unibase Pay provides a **Privy-based third-party custodial wallet** for AI agents, enabling them to hold and spend funds autonomously.

### Key Features

* **Agent-owned** — Wallet is managed on behalf of the agent
* **No user wallet required** — Agents can pay without a connected user wallet
* **MCP & Skill** — Use directly via MCP or skill integration

### Use Cases

* Agents that need to pay for API calls, tools, or services
* Autonomous commerce — agents discover, pay, and access resources
* Micropayments for high-frequency agent interactions

### Integration

The Privy wallet is available through the Unibase Pay infrastructure. Agents can use it via:

* **MCP** — When configured with Unibase Pay MCP tools
* **Skill** — When using the Unibase Pay skill in skill-based frameworks

### Security

* Custodial wallets are managed by the Unibase Pay infrastructure
* Keys are not exposed to the agent runtime
* Follow [Security & Best Practices](../resources/security.md) for production use

### Resources

* [API Reference](api-reference.md)
* [x402 Protocol](https://x402.org)
