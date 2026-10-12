---
title: "Storage Backends"
---

Raw memory (the [Persistence](/membase/architecture/) layer) writes through a pluggable **storage backend**. Two are built in:

| Backend | What it is | When to use |
|---|---|---|
| **Hub** *(default)* | The public Membase Hub — low-latency, wallet-signed, content-addressed KV. | The default for everything. Fast reads/writes; retention is hub-managed. |
| **Unibase DA** *(opt-in)* | The Hub **plus** verifiable, long-term durability on [Unibase DA](/unibase-da/): batches are sealed into erasure-coded, on-chain-anchored pieces. | When memory must be provably durable and independently verifiable — beyond hub retention. |

Both satisfy the same interface, so switching is a **config change** — nothing in your agent code, in Domains, recall, or the cooperation protocol changes.

### Why a verifiable backend

The Hub is the hot tier: fast, signed, encrypted. Unibase DA adds what a hot store can't give you on its own:

* **Long-term durability** — data is erasure-coded across many nodes; any sufficient subset reconstructs it. It survives well beyond hub retention windows.
* **On-chain verifiability** — each sealed piece is committed on-chain (a KZG commitment + an availability proof), so a third party can verify the data exists and is intact **without trusting any operator**.
* **Confidentiality preserved** — DA only ever sees the **already-encrypted** bytes your Domain produced. Sealing never decrypts; a tampered piece fails decryption on read.

### How a write flows

With the DA backend, a write is **hot-first, sealed-later** — the hot path is unchanged:

```
set() ─▶ Hub write (hot, immediate)                     ← unchanged latency
      └▶ accumulate into a segment ─(threshold)─▶ seal into a DA piece
                                                  (erasure-code + KZG commit,
                                                   anchor a signed SEAL into the
                                                   agent's protocol Log, on-chain)
get() ─▶ Hub read (hot) ─(miss)─▶ cold-read: fetch the DA piece by its
                                   content id, slice out the record, decrypt
```

Design guarantees:

* **Non-disruptive** — DA durability is layered *on top of* the hot write. If the DA network is briefly unavailable, records stay buffered and seal on a later write; **the hot write never fails**.
* **Recoverable** — DA pieces are self-describing, so the cold index can be rebuilt directly from the pieces if the on-hub seal log is ever lost.
* **Batched for cost** — many small writes are sealed into one piece, so on-chain anchoring is amortized (roughly one transaction per sealed segment).

### On-chain attribution & cost

Sealing registers the piece on-chain. Two modes trade off decentralization vs. friction:

| Mode | Who signs / pays gas | On-chain owner | Best for |
|---|---|---|---|
| **Hub-proxy** *(default)* | The Hub pays gas and registers the piece. | Attributable to the user (the agent's wallet). | Web2-friendly onboarding — the agent needs **no gas**. |
| **Client self-sign** | The agent's wallet signs and pays. Works with a **local key or a custodial (Privy) wallet** — no key export. | The agent's wallet. | Progressive decentralization — the agent owns the registration end-to-end. |

Pieces are **content-addressed**: the same bytes always map to the same piece id, so re-sealing is idempotent and ownership is unambiguous on any block explorer.

### Enabling the DA backend

The DA backend is opt-in via configuration (testnet, on **Base**). Point Membase at a DA-connected Hub and select the backend:

```bash
export MEMBASE_HUB_BACKEND=da          # default: "official" (hot Hub only)
export MEMBASE_HUB=<a DA-connected Hub URL>
export MEMBASE_DA_REGISTER=hub          # "hub" (hub-paid, default) | "client" (self-sign)
```

```python
from unibase_membase import Membase, Wallet

# Config picks the backend; your code is identical to the default Hub path.
agent = Membase(Wallet.from_env())
agent.private().set("notes/today", {"v": "durable + verifiable"})
```

Everything above the backend — Domains, recall, cooperation, settlement — behaves exactly as documented elsewhere.

> **Status:** the DA backend is available on **testnet (Base Sepolia)** and is opt-in. The default Hub backend remains the recommended path for general use; enable DA when verifiable long-term durability is a requirement. See [Unibase DA](/unibase-da/) and [Verifiable Storage](/unibase-da/unibase-storage/) for the underlying storage network.
