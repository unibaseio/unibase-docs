# Unibase DA

The decentralized **data availability + storage** layer for AI — availability is verified **on-chain with ZK fraud proofs**, secured by an **Honest-One** model (no majority assumption). It is the verifiable storage substrate beneath Membase.

### Why Unibase DA

| vs. EigenDA / Celestia / Avail | Unibase DA |
|----------------------|------------|
| Off-chain committee / sampling | **On-chain ZK verification** |
| Honest majority | **Honest one** |
| Validity / sampling proofs | **Fraud proofs (optimistic)** |
| On-chain cost per write | **Cost only on dispute** |

* **Trustless writes** — the client cryptographically verifies the network encoded exactly its bytes; no single node is trusted.
* **Cheap by default** — expensive on-chain ZK verification runs only when a proof is challenged.
* **Erasure-coded durability** — Reed–Solomon `(N,K)`; any `K` of `N` shards reconstruct the data.

### Node roles

| Role | Responsibility |
|------|------|
| **Stream** | Encode uploads, commit, stage shards |
| **Storage** | Store shards, submit availability proofs (stake-backed) |
| **Validator** | Re-verify proofs, challenge fraud — *one* honest validator secures the network |
| **Gateway** | Read-only indexer + HTTP API for SDK/UI |
| **Hub** | Lightweight gateway for app integrations |

### Networks

| Network | `CHAIN_TYPE` | Status |
|---------|--------------|--------|
| Base Sepolia | `base-sepolia` | ✅ Testnet |
| Base Mainnet | `base` | 🔍 In audit |
| Ethereum Mainnet | `ethereum` | 🛣 Roadmap |

> DA settles on **Ethereum and its L2 Base** — Base as the primary low-cost L2, Ethereum as the security anchor (availability inherits Ethereum's security, aligning with the ERC-8004 ecosystem). BSC is used by the application layer (Pay/AIP), **not** by DA.

### Next steps

* [Architecture](components.md) — how it works, end to end
* [Verifiable Storage](unibase-storage.md) — the positioning: sell verifiability, not gigabytes
* [Quick Start](quick-start/README.md) — upload & download a file
* [Nodes Bootstrap](quick-start/nodes-bootstrap/README.md) — run a Stream / Storage / Validator node
* [Nodes Operations](quick-start/nodes-operations.md) — balances, revenue, withdrawals
