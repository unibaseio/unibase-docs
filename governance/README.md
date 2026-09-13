# Governance

Unibase protocol parameters — staking minimums, slashing penalties, proof timings, contract upgrades — are controlled by **UB holders**, not by a team key.

The path is deliberately boring: **lock UB → get vUB voting power → signal on Snapshot → bind on-chain via the Governor → wait out a Timelock → execute**. Every step has a brake.

***

### Voting power comes from a lock, not a balance

Voting power is **vUB** (vote-escrowed UB), minted by locking UB in the [`VUB`](staking.md) contract.

| Property | Why |
|---|---|
| **Non-transferable** | vUB is a locked position, not a tradeable asset — it cannot be rented or bought for a vote |
| **Lock-weighted** | Longer lock ⇒ more vUB per UB (up to **2.5×**) — power tracks commitment |
| **Flash-loan resistant** | You cannot mint vUB and exit in the same block; unstaking needs the lock to expire, and burning vUB kills voting power *immediately* |
| **Auto-delegated** | Your first stake self-delegates, so the stake counts as votes without a second transaction |

> No lock, no vote. See [Staking & vUB](staking.md).

***

### Two venues: signal, then decide

| Venue | Binding? | Cost | Use it for |
|---|---|---|---|
| **Snapshot** — [`s:unibase.eth`](https://snapshot.box/#/s:unibase.eth) | No | Gasless (off-chain signature) | Temperature checks, parameter polls, sentiment before spending gas |
| **Tally** — over `DAOGovernor` + `DAOTimelock` | **Yes** | On-chain gas | Anything that changes protocol state: parameters, roles, upgrades, treasury |

Both read the same vUB weight. Snapshot is **live**; the Tally front-end for binding votes is **coming soon** — the Governor contracts themselves are deployed and callable directly (see [Proposals & Execution](proposals.md)).

***

### How a change actually lands

```
vUB holders
   │  propose (needs ≥ proposal threshold)
   ▼
DAOGovernor ──[voting delay → voting period → quorum + majority]──▶ Succeeded
   │  queue()
   ▼
DAOTimelock ──[2-day delay: anyone can inspect, Guardian can cancel]──▶ execute()
   │
   ├──▶ Ethereum-side targets (governance contracts, roles)
   └──▶ Base-side targets: canonical OP Stack L1→L2 message
            ▼
        L2GovernanceExecutor (Base) ──▶ Base Timelock ──▶ DA contracts
```

Unibase DA settles on **Base**, but governance authority lives on **Ethereum**. The two are connected by Base's **native rollup messenger** — not a third-party bridge — so a cross-chain parameter change inherits Ethereum + OP Stack security rather than a bridge committee's.

***

### Safety rails

Governance is fast enough to be useful and slow enough to be safe. Four independent mechanisms:

| Rail | Contract | What it does |
|---|---|---|
| **Timelock delay** | `DAOTimelock` | Every passed proposal waits ~2 days before it can execute — time to read the calldata and react |
| **Guardian pause** | `EmergencyPause` | A security-council multisig can halt fund-moving entrypoints (withdraw / slash) *instantly* during an exploit. **Bounded and auto-expiring**, so an absent guardian cannot freeze the protocol; governance can lift it early or remove a rogue guardian |
| **Bounded fast lane** | `ParamCommittee` | A Safe multisig may enact a **hardcoded, bounded** list of routine parameter setters on Base without a full ETH round trip. It cannot upgrade, grant roles, or make arbitrary calls — the contract is immutable and has no such function — and the DAO can revoke it at any time |
| **Immutable Governor** | `DAOGovernor`, `DAOTimelock` | Deliberately **not** upgradeable. A captured governance cannot rewrite its own rules in place; evolving governance means deploying new instances and migrating roles by vote |

> `EmergencyPause` is fail-open by design: a guardian pause expires on its own. Governance pauses are capped per call (90 days max) so withdrawals can never be frozen permanently.

***

### Roles

| Role | Held by | Powers |
|---|---|---|
| `GOVERNOR_ROLE` | The Timelock (after decentralization) | Call parameter setters, authorize UUPS upgrades |
| `DEFAULT_ADMIN_ROLE` | Deployer at bootstrap → renounced | Grant/revoke roles. The last emergency-recovery path; irreversible once renounced |
| `GUARDIAN_ROLE` | Security-council multisig | Bounded emergency pause. Administered by `GOVERNOR_ROLE` — the DAO can fire a rogue guardian |
| `REWARD_FUNDER_ROLE` | Treasury | Stream staking rewards into `VUB` via `notifyReward` |
| `PROPOSER` / `EXECUTOR` / `CANCELLER` | Governor / anyone / Guardian | Timelock queue, execute, and veto |

***

### Deployments

Governance contracts on **Ethereum mainnet**:

| Contract | Address |
|---|---|
| `DAOGovernor` | [`0xcc89AEa4D4bb8c0De2aC917f84a0E30Ee1247C92`](https://etherscan.io/address/0xcc89AEa4D4bb8c0De2aC917f84a0E30Ee1247C92) |
| `DAOTimelock` | [`0xbD721b1509D7574EE59e252a01111EBb35893A9d`](https://etherscan.io/address/0xbD721b1509D7574EE59e252a01111EBb35893A9d) |
| `VUB` (voting token) | [`0x7a65Dd8256124c1c3eA8C3b90AC2411A04DD9353`](https://etherscan.io/address/0x7a65Dd8256124c1c3eA8C3b90AC2411A04DD9353) |

> ⚠️ **Current deployment is a dev deployment, not production governance.** The deployer still holds Timelock admin and can bypass votes; no Guardian council is seated; the `VUB` contract runs testnet lock parameters. Treat on-chain votes as rehearsals until this notice is lifted. Base Sepolia runs a staking-only deployment (test UB, 60-second locks) for exercising the flow end to end.

***

### Next steps

* [Staking & vUB](staking.md) — lock UB, pick a duration, claim rewards, unstake
* [Proposals & Execution](proposals.md) — proposal lifecycle, governed parameters, `cast` recipes
* [Unibase DA Architecture](../unibase-da/components.md) — what these parameters actually control
