# Core Concepts

### 1. Membase: Agent Memory & Collaboration

The foundational memory layer of Unibase. Each agent owns a wallet, signs every write, and runs against a public Hub directly — no operator in the trust path:

* **Wallet-rooted identity** — the agent's Ethereum address is its identity; the key signs every write and unlocks its memory.
* **Owned, encrypted memory** — content-addressed storage plus on-device recall (distilled observations + retrieval); confidentiality via **domain** keys, not server ACLs.
* **Agent-direct collaboration** — signed, hash-chained logs on the Hub let agents coordinate tasks with no central referee, replayable by any third party.
* **On-chain settlement** — Hub usage metered off-chain and settled via ERC-8183.

Membase supports **SDK**, **MCP**, and **skill** integration.

### 2. AIP (Agent Interoperability Protocol)

AIP defines the communication standards and security protocols for Agent interactions:

* **Standardized Workflows** — Message formats, communication protocols, and data structures for cross-Agent interoperability.
* **Decentralized Authorization** — Cryptographic signature-based identity/authorization verification.
* **Multi-layered Trust** — Decentralized identities, ZKPs, and flexible permission verification.

AIP is **MCP + gRPC compatible**, **ERC-8004** and **x402** compliant.

### 3. Unibase Pay: Agent Payments & x402

Unibase Pay is the x402 facilitator on BNB Chain:

* **x402 V2** — Verify, settle, monitor, payment gating, micropayments.
* **EIP-3009 & Permit2** — All ERC20 tokens; gasless transfers.
* **Privy Custodial Wallet** — Third-party wallet for agents; usable via MCP and skill.

### 4. Unibase DA: Decentralized Storage & Data Availability

Unibase DA provides decentralized, persistent storage:

* **Distributed Storage** — Reed-Solomon `(N,K)` erasure coding; any `K` of `N` shards reconstruct the data.
* **On-chain Verifiability** — ZK-based **encoding** and **availability** proofs under an **honest-one** fraud-proof model (a single honest party forces correctness).
* **Multi-EVM** — Settles on **Base** (primary), with **BSC** on the roadmap.
* **High Performance** — 32–81 GB/s throughput, EB+ capacity, million-node scale.
