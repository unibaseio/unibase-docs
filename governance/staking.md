# Staking & vUB

Lock **UB** in the `VUB` contract to mint **vUB** — vote-escrowed UB. vUB is simultaneously your **voting power** and your claim on **staking rewards**.

> This is *governance* staking. It is separate from **node staking**, where DA storage nodes bond UB against slashing — see [DA Architecture](../unibase-da/components.md). Node stake earns storage rewards and carries slashing risk; vUB earns incentive rewards and carries no slashing risk.

***

### The lifecycle

```
UB ──stake(amount, duration)──▶ vUB minted (lock-weighted)
                                  │ voting power + reward accrual
                                  ▼
                            lock expires
                                  │ unstake()  → vUB burned immediately
                                  ▼
                            cooldown (unbonding)
                                  │ withdraw() → UB returned
                                  ▼
                                 UB
```

The two-stage exit — burn first, then unbond — is what makes "vote, then dump" impossible. Voting power stops the moment you decide to leave, while your UB is still locked in unbonding.

***

### Lock duration and boost

vUB minted = `amount × boost(duration)`. The boost ramps **linearly** from 1.00× at the minimum lock to the maximum at the maximum lock:

```
boost(d) = 1.00×                                  if d ≤ minLock
         = 1.00× + (maxBoost − 1.00×) · (d − minLock) / (maxLock − minLock)
         = maxBoost                               if d ≥ maxLock
```

Mainnet defaults (all governance-tunable):

| Parameter | Default | Meaning |
|---|---|---|
| `minLock` | 7 days | Shortest accepted lock (1.00× weight) |
| `maxLock` | 730 days (2 years) | Longest accepted lock (max weight) |
| `maxBoostBps` | 25000 (**2.5×**) | Weight at `maxLock` |
| `cooldown` | 7 days | Unbonding delay between `unstake` and `withdraw` |

**Worked example** — lock 1,000 UB for 1 year:

```
boost = 1.00 + 1.50 × (365 − 7) / (730 − 7) = 1.743×
vUB   = 1,000 × 1.743 = 1,742.7 vUB
```

> **Boost does not decay.** It is fixed at mint time, not recomputed as the lock ages. Your vUB balance is exactly your current weight until you `extendLock` (tops up) or `unstake` (burns it all).

***

### Growing a position

**One active lock per address.** To add to it, don't stake again — use:

| Call | Effect |
|---|---|
| `increaseAmount(amount)` | Adds UB to the existing lock. New UB is weighted by the **remaining** lock time, not the original duration — it is only committed for what's left |
| `extendLock(newDur)` | Pushes the lock end out to `now + newDur` and tops weight up to `principal × boost(newDur)`. Returns the vUB minted, which is **0** when the new target weight isn't above your current balance (the end still advances) |

`extendLock` must strictly extend (`newEnd > currentEnd`) and `newDur` must be within `[minLock, maxLock]`.

***

### Rewards

Staking APY is paid in a separate community-incentive token (which may be UB itself), funded from the treasury reserve and **streamed** over a duration:

* Accrual is Synthetix-style pro-rata over **vUB weight** — a 2.5× boosted position earns 2.5× the rewards of the same UB locked at 1.00×.
* `getReward()` is claimable at any time, **including after unstaking** — accrual is snapshotted at every balance change.
* Rewards are metered by the contract; *funding* is a treasury decision made off-contract. An empty reward stream means 0 APR, not a failure.
* When the reward token **is** UB, payouts are hard-capped to the funded surplus: a reward transfer can never dip into staked principal.

> The APR shown on the staking app is derived from the **current** total vUB and the active stream. On testnets it is meaningless (a demo deployment funds a year of rewards against a handful of stakers — four-digit APRs are an artifact, not a yield).

***

### Delegating your vote

vUB cannot be transferred — but the **voting power** it carries can be delegated, and delegating is not the same as giving anything away:

| Delegating **does** | Delegating does **not** |
|---|---|
| Move who casts the vote | Move your UB or vUB |
| Stay revocable at any time, instantly | Affect your lock, cooldown, or rewards |
| Let you stay passive without your weight going to waste | Give the delegate any claim on your funds |

Your **first** stake self-delegates automatically, so a holder who wants to vote personally needs to do nothing. To hand your weight to someone else — or to take it back:

```bash
# Delegate to a representative
cast send $VUB "delegate(address)" $DELEGATE --rpc-url $RPC --private-key $PRIVATE_KEY

# Take it back
cast send $VUB "delegate(address)" $(cast wallet address $PRIVATE_KEY) \
  --rpc-url $RPC --private-key $PRIVATE_KEY

# Who am I currently delegating to?
cast call $VUB "delegates(address)(address)" $(cast wallet address $PRIVATE_KEY) --rpc-url $RPC
```

**Timing matters.** The Governor snapshots voting weight once, at the end of the voting delay. Delegating after that snapshot has no effect on proposals already in flight — it applies to the next one. Delegate before you need to, not when a vote is already open.

> An undelegated balance votes with **nobody**. If you delegated away years ago and forgot, your stake is still earning rewards while someone else casts its vote — check `delegates(you)`.

***

### Function reference

| Function | Access | Notes |
|---|---|---|
| `stake(uint256 amount, uint64 dur)` | anyone | Requires no active lock. Approve UB first. Auto-self-delegates on first stake |
| `increaseAmount(uint256 amount)` | anyone | Requires an active, unexpired lock |
| `extendLock(uint64 newDur) → uint256` | anyone | Returns vUB minted (may be 0) |
| `unstake()` | anyone | Only after `lock.end`. Burns **all** vUB, starts cooldown |
| `withdraw()` | anyone | Only after `pending.ready`. Returns UB |
| `getReward()` | anyone | Claim accrued rewards |
| `earned(address) → uint256` | view | Unclaimed rewards |
| `boostBps(uint64 dur) → uint256` | view | Weight in bps for a duration (10000 = 1.00×) |
| `locks(address) → (amount, end)` | view | Active lock |
| `pending(address) → (amount, ready)` | view | Unbonding position |
| `notifyReward(uint256 amount, uint64 duration)` | `REWARD_FUNDER_ROLE` | Start/extend a reward stream |
| `setParams(minLock, maxLock, maxBoostBps, cooldown)` | `GOVERNOR_ROLE` | Retune lock economics by proposal |
| `setRewardToken(address)` | `GOVERNOR_ROLE` | Only while no reward stream is active |

vUB is **non-transferable**: `transfer` / `transferFrom` revert. Only mint (stake) and burn (unstake) move balances.

***

### Staking with `cast`

```bash
export RPC="https://eth.llamarpc.com"
export UB="<UB token address>"
export VUB="0x7a65Dd8256124c1c3eA8C3b90AC2411A04DD9353"
export AMOUNT=1000000000000000000000     # 1,000 UB
export DUR=31536000                      # 365 days in seconds

# 1. Approve, then lock
cast send $UB "approve(address,uint256)" $VUB $AMOUNT \
  --rpc-url $RPC --private-key $PRIVATE_KEY
cast send $VUB "stake(uint256,uint64)" $AMOUNT $DUR \
  --rpc-url $RPC --private-key $PRIVATE_KEY

# 2. Check what you got (vUB balance = voting weight)
cast call $VUB "balanceOf(address)(uint256)" $(cast wallet address $PRIVATE_KEY) --rpc-url $RPC
cast call $VUB "getVotes(address)(uint256)"  $(cast wallet address $PRIVATE_KEY) --rpc-url $RPC

# 3. Claim rewards at any time
cast call $VUB "earned(address)(uint256)" $(cast wallet address $PRIVATE_KEY) --rpc-url $RPC
cast send $VUB "getReward()" --rpc-url $RPC --private-key $PRIVATE_KEY

# 4. After the lock expires: burn vUB, then withdraw after cooldown
cast send $VUB "unstake()"  --rpc-url $RPC --private-key $PRIVATE_KEY
cast send $VUB "withdraw()" --rpc-url $RPC --private-key $PRIVATE_KEY
```

> `getVotes` reads 0 until you hold a delegation. `stake` self-delegates automatically on your **first** stake; if you previously delegated elsewhere, that delegation stands — call `delegate(yourAddress)` to point the weight back at yourself.

***

### Next steps

* [Governance Process](process.md) — how a change gets proposed and ratified
* [Proposals & Execution](proposals.md) — put your vUB to work
* [Governance overview](README.md) — venues, safety rails, deployments
