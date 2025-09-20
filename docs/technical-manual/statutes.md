---
id: statutes
title: Statutes
sidebar_position: 320
---

# Statutes

**Statutes** are a set of mutable parameters that determine the behaviour of Circuit protocol. They are effectively the global state variables of the protocol.

There are two different types of Statutes:
* protocol-updated:
* governance-updated

In addition, there is the [Statutes Price](./../user-guide/price-oracle), which is provided by the Oracle and used value the XCH held in collateral vaults.

Protocol-updated Statutes are those that the protocol keeps track of automatically by enforcing updates as part of certain protocol coin spends.

Governance-updated Statutes require a governance vote to be updated. For details see the [governance](./governance) page. The Statutes Price is a delayed version of the Oracle Price.

![Statutes singleton](./../../static/img/Statutes_singleton_diagram.png)

Each Statute has an index, value and a name by which it can be identified. In addition, Governance-updated Statutes have a set of **Constrainsts** associated with them, which place certain constraints on how a Statute may be updated.

## Statutes singleton

Statutes are kept is a [standard singleton](https://chialisp.com/singletons/), referred to as the **Statutes singleton**. The Statutes singleton's inner puzzle can be found in [statutes.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/statutes.clsp).

When a protocol coin is spent, required Statutes values are passed to the coin's puzzle via its solution. Puzzles of protocol coins must be written so that for every Statute value they use, there is a statement that asserts a corresponding Statute announcement from the Statutes singleton. This ensures that Statute values passed to protocol coins cannot be faked.

In practice, this means that Statute announcements from the Statutes singleton are needed by almost every spend in the protocol. Since users interact with the protocol independently of each other, the Statutes singleton preemptively announces all Statutes values with every spend. Thanks to [identical spend aggregation](https://docs.chia.net/faq/#what-is-identical-spend-aggregation), which allows multiple spend bundles to include the same spend of a coin in the same block, this means that at most one Statutes singleton spend is required per block, no matter the number of protocol operations performed by users.

![Statutes spend](./../../static/img/Statutes_spend_diagram.png)

For example, a borrower taking out a new loan, another withdrawing collateral, and a third having their vault liquidated, all while savers go about their business depositing and withdrawing from their savings vaults, can all happen simultaneously in the same block and requires only one spend of the Statutes singleton.

Protocol coins know how to assert Statute announcements by having the **Statutes struct** curried into them. This is the conventional singleton struct:

```Statutes struct = (MOD_HASH . (LAUNCHER_ID . LAUNCHER_PUZZLE_HASH))```

In combination with the Statutes singleton's inner puzzle hash, which is passed in via the solution, protocol coins can construct the Statutes puzzle hash using the ```calculate-statutes-puzzle-hash``` function found in [statutes_utils.clib](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/include/statutes_utils.clib#L52). Protocol coins use this puzzle hash to send a message to the Statutes singleton to assert the relevant Statute value.

The Statutes singleton can only be spent once per block. This prevents attack vectors in which a Statute could be announced twice, but with different values, in the same block pursuant to a governance proposal to change the Statute value.

## Constraints

Governance-updated Statutes come with Constraints that define limitations on how Statute values may be modified:

* **Proposal Threshold**: minimum amount of CRT required to make a proposal
* **Veto Period**: time period (in seconds) during which a proposal can be vetoed
* **Implemenation Delay**: time (in seconds) that needs to pass before the new Statute value becomes effective after the end of the veto period
* **Maximum Delta**: the maximum absolute amount by which the Statute value may change

For further information on Constraints, see the [governance](./governance) page.


## Operations

There are three operations that can be performed on the Statutes singleton.

Keeper operations:
* **announce**: announces all Statutes without doing anything else - puzzle: [statutes.clsp](https://github.com/circuitdao/puzzles/blob/review3_fixes/circuit_puzzles/statutes.clsp)
* **update price**: updates the Statutes Price - puzzle: [statutes_update_price.clsp](https://github.com/circuitdao/puzzles/blob/review3_fixes/circuit_puzzles/programs/statutes_update_price.clsp)

Governance operations:
* **mutate**: - puzzle: [statutes_mutation.clsp](https://github.com/circuitdao/puzzles/blob/review3_fixes/circuit_puzzles/programs/statutes_mutation.clsp)
  * **update Statute**: updates a Statute value and its Constraints
  * **pass custom conditions**: cause Statutes to output custom condition(s)

All operations announce pre-operation Statutes as well as post-operation Statutes Price Info.

The Statutes singleton enforces certain restrictions on the order in which these operations can be executed. For details see the page on [Statutes operations ordering](./advanced-topics/statutes-operations-ordering).

In practice, the Statutes Price would typically be updated by a Data Provider as they get rewarded for this. See the [Oracle](./oracle) page for details. Since the protocol offers no direct incentives for performing the other operations, those are typically performed by parties that benefit indirectly from them. Announcement spends are required by various protocol operations that assert Statutes announcements, and a Statute update would typically be paid for by a CRT holder that initiated or supported the corresponding governance vote.

### Announce

Announces all Statutes and Statutes Price Info. This spend does not allow a prior ephemeral Statutes spend to prevent malicious actors chaining multiple announce spends in the same block, making it unnecessarily difficult for governance to get a mutate or update price spend into the mempool.

Note that the announce spend requires the ```governance_curried_args_hash``` solution argument to be nil. This ensures that the announce spend has a unique solution, making it straightforward to use by any protocol user via identical spend aggregation.

This operation announces all Statutes and Statutes Price Info.

This operation cannot be performed on an ephemeral Statutes singleton.

#### State changes

* ```PREV_ANNOUNCE```: set to 1

### Update statute

Updates an individual Statute. Requires the Statute's index and new value to be passed. Note that only Statutes with index >= 0 can be updated.

Note that the update Statute operation announces the existing (i.e. pre-update) Statutes. In other words, the mutated Statue value is only available to the protocol in the next Statute spend.

This operation announces all Statutes as they were before the update statute operation was performed. The operation also announce Statutes Price Info.

This operation can only be performed if the previous Statutes operation was an announce.

#### State changes

* Updates the value and constraints of exactly one Statute as per the corresponding governance proposal
* ```PREV_ANNOUNCE```: set to nil

### Pass custom conditions

Passing custom conditions is required in the following situations:
* Launching or changing ring ordering of a Treasury coin (bitmask: ```010-010```)
* Approving or disapproving an Announcer (bitmask: ```010-000```)
* Launching a Recharge Auction coin (bitmask: ```010-010```)

Since these are one-off operations specific to certain coins, there is no point in storing information pertaining to these operations in Statutes. Instead, custom conditions are included in their respective bills, and, upon enactment, get announced by Statutes.

The only custom condition type required by the protocol is ```SEND_MESSAGE```, which is enforced by the Statutes mutation operation.

The bitmasks used by custom announcements cannot be coin-specific since both sending coin (Statutes) as well as receiving coins may be spent before the corresponding governance proposal is enacted. In the case of Announcers, even the state of the coin may change before enactment, which means that the puzzle-to-none bitmask should be used when (dis)approving Announcers. That the state of Statutes may change is uncritical as the keeper enacting a custom condition bill can provide the provide the Statutes state in form of an inner puzzle hash to the receiving coin in the enactment spend.

This operation announces all Statutes, Statutes Price Info, and the custom condition(s) as per the corresponding governance proposal.

This operation can only be performed if the previous Statutes operation was an announce.

#### State changes

* ```PREV_ANNOUNCE```: set to nil

### update price

The update statutes price operation copies the Oracle Price Info to Statutes by storing it in the ```PRICE_INFO``` curried arg.

This operation announces all Statutes and the updated Statutes Price Info.

This operation can only be performed if the previous Statutes operation was an announce.

#### State changes

* ```PRICE_INFO```: gets updated to the lastest Oracle Price Info
* ```PRICE_UDPATE_COUNTER```: incremented by 1
* ```PREV_ANNOUNCE```: set to nil
.

## Statutes

Below is a complete list of Statutes, including their index, name in [statutes_utils.clib](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/include/statutes_utils.clib), and a brief explanation of their respective function and data type.

Current Statute values are shown on the dashboard (TODO: add links for testnet and mainnet).

### Fixed Statutes

(-6) ```PAYOUT_MOD_HASH```: hash of the [Payout mod](./surplus-auction)

(-5) ```OFFER_MOD_HASH```: hash of the [settlement payments mod](https://chialisp.com/offers/#code)

(-4) ```TREASURY_MOD_HASH```: hash of the [Treasury mod](./treasury)

(-3) ```APPROVAL_MOD_HASHES_HASH```: hash of list of [approval mod hashes](./statutes#approval-mods)

### Protocol-updated Statutes:

(-7) ```PRICE_UPDATE_COUNTER```: number of Statue Price updates since protocol deployment

(-2) ```PAST_CUMULATIVE_INTEREST_DF```: cumulative interest discount factor

(-1) ```PAST_CUMULATIVE_STABILITY_FEE_DF```: cumulative stability fee discount factor

### Governance-updated Statutes:

(0) ```STATUTE_ORACLE_LAUNCHER_ID```: launcher ID of Oracle singleton

(1) ```STATUTE_STABILITY_FEE_DF```: per-minute stability fee discount factor in millionths of a pip (100th of a basis point), e.g. 1.000 000 000 190, roughly equivalent to an annual DF of 1.05, which in turn is equivalent to a 5% APY

(2) ```STATUTE_INTEREST_DF```: per-minute interest discount factor in millionths of a pip (100th of a basis point), e.g. 1. 000 000 000 190, roughly equivalent to an annual DF of 1.05, which in turn is equivalent to a 5% APY

(3) ```STATUTE_CUSTOM_ANNOUNCEMENTS```:

(4) ```STATUTE_LIQUIDATION_RATIO```:

(5) ```STATUTE_ORACLE_M_OF_N```:

(6) ```STATUTE_ORACLE_PRICE_UPDATE_DELAY```:

(7) ```STATUTE_ORACLE_PRICE_UPDATE_DELTA_BPS```:

(8) ```STATUTE_PRICE_DELAY```:

(9) ```STATUTE_VAULT_MINIMUM_DEBT```:

(10) ```STATUTE_VAULT_AUCTION_PRICE_TTL```:

(11) ```STATUTE_VAULT_AUCTION_PRICE_DECREASE_BPS```:

(12) ```STATUTE_VAULT_AUCTION_TTL```:

(13) ```STATUTE_VAULT_AUCTION_STARTING_PRICE_FACTOR_BPS```:

(14) ```STATUTE_VAULT_INITIATOR_INCENTIVE_FLAT```:

(15) ```STATUTE_VAULT_INITIATOR_INCENTIVE_BPS```:

(16) ```STATUTE_VAULT_LIQUIDATION_PENALTY_BPS```:

(17) ```STATUTE_TREASURY_MINIMUM```:

(18) ```STATUTE_TREASURY_MAXIMUM```:

(19) ```STATUTE_MINIMUM_STABILITY_FEE_TRANSFER```:

(20) ```STATUTE_RECHARGE_AUCTION_TTL```:

(21) ```STATUTE_RECHARGE_AUCTION_MIN_CRT_PRICE```:

(22) ```STATUTE_RECHARGE_AUCTION_BID_TTL```:

(23) ```STATUTE_RECHARGE_AUCTION_MINIMUM_BID```:

(24) ```STATUTE_SURPLUS_AUCTION_TTL```:

(25) ```STATUTE_SURPLUS_AUCTION_LOT```:

(26) ```STATUTE_SURPLUS_AUCTION_BID_TTL```:

(27) ```STATUTE_SAVINGS_MINIMUM_INTEREST_WITHDRAWAL```:

(28) ```STATUTE_ANNOUNCER_CREDITS_PER_INTERVAL```:

(29) ```STATUTE_ANNOUNCER_CREDITS_INTERVAL```:

(30) ```STATUTE_ANNOUNCER_MINIMUM_DEPOSIT```:

(31) ```STATUTE_ANNOUNCER_PRICE_TTL```:

(32) ```STATUTE_ANNOUNCER_PENALTY_INTERVAL```:

(33) ```STATUTE_ANNOUNCER_PENALTY_FACTOR_PER_INTERVAL_BPS```:

(34) ```STATUTE_ENACTMENT_INTERVAL```:

(35) ```STATUTE_ANNOUNCER_DISAPPROVAL_MAXIMUM_PENALTY_BPS```:

(36) ```STATUTE_ANNOUNCER_DISAPPROVAL_COOLDOWN_TTL```:



## Statutes Price:

* **PRICE_INFO**: copied from Oracle once Oracle Price Delay has passed
  * **price**: XCH/USD price * 100, e.g. 3402 means a price of 34.02 USD per XCH
  * **last_updated**: [Unix timestamp](https://en.wikipedia.org/wiki/Unix_time) of when the price was recorded in the Oracle


## State and lineage

Fixed state:
* ```OPERATIONS```
* ```MOD_HASH```

Immutable state:
* ```APPROVAL_MOD_HASHES_HASH```: hash of list of [Approval mod](./advanced-topics/approval-mods) hashes
* ```TREASURY_MOD_HASH```: hash of treasury.clsp
* ```OFFER_MOD_HASH```: hash of settlement_payments.clsp
* ```PAYOUT_MOD_HASH```: hash of payout.clsp
* ```CAT_MOD_HASH```: the hash of the [CAT v2 mod](https://chialisp.com/cats/#code)
<!--TODO: move all of the above before MOD_HASH as these are fixed args-->
* ```CRT_TAIL_HASH```: hash of CRT tail program

Mutable state:
* ```PREV_ANNOUNCE ```: indicates whether [previous operation was an announce or not](./advanced-topics/statutes-operations-ordering)
* ```STATUTES```: list of governance-updated Statutes
* ```PRICE_INFO```: Statutes Price Info
* ``` PAST_CUMULATIVE_STABILITY_FEE_DF```
* ```PAST_CUMULATIVE_INTEREST_DF```
* ```PRICE_UPDATE_COUNTER```

### Eve state

The protocol deployer gets to decide on the initial values of mutable state variables.

```PREV_ANNOUNCE``` should be set to 2 so that an announce spend with prior ephemeral spend is possible. This is required for the Statutes singleton to be created by the [standard singleton launcher](https://chialisp.com/singletons/#launcher).

```STATUTES``` should be set to a reasonable set of values to ensure that Bytecash holds its peg from the start without immediate governance intervention

```PRICE_INFO``` should be set to the market price of XCH/USD. Ideally the Oracle is already running with a set of high-quality Announcers, in which case the Oracle Price can be used.

```PAST_CUMULATIVE_STABILITY_FEE_DF``` should be set to 1.

```PAST_CUMULATIVE_INTEREST_DF``` should be set to 1.

```PRICE_UPDATE_COUNTER``` should be set to 0.

### Amount

Statutes amount is always 1.

### Lineage

The Statutes singleton is a standard singleton and as such requires a [standard lineage proof](https://chialisp.com/singletons/#code) to be spent.
