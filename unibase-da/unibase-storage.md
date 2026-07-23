# Verifiable Storage

AI doesn't lack storage — S3 and its peers are effectively infinite and cheap. What AI
*does* lack is **verifiable, ownable, composable memory**: data an agent (or a smart
contract) can prove is **untampered, available, and provenance-auditable**, and then
**act on directly on-chain**.

Unibase DA turns that into a **programmable primitive**. It is not another place to dump
bytes; it is the layer that makes bytes **provable**.

***

### 💡 The shift: sell verifiability, not gigabytes

| | Commodity storage (S3 / Filecoin / Arweave) | **Unibase DA** |
|---|---|---|
| Sells | Bytes ($/GB) | **A proof primitive** (untampered · available · auditable) |
| Trust | Provider / off-chain committee | **On-chain ZK fraud proofs + Honest-One** |
| On-chain | Not composable (or costly) | **Availability is a first-class on-chain fact** |
| Competes on | Price per GB | **Verifiability, not price** |

We do **not** compete on $/GB. Availability and correct encoding are enforced by an
optimistic **on-chain ZK fraud-proof** game under an **Honest-One** model — a single
honest participant forces correctness, with no honest-majority or committee assumption.

***

### 🧱 A verifiability *overlay*, not a byte-owner

Unibase DA can sit **on top of existing storage backends** (its buffer tier is pluggable —
local, S3-compatible object stores, and other decentralized storage over time) and add
only the part they can't: a **cheap, composable, on-chain proof of availability and
encoding**. You keep your storage economics; DA adds trust.

> Arweave/Filecoin can persist a blob, but their proofs don't cheaply live on-chain or
> compose with contracts. That composability is Unibase DA's structural advantage.

***

### 🔑 What you can build on it

* **Verifiable agent memory** — tamper-evident, on-chain-verifiable recall for AI agents.
  This is the wedge, delivered through **[Membase](../membase/README.md)** (memory SDK/MCP built on DA).
* **Proof-of-Availability for on-chain reputation** — a data-availability layer for the
  **ERC-8004** agent-reputation/identity ecosystem (evidence that a claim's backing data
  is actually retrievable).
* **Verifiable datasets & model registries** — prove a dataset/model without revealing it
  (commitment proofs), enabling **training provenance** and **data royalties**.
* **DA for AI artifacts** — weights, LoRA adapters, RAG corpora, and checkpoints with a
  portable, verifiable availability guarantee.

***

### ⚙️ Developer experience

* **Feels familiar** — the SDK is shaped like an object store / vector store, so it drops
  into AI stacks (LangChain / LlamaIndex / MCP) without learning a new storage model.
* **Proofs are first-class** — every object carries a self-verifying, content-addressed
  name; a client (or contract) can check the on-chain receipt, and availability can be
  surfaced as a shareable **verify link / ✓verified badge** in the explorer.
* **Composable** — because proofs live on-chain, contracts can gate logic on "is this data
  provably available?" — access control, lifecycle, pricing, and royalty flows become
  programmable around verified data.
* **Performant** — erasure-coded durability with high-throughput ingest, so real-time
  context loading and memory updates aren't bottlenecked.

***

### 🤝 Honest about trust

Verifiability should anchor to real needs — agent marketplaces, portable/ownable memory,
on-chain reputation, regulated AI, data royalties — not decentralization theater. Unibase
DA states plainly where trust lands: on the **Honest-One fraud-proof game** and the
**security of the settlement chain** (Base, with Ethereum as the security anchor), **not**
on a trusted committee.

***

### 📌 Summary

Unibase DA is the **verifiability layer for AI memory and data**:

* ✅ Proofs of untampered, available, auditable data — enforced on-chain (ZK + Honest-One)
* ✅ An **overlay** over any storage backend — trust added, not bytes owned
* ✅ Composable: availability is a first-class on-chain fact contracts can consume
* ✅ Powers verifiable agent memory (Membase), 8004 availability, dataset/model provenance, and AI-artifact DA

> The goal isn't cheaper storage — it's **memory you can prove, own, and compose**.
