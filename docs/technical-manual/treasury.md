---
id: treasury
title: Treasury
sidebar_position: 360
---

# Treasury

The Treasury is a set of BYC CAT singletons with inner puzzle [treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/treasury.clsp).

Having the Treasury consist of several Treasury coins is necessary for savers to be able to withdraw interest simultaneously. Since each withdrawal requires a Treasury coin spend, savers would have to coordinate their withdrawals at the mempool level if they wanted to withdraw from the same Treasury coin in the same block. Although this is not impossible - even a unilateral replace-by-fee allows savers to attach their withdrawal to an existing withdrawal spend bundle in the mempool - it becomes increasingly difficult to reliably coordinate the more savers are involved. With multiple Treasury coins, these problems can be avoided as each saver can pick their own Treasury coin as long as there are no more savers wanting to withdraw interest than there are Treasury coins.

Treasury coins cannot be converted back to standard BYC CATs or melted. In other words, once a Treasury coin has been launched it stays in existence forever. Governance should refrain from creating an unnecessarily large number of Treasury coins as this will irreversably increase the costs of spending the Treasury Ring.

Treasury coins are the only singletons in the protocol that can have more than one child coin. If a treasury coin is spent as part of a bad debt recovery operation, it creates a child treasury coin and an additional run tail coin which absorbs the withdrawal amount and melts it.

<!--
The reason that multiple Treasury coins exist instead of just one, is to allow multiple savers and borrowers to make interest withdrawals and loan repayments, respectively, in parallel. In the case of interest withdrawals, this means faster liquidity for savers even in times of high withdrawal demand, and as such protects against bank runs (note that savers can always withdraw their savings balance independently of the availability or cost of spending a Treasury coin). <!--TODO: also mention this on the Savings Vault page Similarly, it enables more borrowers to repay their loans in a short period of time, which can be crucial to avoid liquidations when XCH prices are falling. <!--TODO: also mention this on the Collateral Vault page Governance should monitor the number of both savings and collateral vaults and choose and the number of Treasury coins accordingly, bearing in mind that too large a number of Treasury coins makes spends that require the whole ring to be spent expensive (Recharge Auction start and win). <!--TODO: mention this on Governance page.-->


## Treasury Ring

Some operations require all Treausry coins to be spent at once. In order to allow the spender to prove that all coins are being spent, Treasury coins are linked to each other 1-by-1 via their launcher IDs in a closed loop, forming the **Treasury Ring**. Each Treasury coin stores its own launcher ID in curried arg ```LAUNCHER_ID```, as well as the launcher ID of the preceding coin in the Treasury Ring in curried arg ```RING_PREV_LAUNCHER_ID```.

![Treasury ring](./../../static/img/Treasury_ring_diagram.png)



## Number of Treausry coins to be spent per operation

The number of Treasury coins that need to be spent simultaneously depends on the operation being performed. Most operations can be performed with a single Treasury coin being spent, but those relating to certain Surplus and Recharge Auction operations require multiple and all Treasury coins to be spent respectively in order to prove whether the Treasury balance is above or below the required thresholds.

### When changing Treasury balance

The number of coins to be spent simultaneously when changing balance depends on the authorising Approval mod.

**One Treasury coin:**

* Transfer Stability Fees: a single treasury coin must be picked by to transfer Stability Fees to <!--TODO: would speading evenly across whole ring make more sense given that SF transfers are not time-ciritical and can be quite large for vaults with a lot of debt?-->

* Loan repayment: a single Treasury coin must be picked to deposity to when a loan repayment results in Stability Fees getting paid into Treasury. This is the case unless the amount of SFs being repaid to the vault is less than or equal to the amount of SFs that have already been transferred to the vault.

* Liquidation auction bid: a single Treasury coin must be picked by bidder to deposit their BYC bid amount to.

* Recover Bad Debt: a single Treasury coin must be selected by the keeper who recovers bad debt.

* Savings interest withdrawal: a single Treasury coin must be picked by the saver when performing an interest withdrawal. This allows multiple savers to make interest withdrawals in parallel.

**Any subset of Treasury coins:**

* Surplus Auction start: keeper can select any subset of Treasury coins to prove that Treasury balance is greater than Treasury Maximum plus Surplus Auction Lot Amount. For each selected Treasury coin, must specify a withdraw amount such that the sum of all withdraw amounts equals the Surplus Auction Lot Amount.

**Whole Treasury Ring:**

* Recharge auction start: must spent all Treasury coins to verify that Treasury balance is below Treasury Minimum. No funds are deposited to or withdrawn from Treasury.

* Recharge auction win: must spend all Treasury coins to spread BYC amount raised (BYC lot amount) evenly across all Treasury coins

In case where only one coin is required, that coin should be chosen which has the smallest/greatest BYC balance in case of a deposit to/withdrawal from Treasury. This is the behaviour of the dapp. Similarly, when starting a Surplus Auction, a subset of Treasury coins and withdrawal amounts should be chosen such that the Treasury ring overall is in as evenly balance a state as possible after the withdrawal. In cases where the whole Treasury ring must be spend, the deposit amount is spread evenly across all Treasury coins, with any remainder allocated to a coin that can be chosen arbitrarily.

### When changing Treasury Ring ordering

Inserting a Treasury coin into the Treasury Ring requires two spends. The Treasury coin to be inserted needs to be spent to point to the desired predecessor coin. At the same time the original successor coin to this predecessor coin needs to be spent to have its pointer changed to the Treasury coin being inserted.


## Operations

Puzzle that operations are performed on: [treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/treasury.clsp)

Approval mod operations:
* **change balance**: withdraw from or deposit to Treasury - puzzle: [treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/treasury.clsp)

Governance operations:
* **change ring ordering**: change Treasury coin ordering - puzzle: [treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/treasury.clsp)


### Change balance

The balance of a Treasury coin can be changed by either depositing or withdrawing BYC from it. Whether a balance change is a deposit or withdrawal is inferred from the amount of a ```CREATE_COIN``` condition with same puzzle hash as the Treasury coin being spent. This condition must be passed to the puzzle via the ```input_conditions``` argument of the solution. The ```parse-conditions``` function guarantees that exactly one such condition exists, i.e. that exactly one descendant coin with identical puzzle hash is created from the Treasury coin being spent.

In case of a withdrawal, either additional ```CREATE_COIN``` conditions must be present that send the entire withdrawal amount to other addresses, or the entire withdrawal amount must be melted. A combination of the two is not possible.

A change balance operation announces the Treasury coin's new amount. To get an announcement of a Treasury coin's amount, a neutral change balance operation that doesn't change the coin's amount can be performed.

Every change balance operation needs to be approved by a coin that has one of the Approver Mods as its puzzle.

Operations that can withdraw from Treasury:
* Pay savings interest (withdraw)
* Recover Bad Debt (melt)
* Start Surplus Auction (withdraw)

Operations that deposit to Treasury:
* Repay debt (non-transferred SFs)
* Transfer SFs (non-transferred SFs)
* Bid in liquidation auction (SFs + LP)
* Win Recharge Auction

There is no direct incentive for transferring Stability Fees. Savers that want to withdraw interest and keepers wanting to trigger a surplus auction have an incentive to transfer Stability Fees to keep the Treasury filled. CRT holders are also incentivised to keep the the Treasury filled to prevent Recharge Auctions from being triggered as they are dilutive to them.

Note that it is not possible to shift balances between Treasury coins. Protocol users and keepers should ensure that they keep Treasuy coin amounts balanced as much as possible by making withdrawals from coins with the greatest amounts, and depositing to coins with the smallest amounts. The standard drivers do this automatically.

#### State changes

* amount: set to new amount based on amount deposited or withdrawn


### Change ring ordering

Treasury coins form a ring by virtue of each Treasury coin referencing the launcher ID of its predecessor in the ring in the ```RING_PREV_LAUNCHER_ID``` curried arg. See the Treasury Ring section below for more details.

The change ring ordering operation allows governance to change the predecessor of a Treasury coin by changing ```RING_PREV_LAUNCHER_ID```. In addition, the change ring ordering operation is required to launch a new Treasury coin.

When governance launches a new Treasury coin, the coin needs to be inserted into the ring. Governance needs to decide which Treasury coin is going to be the predecessor of the new coin, and which Treasury coin is going to be its successor. This requires two simultaneous change ring ordering spends, one to launch and point the new Treasury coin to its intended predecessor, and one to point the successor coin to the new Treasury coin.

![Treasury change ring ordering coin spends diagram](./../../static/img/Treasury_change_ring_ordering_coin_spends_diagram.png)

In the diagram above, a new Treasury coin is launched and inserted into the Treasury ring between Treasury coins B and C.

It is governance's responsibility to ensure that the Treasury coins do indeed continue form a ring. This is not enforced or verified by the protocol. If the Treasury coins don't form a ring, it may not be possible to start Recharge Auctions, or they could be started while the Treasury's balance is still above the Treasury Minimum.

#### State changes
* ```RING_PREV_LAUNCHER_ID```: set to the new value approved by governance

In theory, it is possible for governance to insert multiple Treasury coins at once. In practice this is not recommended to keep things easier to trace on-chain.


## State and lineage

Fixed state:
* ```CAT_MOD_HASH```
* ```MOD_HASH```

Immutable state:
* ```STATUTES_STRUCT```
* ```BYC_TAIL_HASH```
* ```LAUNCHER_ID```: coin ID of the parent coin of the Treasury coin's eve coin.

Mutable state:
* ```RING_PREV_LAUNCHER_ID```: the launcher ID of the previous Treasury coin in the Treasury ring

### Eve state
A Treasury coin's eve spend requires a custom condition from Statutes to succeed, which in turn requires approval from governance.

The eve spend is enforced to be a change ring ordering spend. ```LAUNCHER_ID``` in the eve state is enforced to be the parent ID of the Treasury coin. ```RING_PREV_LAUNCHER_ID``` can be set to anything in eve state. It is governance's responsibility to set it to the launcher ID of another Treasury coin in the eve spend, so that all Treasury coins continue to form a ring.

### Amount

The eve amount of a Treasury coin can in theory be anything. However, in practice it is likely to be 0 as there is no incentive for anyone to launch a Treasury coin with a positive amount as this would effectively constitute a donation to the protocol.

The only way to increase or decrease the amount of an existing Treasury coin is via a change balanace spend.

### Lineage

The child Treasury singleton is created automatically by the Treasury puzzle.

Child coins of a treasuy coin are created by passing ```CREATE_COIN``` conditions to the solution arg ```input_conditions```. The ```parse-conditions``` function ensures that there is exactly one ```CREATE_COIN``` condition with a treasury puzzle hash which

* in case of a change balance spend has the exact same state as the Treasury coin being spent
* in case of a change ring ordering spend has the exact same state as the Treasury coin being spent except for ```RING_PREV_LAUNCHER_ID```, which is set to the value communicated by the corresponding custom condition message from Statutes.

In both cases, the resulting Treasury coin is the unique child coin that continues the Treasury singleton's lineage.

The lineage proof required for the eve spend is

```
lineage_proof = ()
```

and that for any other spend

```
lineage_proof = (parent_parent_ID parent_ring_prev_launcher_id parent_amount)
```

When making a withdrawal, it is possible to pass multiple CREATE_COIN conditions via ```input_conditions``` as long as they have a different puzzle hash to that of the unique child singleton. Each such CREATE_COIN condition would create a BYC CAT that contains some of the original amount of the Treasury coin, effectively constituting a withdrawal.

Not additional ```CREATE_COIN``` conditions are allowed in case of a deposit.
