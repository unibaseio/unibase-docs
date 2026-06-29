# Domains & Encryption

Membase controls read access by **encryption, not server ACLs.** A **Domain** is a string id paired with a 32-byte symmetric key `K_d`, shared by an opt-in set of wallets. Agents encrypt values under `K_d` before uploading to the Hub; only domain members can decrypt. **Private memory is simply a single-member domain.**

### Private vs shared

```python
from unibase_membase import Membase, Wallet

alice = Membase(Wallet.from_env())

# Private — single-member domain; only alice decrypts
alice.private().set("notes/today", {"v": "private memo"})

# Shared — alice mints K_d for a named domain
team = alice.create_domain("team:engineering")
team.set("roadmap/q3", {"goal": "ship the agent-direct evolution"})
```

### Granting access — ECIES invites

Adding a member never puts a key on the wire in cleartext. The inviter encrypts `K_d` to the recipient's public key; only the recipient's wallet can open it.

```python
bob = Membase(Wallet.from_key("0x..."))

code, _ = alice.invite_to(team)          # ECIES-wrapped K_d
bob_team, _ = bob.accept_invite(code)    # bob's wallet unwraps it

print(bob_team.get("roadmap/q3", author=alice.address))
# → {'goal': 'ship the agent-direct evolution'}
```

Reads name the `author` whose value you want, since multiple members may write the same key (last-write-wins per author).

### Integrity

Every value carries a `SignedPointer` (the author's signature over `(domain_id, key, cid, version, timestamp)`), so authorship is verifiable even though the Hub enforces nothing. Protocol-log entries go further — they are hash-chained per wallet, making history tamper-evident (see [Cooperation Protocol](cooperation.md)).

### Domains as collaboration rooms

In cooperation mode a domain doubles as a shared "room": many sessions (game rounds, negotiations, auctions) can live in one domain, isolated by `session_id`. See [Cooperation Protocol](cooperation.md).

### Server-mediated scopes (optional)

When you run a Membase Server, it offers named scopes — `user` / `task` / `team` / `dm` / `public` — that add multi-tenant membership + permission enforcement on top of the KV store, stamping the verified wallet as the pointer's author. Use these when you want the server to manage membership; use `create_domain()` / `private()` when you want no server in the path.

> **Key rotation / revocation note:** removing a member does not rotate `K_d`; a member who already holds the key can still read values encrypted under it. Rotate by minting a new domain key for future writes.
