# Governance Process

> 🚧 **DRAFT — not yet ratified.** This page proposes the off-chain process that precedes a binding on-chain vote. The **phases** below reflect how Unibase governance is intended to work; every value marked `TBD` still needs to be set and ratified by the community before this page becomes normative.
>
> Until then, only the on-chain rules in [Proposals & Execution](proposals.md) are enforced — those are in the contracts and cannot be bypassed. Everything here is social process: it has no on-chain enforcement, and its whole value is that participants follow it voluntarily.

A proposal that goes straight to an on-chain vote usually fails — not because it's a bad idea, but because nobody has seen it. The phases below exist to surface objections while changing the proposal is still cheap.

***

### The three phases

| Phase | Where | Duration | To advance |
|---|---|---|---|
| **1. Request for Comment** | Governance forum | ≥ `TBD` days | Rough consensus in the thread. No formal vote |
| **2. Temperature Check** | [Snapshot](https://snapshot.box/#/s:unibase.eth) | `TBD` days | ≥ `TBD` vUB voting **For**, and For > Against |
| **3. On-chain Vote** | Governor (via Tally, or `cast`) | 1-day delay + 7-day vote + 2-day timelock | Quorum (4%) + simple majority — **enforced on-chain** |

Only Phase 3 is binding. Phases 1 and 2 are gates that a proposal should pass through, not gates that the contracts check.

***

### Phase 1 — Request for Comment

**Goal: find out what's wrong with your idea while it's still free to change it.**

* Post to the governance forum with a title of the form `RFC — <your title>`.
* State what you are proposing, what problem it solves, and who it affects. For parameter changes, state the **current** value, the **proposed** value, and what you expect to happen.
* Respond to questions. Revise the proposal in the thread.

Leave at least `TBD` days for discussion. If consensus is clearly absent when that window closes, the proposal should not advance — reopen the RFC instead of escalating to a vote you will lose.

***

### Phase 2 — Temperature Check

**Goal: measure sentiment without spending gas.**

* Create a Snapshot poll under [`s:unibase.eth`](https://snapshot.box/#/s:unibase.eth) summarizing the RFC, and calling out anything that changed between the RFC and the poll.
* Options are For / Against / Abstain, weighted by vUB.
* Link the poll back into the forum thread.

Snapshot votes are **gasless** — off-chain signatures, weighted by the same vUB balance the Governor reads. They cost a signature, not a transaction, which is why sentiment is measured here and not on-chain.

**Advancement:** at least `TBD` vUB voting For, with For > Against. If Against wins, the proposal does not advance.

***

### Phase 3 — On-chain Vote

**Goal: execute.**

At this point the process becomes contract-enforced, and the rules stop being negotiable:

| Requirement | Value |
|---|---|
| To submit a proposal | 2,500,000 vUB |
| Voting delay | 1 day (7,200 blocks) |
| Voting period | 7 days (50,400 blocks) |
| To pass | 4% quorum + For > Against |
| Before execution | 2-day Timelock |

Below the proposal threshold, partner with a delegate who holds enough vUB to submit on your behalf — the proposal is yours, the submission is theirs.

**Simulate your calldata before submitting.** See [Proposals & Execution](proposals.md#simulate-before-you-propose) — a proposal that reverts on execution still consumes the full ~10-day cycle before anyone finds out.

***

### Changing this process

Because these phases are social rather than on-chain, changing them does not require an on-chain vote — but it does require legitimacy. Process changes should themselves go through a Snapshot vote with a `TBD`-day period and `TBD` quorum.

***

### Open questions for ratification

The values left as `TBD` above are genuine decisions, not placeholders awaiting a default:

| Question | Consideration |
|---|---|
| RFC minimum duration | Long enough for people in every timezone to see it; Uniswap uses 7 days |
| Temperature Check duration | Shorter than the RFC — it measures, it doesn't deliberate |
| Temperature Check threshold | Absolute vUB, not a percentage, so a quiet week can't lower the bar. Must be reachable at **current** staked supply, which is small |
| Process-change quorum | Should be higher than a normal proposal — changing the rules deserves more consensus than using them |

> The Temperature Check threshold is the one to get right. Set it too high against today's staked vUB and nothing ever advances; set it too low and Phase 2 stops filtering anything.

***

### Next steps

* [Proposals & Execution](proposals.md) — the on-chain half, in detail
* [Staking & vUB](staking.md) — get voting power before any of this matters
