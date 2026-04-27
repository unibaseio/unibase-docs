# Core Concepts

### 1. Membase: Identity & Memory Management

As the foundational layer of Unibase, Membase focuses on:

* **Identity Registration** — Assigns unique, verifiable identities to Agents for recognition across decentralized networks.
* **Configuration & History Tracking** — Stores Agent configurations, interaction logs, and session histories.
* **Authorization Mechanisms** — Enforces access control and permission management.

Membase supports **SDK**, **MCP**, and **skill** integration. It prioritizes lifecycle management and dynamic permission control.

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

* **Distributed Storage** — Reed-Solomon encoding; data fragmented across nodes.
* **On-chain Verifiability** — ZK-based Encode Proof and Duality Proof; honest-one fraud proofs.
* **Multi-EVM** — Deployment on Ethereum, BSC, Base and other EVM chains.
* **High Performance** — 32–81 GB/s throughput, EB+ capacity, million-node scale.
