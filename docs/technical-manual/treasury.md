---
id: treasury
title: Treasury
sidebar_position: 360
---

# Treasury

The Treasury is a set of BYC coins with a special inner puzzle, [p2_circuit_treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/p2_circuit_treasury.clsp), that allows Treasury coins to be spent only in very specific ways.

The number of Treasury coins can be changed by goverance. Having several Treasury coins is necessary for savers to be able to withdraw interest simultaneously. Since each withdrawal requires a Treasury coin spend, savers would have to coordinate their withdrawals at the mempool level if they wanted to withdraw from the same Treasury coin in the same block. Although this is not impossible - even a unilateral replace-by-fee allows savers to attach their withdrawal to an existing withdrawal spend bundle in the mempool - it becomes increasingly difficult to reliably coordinate the more savers are involved. With multiple Treasury coins, these problems can be avoided as each saver can pick their own Treasury coin as long as there are no more savers wanting to withdraw interest than Treasury coins.

A Treasury coin's eve spend requires a custom announcement from Statutes to succeed, which in turn requires approval from governance.


## Operations

Puzzle that operations are performed on: [p2_circuit_treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/p2_circuit_treasury.clsp)

Keeper operations:
* **Update lineage**: switch Treasury coin lineage - puzzle: [p2_circuit_treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/p2_circuit_treasury.clsp)
* **Change balance**: withdraw from or deposit to Treasury and announce new balance - puzzle: [p2_circuit_treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/p2_circuit_treasury.clsp)

The balance of a Treasury coin can be changed by either depositing or withdrawing BYC from it. Whether a balance change is a deposit or withdrawal is inferred from the amount of a ```CREATE_COIN``` condition with same puzzle hash as the Treasury coin being spent. This condition must be passed to the puzzle via the ```input_conditions``` argument of the solution. The ```parse-conditions``` function guarantees that exactly one such condition exists, i.e. that exactly one descendant coin with identical puzzle hash is created from the Treasury coin being spent.

In case of a withdrawal, either additional ```CREATE_COIN``` conditions must be present that send the entire withdrawn amount to other addresses, or the entire withdrawal amount must be melted. A combination of the two is not possible.

A change balance operation announces the Treasury coin's new amount. To get an announcement of a Treasury coin's amount, a neutral change balance operation that doesn't change the coin's amount can be performed.

Every change balance operation needs to be approved by a coin that has one of the Approver Mods as its puzzle.

Operations that can withdraw from Treasury:
* Pay savings interest (withdraw)
* Recover Bad Debt (melt)
* Start surplus auction (withdraw)

Operations that deposit to Treasury:
* Repay debt (share of Stability Fees)
* Transfer SFs (all Stability Fees)
* Bid in liquidation auction (SFs + LP)
* Win recharge auction

There is no direct incentive for transferring Stability Fees. Savers that want to withdraw interest and keepers wanting to trigger a surplus auction have an incentive to transfer Stability Fees to keep the Treasury filled. CRT holders are also incentivised to keep the the Treasury filled to prevent Recharge Auctions from being triggered as they are dilutive to them.


## Treasury Coin Ring

The inner puzzle prevents Treasury coins from being divided, making them singletons. Although Treasury coins cannot be divided, it is possible to increase or decrease their amounts. This allows BYC to be deposited to and withdrawn from the Treasury. Since Treasury coins are BYC CATs, Treasury coins must be arranged in a ring when spent, just like with any other CAT. The ring can consist of any subset of Treasury coins, including a single coin.

![Treasury ring](./../../static/img/Treasury_ring_diagram.png)

Some operations require all Treausry coins to be spent at once. In order to allow the spender to prove that all coins are being spent, Treasury coins are linked to each other via their launcher IDs. Each Treasury coin does not only store its own launcher ID (in curried arg LAUNCHER_ID), but also the launcher ID of the preceding coin in the Treasury ring (as curried arg RING_PREV_LAUNCHER_ID).

### Number of Treausry coins to be spent per operation

The number of Treasury coins that need to be spent depends on the operation performed:

* Savings interest withdrawal: a single Treasury coin must be picked by the saver when performing an interest withdrawal. This allows multiple savers to make interest withdrawals in parallel.

* Loan repayment: a single Treasury coin must be picked to deposity to when a loan repayment results in Stability Fees getting paid into Treasury. This is the case unless the amount of SFs being repaid to the vault is less than or equal to the amount of SFs that have already been transferred to the vault.

* Transfer Stability Fees: a single treasury coin must be picked by to transfer Stability Fees to (TODO: would speading evenly across whole ring make more sense given that SF transfers are not time-ciritical and can be quite large for vaults with a lot of debt?)

* Recharge auction start: must spent all Treasury coins to verify that Treasury balance is below Treasury Minimum. No funds are deposited to or withdrawn from Treasury.

* Recharge auction win: must spend all Treasury coins to spread BYC amount raised (BYC lot amount) evenly across all Treasury coins

* Surplus auction start: keeper can select any Treasury coin sub-ring (TODO: check that this is the case and not whole ring is required). This is to prove that Treasury balance is greater than Treasury Maximum plus Surplus Auction lot amount. At the same time a withdrawal from Treasury to the Payment coin is made (TODO: check how this is done, greedy strategy or equally spread. Note that SA lot amount > Treasury Maximum is not an issue as SA needs SA lot amount + TMax to start).

* Recover Bad Debt: a single Treasury coin must be selected by the keeper who recovers bad debt.

* Liquidation auction bid: a single Treasury coin must be picked by bidder to deposit their BYC bid amount to.

The reason that multiple Treasury coins exists instead of just one, is to allow multiple savers and borrowers to make interest withdrawals and loan repayments, respectively, in parallel. In the case of interest withdrawals, this means faster liquidity for savers even in times of high withdrawal demand, and as such protects against bank runs (note that savers can always withdraw their savings balance independently of the availability or cost of spending a Treasury coin). TODO: also mention this on the Savings Vault page! Similarly, it enables more borrowers to repay their loans in a short period of time, which can be crucial to avoid liquidations when XCH prices are falling. TODO: also mention this on the Collateral Vault page! Governance should monitor the number of both savings and collateral vaults and choose and the number of Treasury coins accordingly, bearing in mind that too large a number of Treasury coins makes spends that require the whole ring to be spent expensive (Recharge Auction start and win). TODO: mention this on Governance page.

