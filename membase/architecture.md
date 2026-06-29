# Architecture

Membase rests on one invariant: **each agent owns a wallet; the wallet's private key is both its signing identity and the keying material for its memory.** The only shared storage is a public **Hub** that stores wallet-scoped bytes. Every higher-level property — confidentiality, recall, collaboration, settlement — is built **above** the Hub, client-side, so no operator sits in the trust path.

### Topology

```
                Membase Hub  (decentralized KV, hub.membase.unibase.com)
                per-(wallet, cid) bytes
                          ▲
                          │  wallet-signed pointers + encrypted values
                          │  (no server in this path)
            ┌─────────────┴─────────────┐
            │                           │
     ┌──────┴───────┐            ┌───────┴──────┐
     │   Agent      │            │   Membase    │
     │  Wallet      │  wallet-   │   Server     │
     │  HubClient   │ ◄ signed ► │  Persistence │
     │  Domains     │   HTTP     │  Recovery    │
     │  LocalMemory │            │  Runtime     │
     │  Protocol Log│            │  Settlement  │
     │  (SQLite +   │            │  Metering    │
     │   FAISS,     │            └──────┬───────┘
     │   on-device) │                   │
     └──────┬───────┘                   │
            │ ref pub-sub               │
            ▼                           ▼
       ┌─────────┐                ┌───────────┐
       │ Channel │                │   Chain   │
       │ (ws/p2p)│                │ ERC-8183  │
       └─────────┘                └───────────┘
```

The **Server is optional**. Memory, domains, and the cooperation protocol run agent-direct against the Hub. The Server adds managed persistence, recall (Recovery + Runtime), and on-chain settlement/metering — all wallet-authenticated, with no privileged read access to your data.

### The four layers above the Hub

| Layer | Responsibility | You use |
|---|---|---|
| **Persistence** | Wallet-rooted, addressable storage: visibility namespaces, domain-keyed encryption, signed + hash-chained writes, cross-device sync. | `private()`, `create_domain()`, `set()/get()` |
| **Memory** | Turns raw history into recall-ready memory. *Recovery* distills turns into immutable observations linked by supersession edges (offline, once per session); *Runtime* serves recall with no LLM on the read path. | `memory.ingest()`, `memory.recall()`, `memory.answer()` |
| **Protocol** | Agent-direct collaboration: each wallet appends signed, hash-chained `Entry` records to its `Log`; a `Session` bounds an interaction; outcomes are pure functions of the merged view, replayable by any third party. | `Cooperation`, `core.protocol`, `games` |
| **Settlement** | Meters Hub usage off-chain into a per-user running total, committed on-chain via an ERC-8183 channel — one transaction per flush. | `MembaseClient` metering / settle |

### Two trust boundaries

* **L1 — raw memory**: agent ↔ Hub directly. Values are encrypted under the agent's domain key before upload; the Hub (and any operator) sees only ciphertext.
* **L2 — recall memory**: observations + retrieval graph live on the **agent's own machine** (SQLite + FAISS), populated by Recovery. They never leave the agent.

### What we trust — and what we don't

**Trusted:** the agent's machine + its private key, and standard cryptographic primitives (signatures, hashes, key encapsulation). **Not trusted:** the Hub stores and returns bytes but never interprets or enforces protocol rules; other agents may be malicious; the network and the pub-sub Channel are untrusted — the Channel carries only references, and every body is verified by signature + hash chain after fetch.

### Why it matters

* **Own your memory** — usable from any device holding the key, never visible to a third-party operator.
* **Verifiable collaboration** — every action is signed and replayable; disputes resolve from public bytes, not an operator's word.
* **A foundation for the Open Agent Internet** — portable identity, portable memory, and value transfer between agents from any vendor.
