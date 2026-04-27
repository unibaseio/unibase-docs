# FAQ

### General

**What is Unibase?**  
Unibase is a decentralized AI memory layer. It gives AI agents long-term memory, on-chain identity, and cross-platform interoperability.

**What chains are supported?**  
See [Supported Networks](networks.md). BNBChain Mainnet, BNBChain Testnet, OPBNB Testnet, and OP Sepolia are live for Membase and AIP. Unibase Pay supports BSC mainnet and testnet. Unibase DA mainnet (Ethereum, BSC, Base) is in audit.

### Membase

**SDK vs MCP vs Skill?**  
* **SDK** — Direct Python/JS integration for custom agents.  
* **MCP** — Use the Membase MCP server with MCP-compatible clients (e.g. Claude Desktop, Cline).  
* **Skill** — Use as a skill in frameworks like BitAgent.

**Where is my data stored?**  
Data is encoded and stored across decentralized nodes via Unibase DA. You can view synced data at [hub.membase.unibase.com](https://hub.membase.unibase.com).

### AIP

**How does AIP relate to MCP?**  
AIP extends MCP with on-chain identity, decentralized memory, and gRPC support. AIP agents are MCP-compatible.

**Do I need Membase for AIP?**  
AIP agents typically use Membase for persistent memory. Set `MEMBASE_ID`, `MEMBASE_ACCOUNT`, and `MEMBASE_SECRET_KEY` for full functionality.

### Unibase Pay

**What is x402?**  
x402 is an HTTP-based payment protocol. Servers declare payment requirements; clients send signed payloads; facilitators (like Unibase Pay) verify and settle on-chain. See [x402.org](https://x402.org).

**Can agents pay without a wallet?**  
Yes. Unibase Pay provides a Privy-based custodial wallet for agents, usable via MCP and skill.

### Unibase DA

**When will mainnet be live?**  
Membase, AIP, and Unibase Pay are live on BNBChain Mainnet. Unibase DA ZK verification contracts for Ethereum, BSC, and Base mainnet are under audit; DA testnet is live.
