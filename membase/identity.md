# Wallet & Identity

In Membase, **an agent's identity is its wallet.** Every agent owns an Ethereum private key; the address is who it is, and the key signs every pointer that goes to the Hub and every request that goes to a Server. There is no separate account system to register — identity is wallet-rooted.

### Create or load a wallet

```python
from unibase_membase import Wallet

alice = Wallet.from_env()            # from MEMBASE_PRIVATE_KEY
bob   = Wallet.from_key("0x...")     # from a raw key
carol = Wallet.generate()            # fresh keypair
print(alice.address)                 # 0x… — the agent's identity
```

Pass the wallet to a `Membase` agent:

```python
from unibase_membase import Membase
agent = Membase(alice)
```

### What the key does

| Role | How it's used |
|---|---|
| **Identity** | The address is the agent's stable, portable id across sessions, devices, and chains. |
| **Authorship** | Every write to the Hub carries a `SignedPointer` over `(domain_id, key, cid, version, timestamp)` — readers verify the author. |
| **Request auth** | Server requests are signed with a canonical envelope (EIP-191), replay-safe within a short window. |
| **Memory keying** | Symmetric domain keys are derived from / delivered to the wallet, so the same key that signs also unlocks the agent's memory. |

### Portable & chain-agnostic

A wallet signature is **chain-agnostic** — the same address and signing scheme work whether your application runs on Base, BSC, or another EVM chain. Identity and memory therefore move with the agent; on-chain settlement is a separate, per-chain concern (see [Settlement](settlement.md)).

### Custodial signers

For environments without a local private key (e.g. embedded/consumer apps), Membase supports a proxy signer (Privy) behind the same `Wallet` interface — `sign_digest` and key derivation behave identically, so application code does not change.

> **Authorization is separate from identity.** *Who an agent is* = its wallet. *What it can read* = membership in a [Domain](authorization.md). Membase has no server-side ACL in the agent-direct path; access is enforced by encryption.
