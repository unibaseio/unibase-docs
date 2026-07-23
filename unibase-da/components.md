# Architecture

**Unibase DA** is an AI-native, decentralized **data availability + storage** layer. Unlike DAS-based systems (Celestia, EigenDA, Avail) that verify availability off-chain through a committee or sampling, Unibase DA verifies stored data **on-chain with zero-knowledge proofs** under a **fraud-proof (optimistic) model**: writes are cheap and trustless, and the expensive verification runs **only when someone disputes**.

Its defining property is the **Honest-One** security model — a **single** honest participant is enough to force correctness, with no honest-majority assumption.

***

### Why on-chain verification

|  | DAS-based DA | **Unibase DA** |
|---|---|---|
| Availability check | Off-chain committee / sampling | **On-chain ZK proof** |
| Trust assumption | Honest majority | **Honest one** |
| Proof style | Validity / sampling | **Fraud proof (optimistic)** |
| On-chain cost | Per write | **Only on dispute** |

The security of a stored blob inherits the security of the settlement chain itself, not a separate committee.

***

### Data model

Data is **content-addressed** and organized in three levels. Developers interact with these via the SDK / gateway API:

| Level | What it is | Identifier |
|-------|-----------|-----------|
| **File** | What you upload | receipt of its pieces |
| **Piece** | A slice of a file (up to ~1 GB) | hex of its commitment |
| **Replica** | One erasure-coded shard of a piece | hex of its commitment |

* A piece is **erasure-coded** with a Reed–Solomon `(N, K)` policy: `K` data shards expand to `N` shards, and **any `K` of the `N`** reconstruct the data. Supported policies: **6/4, 14/7, 32/16, 64/32**.
* Each replica is distributed to a **distinct storage node**, so a piece survives the loss of up to `N − K` nodes.
* Every name is the hex of a cryptographic commitment, so identifiers are **self-verifying** — the same bytes always produce the same name.

***

### Write & read paths

**Write** — `upload`:

```
file ─▶ split into pieces ─▶ erasure-encode (N,K) ─▶ commit (KZG) ─▶ stage on stream node
     ─▶ storage nodes pull their shard ─▶ register replica on-chain (with proof)
```

The client receives a **receipt** (piece + replica names) and can verify, trustlessly, that the network encoded exactly the bytes it submitted — without trusting any single node.

**Read** — `download`:

```
look up replicas on-chain ─▶ fetch any K surviving shards ─▶ Reed–Solomon reconstruct ─▶ original file
```

Because reconstruction needs only `K` of `N` shards, reads tolerate node churn.

***

### Proofs & the fraud-proof game

Storage is kept honest by two on-chain proof families and an optimistic challenge–response game:

* **Encoding proof** — proves a replica is a valid shard of a correctly Reed–Solomon-encoded piece (not fabricated or mis-encoded).
* **Availability proof** — each epoch, a storage node proves it still physically holds the data it committed to, against a **deterministic, unpredictable challenge** (so it cannot pre-compute or reference another node's copy).

The game is **optimistic**:

1. On write, a node submits a **cheap** proof; it is **accepted without on-chain verification**.
2. Anyone (a **validator**) re-checks proofs **off-chain**. If one is missing or wrong, they open an **on-chain challenge**.
3. The accused node must answer within a time window with a full proof. The dispute is resolved by **on-chain ZK verification** (a logarithmic bisection localizes the faulty shard, keeping each on-chain step tiny).
4. A node that fails to prove is **slashed**; the honest challenger is rewarded.

Result: honest operation costs almost no gas; cheating is caught and penalized by **any one** honest watcher.

***

### Node roles

The network has no central orchestrator — all coordination is **on-chain state** plus event sync. Five roles:

| Role | Responsibility |
|------|---------------|
| **Stream** | Ingests uploads, erasure-encodes, commits, and temporarily stages shards until storage nodes commit them on-chain. |
| **Storage** | Pulls assigned shards, registers replicas on-chain with proofs, submits availability proofs each epoch. Stake-backed. |
| **Validator** | Independently re-verifies proofs and drives the fraud-proof game (challenge → settle). One honest validator secures the system. |
| **Gateway** | Read-only indexer + HTTP API mirroring chain state (files, pieces, replicas, nodes) for fast SDK/UI queries. |
| **Hub** | Lightweight gateway for app integrations (e.g. Membase memory). |

***

### Settlement & economics

* Storage nodes **stake** the protocol token; misbehavior proven on-chain is **slashed**.
* Honest work earns **per-epoch storage rewards** and **streaming fees**; challengers earn a share of slashed stake.
* Settlement runs on **Base** (primary L2) and **Ethereum** (security anchor); availability inherits the settlement chain's security. DA does **not** run on BSC — that's the application layer (Pay/AIP).
* Governance & the token economy (staking → vote-escrowed **vUB**, slashing/reward params) are set by the DA protocol's on-chain governance (Timelock + guardian), progressively decentralized.

***

### How it fits Unibase

Unibase DA is the **verifiable storage substrate** beneath the stack:

* **Membase** persists agent memory on DA for tamper-evident, on-chain-verifiable recall.
* **Storage** ([next page](unibase-storage.md)) builds the programmable, assetizable storage layer on top.

> A high-throughput DA layer where availability is a **provable on-chain fact**, not a committee's promise.
