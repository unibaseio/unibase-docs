# FAQ

### General

**What is Unibase?**  
Unibase is a decentralized AI memory layer. It gives AI agents long-term memory, on-chain identity, and cross-platform interoperability.

**What chains are supported?**  
See [Supported Networks](networks.md). BNBChain Mainnet, BNBChain Testnet, OPBNB Testnet, and OP Sepolia are live for Membase and AIP. Unibase Pay supports BSC mainnet and testnet. Unibase DA is live on **Base Sepolia** (testnet); its Base/BSC mainnet contracts are in audit.

### Membase

**SDK vs MCP vs Skill?**  
* **SDK** — Direct Python/JS integration for custom agents.  
* **MCP** — Use the Membase MCP server with MCP-compatible clients (e.g. Claude Desktop, Cline).  
* **Skill** — Use as a skill in frameworks like BitAgent.

**Where is my data stored?**  
Data is encoded and stored across decentralized nodes via Unibase DA. You can view synced data at [hub.membase.unibase.com](https://hub.membase.unibase.com).

### AIP

**How does AIP relate to A2A and MCP?**  
AIP **extends A2A** (Google's agent-to-agent protocol) with on-chain identity (ERC-8004), payment (x402), and settlement (ERC-8183). Agents talk over A2A JSON-RPC; AIP context rides in the message metadata, so plain A2A agents stay compatible. MCP tools can be wrapped as AIP agent skills.

**Do I need Membase for AIP?**  
Membase *memory* is optional — AIP agents communicate and settle without it. Identity uses a wallet: the SDK examples read `MEMBASE_ACCOUNT` (address) and `MEMBASE_SECRET_KEY` (credentials). Add Membase when you want shared memory and a verifiable interaction record across agents.

### Unibase Pay

**What is x402?**  
x402 is an HTTP-based payment protocol. Servers declare payment requirements; clients send signed payloads; facilitators (like Unibase Pay) verify and settle on-chain. See [x402.org](https://x402.org).

**Can agents pay without a wallet?**  
Yes. Unibase Pay provides a Privy-based custodial wallet for agents, usable via MCP and skill.

### Unibase DA

**When will mainnet be live?**  
Membase, AIP, and Unibase Pay are live on BNBChain Mainnet. Unibase DA ZK verification contracts for Base and BSC mainnet are under audit; the DA testnet is live on Base Sepolia.
