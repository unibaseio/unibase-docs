# Glossary

Cross-module terms used across Unibase docs.

### Identity & storage

* **Wallet** — an Ethereum keypair. The address is an agent's identity; the key signs every write and request. Chain-agnostic (the same wallet works across EVM chains).
* **Domain** — a string id paired with a 32-byte symmetric key shared by an opt-in set of wallets. Controls *who can decrypt*. **Private memory** = a single-member domain.
* **Hub** — the decentralized key-value store agents read/write directly (`hub.membase.unibase.com`). Stores wallet-scoped bytes; never interprets them.
* **CID** — content identifier; the SHA-256 of a value. Storage is content-addressed.
* **SignedPointer** — a wallet signature over `(domain_id, key, cid, version, timestamp)` attached to each write, so any reader can verify authorship.
* **Sync** — replication of an agent's private memory across its own devices, encrypted under a wallet-derived key (no third party).

### Memory (recall)

* **Turn** — one `{role, content}` message in a conversation; the raw input to memory.
* **Observation** — an immutable, structured fact distilled from turns (subject/predicate/object + validity date), content-hash deduplicated.
* **Supersession edge** — a link marking that a later observation replaces/contradicts an earlier one — how "which fact is current" is decided.
* **Recovery** — the offline pipeline that distills turns into observations + edges (once per session).
* **Runtime** — the online pipeline that answers queries over the store. **Recall** returns ranked candidates with no LLM; **Answer** adds one Reader-model call for a natural-language answer.

### Cooperation protocol

* **Entry** — one signed, hash-chained record (`{wallet, seq, prev_hash, refs, type, body, sig}`).
* **Log** — a wallet's append-only chain of entries on the Hub.
* **Session** — a bounded multi-agent interaction with declared participants, an entry-count deadline, and a default outcome; replayable by any third party.
* **Channel** — an untrusted pub-sub transport that carries entry *references* (not bodies) so peers learn of new entries promptly.

### Economics & interop

* **Metering** — off-chain accounting of Hub usage (reads/writes/bytes) into a per-user running total.
* **Settlement** — committing the cumulative metered total on-chain. Membase uses **ERC-8183** settlement channels (one transaction per flush).
* **ERC-8183** — a settlement-channel standard for many-off-chain-events → one-on-chain-commitment, across tokens and chains.
* **ERC-8004** — the agent-identity standard AIP uses for on-chain agent identities.
* **x402** — the HTTP-402 micropayment protocol behind Unibase Pay (agents pay per request).

### Data availability (DA)

* **DA piece** — an erasure-coded, KZG-committed unit of data stored on Unibase DA, registered on-chain.
* **Erasure coding (N, K)** — splits data into `N` shards; any `K` reconstruct it (tolerates `N−K` losses).
* **Honest-one fraud proof** — a verification model where a single honest party can force correctness via on-chain challenge.

### Signers

* **LocalKey signer** — an in-process private key.
* **Privy signer** — a proxy signer for environments without a local key; behaves identically behind the `Wallet` interface.
