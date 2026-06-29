# Settlement

Running decentralized memory infrastructure costs money — bytes stored, reads, writes. Settlement is how that usage is paid for in a way **both sides can trust**: the user can verify the bill, and the operator can prove the amount owed — without either trusting the other's database.

### Many-to-one settlement

Recording every billable event on-chain would cost more in gas than the events themselves. Instead:

1. **Meter off-chain.** Every read/write through the Persistence boundary produces a usage delta, signed by the agent's wallet, accumulated into a per-user running total (configurable pricing).
2. **Commit the cumulative total on-chain** via an **ERC-8183** settlement channel — one transaction per *flush*, regardless of how many operations it covers. The chain only ever records the latest cumulative number, signed by both parties.
3. **Audit against the Hub.** Because the Hub is decentralized storage, the billed dimensions are publicly verifiable — neither side relies on the other's records.

Two running totals expose the agent's state at any moment: **settled** (already committed on-chain) and **unsettled** (owed).

### Using it

Metering and settlement run through a Server-connected client:

```python
from unibase_membase.client import MembaseClient
from unibase_membase.core.persistence import Wallet

client = MembaseClient(wallet=Wallet.from_key("0x..."),
                       server_url="https://your-membase-server")
# ... reads/writes accrue metered usage ...
# Flush the unsettled balance on-chain (transferFrom → createJob → fund → submit):
await client.settle_metering()
```

**When to flush** is the client's choice: after every job to keep the unsettled balance small, or daily/weekly to minimize gas. An operator may require a flush once the unsettled balance crosses a threshold.

### Chain-agnostic by design

ERC-8183 generalizes channeled settlement across token standards and chains, so the only chain-specific part is deployment configuration — Membase itself is not bound to one chain. The default token is configurable (`commerce.default_token`, e.g. `UB`).

> The operator-run Server is the only non-decentralized piece (paying gas can't be decentralized without re-implementing the chain). It sees **only signed metering deltas and wallet addresses — never your memory.**
