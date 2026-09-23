# Proposals & Execution

How a change goes from an idea to live protocol state. The binding path runs on **OpenZeppelin Governor + TimelockController**, with vUB as the voting token.

> This page covers the **on-chain** half — the rules the contracts enforce. The forum and Snapshot phases that should precede a binding vote are in [Governance Process](process.md).

***

### Governor parameters

Read live from the Governor and Timelock — these are themselves governance-tunable:

| Parameter | Value | Meaning |
|---|---|---|
| **Voting delay** | 1 day (7,200 blocks) | Gap between `propose` and the start of voting — time to review before weight is snapshotted |
| **Voting period** | 7 days (50,400 blocks) | How long voting stays open |
| **Proposal threshold** | 2,500,000 vUB | Weight required to submit a proposal |
| **Quorum** | 4% of vUB supply | Minimum participation for a proposal to pass |
| **Timelock delay** | 2 days (172,800 s) | Wait between `queue` and `execute` |
| **Vote counting** | Simple majority | Passes when `For > Against` **and** quorum is met |

Vote support values: `0` = Against · `1` = For · `2` = Abstain.

***

### Proposal lifecycle

```
Pending(0) ──[voting delay]──▶ Active(1) ──[voting period]──┬─▶ Succeeded(4) ──[queue()]──▶ Queued(5)
                                                            ├─▶ Defeated(3)                    │
                                                            └─▶ Canceled(2)      [timelock delay]
                                                                                                ▼
                                                        Expired(6) ◀──[grace period]── execute() ──▶ Executed(7)
```

| State | Value | Meaning |
|---|---|---|
| Pending | 0 | Created; voting has not opened |
| Active | 1 | Voting is open |
| Canceled | 2 | Withdrawn by the proposer, or vetoed by the Guardian (`CANCELLER_ROLE`) |
| Defeated | 3 | Quorum missed, or Against ≥ For |
| Succeeded | 4 | Quorum met and For > Against |
| Queued | 5 | In the Timelock, waiting out the delay |
| Expired | 6 | Timelock grace period elapsed without execution |
| Executed | 7 | Applied on-chain |

***

### Before you can vote: delegate

Voting weight must be **delegated** before it counts — to yourself or to someone else. Staking self-delegates on your **first** stake, so most users need nothing here. If you have delegated elsewhere and want the weight back:

```bash
cast send $VUB "delegate(address)" $(cast wallet address $PRIVATE_KEY) \
  --rpc-url $RPC --private-key $PRIVATE_KEY
```

> Delegation takes effect for proposals created **after** it lands. The Governor snapshots weight at the end of the voting delay — delegating mid-vote does not retroactively arm an active proposal.

***

### What governance controls

| Contract | Setter | Controls |
|---|---|---|
| `Epoch` | `setSlots(uint64)` | Blocks per epoch — the protocol's base time unit |
| `Node` | `set(uint8 type, uint256 minStake)` | Minimum bond per node type |
| `Node` | `setDelay(uint64)` | Epochs a terminated node's stake stays locked |
| `Node` | `setAddress(address eproof, address rsproof)` | Proof-contract wiring |
| `Node` | `setEmergencyPause(address)` | Wires the circuit breaker |
| `EProof` / `RSProof` | `setMinProveTime(uint256)` | Time a challenged node has to answer |
| `EProof` / `RSProof` | `setBasePenalty(uint256)` | Slashing amount |
| `EProof` | `setChallengeWindow(uint64)` | How far back proofs can be challenged |
| `RSProof` | `setVKRoot(uint8 rsn, uint8 rsk, uint256)` | ZK verification keys per RS policy |
| `VUB` | `setParams(...)`, `setRewardToken(address)` | Lock economics and the reward asset |
| `EmergencyPause` | `setMaxPauseDuration(uint64)`, `governancePause(uint64)` | Guardian pause cap; ratify/extend an incident halt |
| *any UUPS proxy* | `upgradeToAndCall(address,bytes)` | Contract upgrades |

Some parameters are bound to each other by on-chain invariants that hold **regardless of who calls the setter** — e.g. `Node.delay ≥ EProof.challengeWindow`, so a node can never withdraw its stake before its proofs stop being challengeable. A proposal that would break an invariant reverts on execution.

***

### Simulate before you propose

A proposal takes ~10 days to reach execution. If the calldata reverts, you find out at the *end* of that — after the review, the vote, and the timelock. Simulate first.

The Timelock is the account that will make the call, so impersonate it and run the exact calldata you're about to propose:

```bash
# Fork mainnet locally
anvil --fork-url $RPC &

TIMELOCK="0xbD721b1509D7574EE59e252a01111EBb35893A9d"
cast rpc anvil_impersonateAccount $TIMELOCK --rpc-url http://localhost:8545
cast rpc anvil_setBalance $TIMELOCK 0xde0b6b3a7640000 --rpc-url http://localhost:8545

# Dry-run the call as the Timelock — reverts here, reverts on execution
cast call $TARGET $CALLDATA --from $TIMELOCK --rpc-url http://localhost:8545

# Then actually send it on the fork and read the result back
cast send $TARGET $CALLDATA --from $TIMELOCK --unlocked --rpc-url http://localhost:8545
cast call $TARGET "slots()(uint64)" --rpc-url http://localhost:8545
```

Worth checking specifically:

* **Invariant reverts** — e.g. lowering `Node.delay` below `EProof.challengeWindow` reverts. The bound is enforced on execution, not at proposal time.
* **Role errors** — if the call reverts for the Timelock, `GOVERNOR_ROLE` isn't wired the way you assumed.
* **Upgrades** — simulate `upgradeToAndCall` and then call a function on the new implementation. A storage-layout mistake shows up as corrupted reads, not as a revert.

> Cross-chain proposals (ETH → Base) cannot be simulated end to end on a single fork. Simulate the Base-side call against a Base fork with `L2GovernanceExecutor` impersonated, then verify the L1 message encoding separately.

***

### Worked example — change a parameter

Changing epoch length from 16,000 to 20,000 slots:

```bash
export RPC="https://eth.llamarpc.com"
export GOVERNOR="0xcc89AEa4D4bb8c0De2aC917f84a0E30Ee1247C92"
export TARGET="<Epoch proxy address>"
export DESC="Set epoch slots to 20000 for longer epochs"

# 1. Encode the call
CALLDATA=$(cast calldata "setSlots(uint64)" 20000)

# 2. Propose
cast send $GOVERNOR "propose(address[],uint256[],bytes[],string)" \
  "[$TARGET]" "[0]" "[$CALLDATA]" "$DESC" \
  --rpc-url $RPC --private-key $PRIVATE_KEY

# 3. Derive the proposalId (deterministic — same inputs, same id)
PROPOSAL_ID=$(cast call $GOVERNOR \
  "hashProposal(address[],uint256[],bytes[],bytes32)(uint256)" \
  "[$TARGET]" "[0]" "[$CALLDATA]" $(cast keccak "$DESC") --rpc-url $RPC)

# 4. After the voting delay (state → 1 = Active), vote For
cast call $GOVERNOR "state(uint256)(uint8)" $PROPOSAL_ID --rpc-url $RPC
cast send $GOVERNOR "castVote(uint256,uint8)" $PROPOSAL_ID 1 \
  --rpc-url $RPC --private-key $PRIVATE_KEY

# 5. After the voting period, queue into the Timelock
cast send $GOVERNOR "queue(address[],uint256[],bytes[],bytes32)" \
  "[$TARGET]" "[0]" "[$CALLDATA]" $(cast keccak "$DESC") \
  --rpc-url $RPC --private-key $PRIVATE_KEY

# 6. After the timelock delay, execute — anyone may call this
cast send $GOVERNOR "execute(address[],uint256[],bytes[],bytes32)" \
  "[$TARGET]" "[0]" "[$CALLDATA]" $(cast keccak "$DESC") \
  --rpc-url $RPC --private-key $PRIVATE_KEY

# 7. Verify
cast call $TARGET "slots()(uint64)" --rpc-url $RPC   # expect 20000
```

> The description string is hashed into the proposal id. `queue` and `execute` must be given the **exact same** targets, values, calldatas, and description — one changed byte is a different proposal.

***

### Worked example — upgrade a contract

Core contracts are **ERC-1967 UUPS proxies**; `_authorizeUpgrade` requires `GOVERNOR_ROLE`, held by the Timelock. An upgrade is an ordinary proposal whose target is the **proxy**:

```bash
UPGRADE_CALLDATA=$(cast calldata "upgradeToAndCall(address,bytes)" $NEW_IMPL "0x")
# ...then propose / vote / queue / execute exactly as above, with $TARGET = the proxy

# Verify via the ERC-1967 implementation slot
cast storage $TARGET 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc --rpc-url $RPC
```

Pass encoded initializer calldata instead of `"0x"` when the new implementation adds storage that needs seeding.

`DAOGovernor` and `DAOTimelock` are **not** upgradeable. Governance is evolved by deploying new instances and migrating the Timelock's `PROPOSER_ROLE` (and, if needed, `GOVERNOR_ROLE` on the DA contracts) through a vote — so a captured governance cannot rewrite its own rules in place.

***

### Executing on Base

Unibase DA contracts live on **Base**; the Governor and Timelock live on **Ethereum**. Proposals that target DA parameters are executed cross-chain over Base's **canonical OP Stack messenger**:

```
ETH Timelock ──sendMessage──▶ L1CrossDomainMessenger ──▶ L2GovernanceExecutor (Base)
                                                              │
                                            ┌─────────────────┴──────────────────┐
                                            ▼                                    ▼
                                   Base DAOTimelock                    DA contracts directly
                            (extra Base-side delay +              (for actions that don't need
                             Guardian veto — the default)           the extra delay)
```

`L2GovernanceExecutor` accepts a call **only** when it arrives via the canonical L2 messenger **and** the L1 origin (`xDomainMessageSender`) is the authorized ETH Timelock. It offers `execute` and `executeBatch` (atomic multi-parameter proposals), plus `setL1Governor` so the DAO can rotate its own L1 authority — itself only callable through an authenticated L1 message.

> No third-party bridge, DVN, or relayer committee is involved. The trust assumption for ETH→Base governance is the rollup's own.

***

### The fast lane: `ParamCommittee`

Routine, low-risk parameter tuning on Base does not need a 10-day ETH round trip. A committee multisig can enact a **fixed, hardcoded** set of bounded setters:

`setNodeDelay` · `setNodeMinStake` · `setChallengeWindow` · `setBasePenalty` · `setMinProveTime` · `setEpochSlots`

That list *is* the committee's entire power, enforced three ways:

1. **Fixed, minimal ABI.** The contract holds `GOVERNOR_ROLE` on the DA contracts but exposes only the six setters above. There is no function to upgrade, grant roles, move treasury, rotate verification keys, or make an arbitrary call — and the contract is immutable, so the whitelist can never be widened in place.
2. **Target allowlist + on-chain invariants.** Both the selector *and* the target contract must be intended, and every target setter enforces its own bounds — a bad value reverts no matter who sends it.
3. **DAO kill switch.** Governance can revoke the committee's `GOVERNOR_ROLE` at any time, or rotate/zero the operator, disabling the fast lane entirely.

Everything else — upgrades, treasury, role grants, changing the committee itself, verification keys — takes the full ETH-authority path.

***

### Next steps

* [Governance Process](process.md) — the off-chain phases that come first
* [Governance overview](README.md) — venues, safety rails, deployments
* [Staking & vUB](staking.md) — get the voting power first
