---
id: liquidation
title: Liquidation
sidebar_position: 340
---

# Liquidation

When a collateral vault liquidation is triggered, owner operations can no longer be performed on the vault and Stability Fees stop accruing on the vault's outstanding debt <!--TODO: this is not currently the case. debt keeps accruing until it's either been fully repaid or bad debt is incurred-->. In other words, triggering a liquidation freezes the debt, and the borrower is relieved of their obligations. In return, the protocol seizes the collateral and auctions it off on-chain in an attempt to recover the debt from third parties.

Liquidation auctions are Dutch auctions that either recover all debt or eventually time out. If a timeout occurs without all debt having been recovered but with collateral left in the vault, then a liquidation auction can be restarted by calling the start operation again. If a timeout occurs without all debt having been recovered and with no collateral left in the vault, then a restart is no longer possible, and the vault is said to have incurred **Bad Debt**.

## Operations

Puzzle that operations are performed on: [collateral_vault.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/collateral_vault.clsp)

Keeper operations:
* **start auction**: start a liquidation auction - puzzle: [vault_keeper_start_auction.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_keeper_start_auction.clsp)
* **bid**: submit a bid in a liquidation auction - puzzle: [vault_keeper_bid.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_keeper_bid.clsp)
* **recover bad debt**: extinguish bad debt - puzzle: [vault_keeper_recover_bad_debt.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_keeper_recover_bad_debt.clsp)

### Start auction

Starts or restarts a liquidation auction. A liquidation auction can be started if the value of the collateral, valued at the Statutes Price, is less than or equal to the vault's outstanding debt. The keeper that executes the start operation is referred to as the **initiator**. Executing the start operation entitles the initiator to the [liquidation incentives](./../user-guide/liquidation#liquidation-incentives).

A vault keeps track of the state of a Liquidation Auction in the ```AUCTION_STATE``` curried arg. Auction state variables:

* ```auction_start_time```: timestamp of when auction was (re-)started
* ```start_price```: price at which Dutch auction starts. calculated as Statutes Price * Starting Price Factor
* ```step_price_decrease_factor```: factor by which auction price decreases in each step of Dutch auction
* ```step_time_interval```: number of seconds for which an auction price is valid before it gets reduced again
* ```initiator_puzzle_hash```: puzzle hash at which the initiator has opted to receive the Liquidation Incentive
* ```remaining_initiator_incentive```: liquidation incentive still to be paid to initiator

Auction state variables are immutable until the auction finishes except for ```remaining_initiator_incentive```, which reduces with each bid until the Liquidation Incentives have been fully paid out to the initiator.

#### State changes

* ```AUCTION_STATE```: initialisation of all auction state variables

### Bid

Once started, keepers can bid in the liquidation auction until it times out.

Bidders specify how much of the remaining debt owed to the vault they would like to repay. This is the **BYC bid amount**. The collateral vault puzzle calculates the **XCH bid amount**, which is the amount of collateral that the bidder receives in return based on the current auction price. The current auction price in turn is calculated based on the time that has passed since the start of the auction, **Price Validity** (```step_time_interval```) and **Price Decrease Factor** (```step_price_decrease_factor```).

![Liquidation Auction coin spends](./../../static/img/Liquidation_auction_bid_coin_spend_diagram.png)

When a bid is successful, the amount of BYC that gets burned vs that which gets deposited into the Treausry is calculated using the same methodology as in the [repay operation](./collateral-vaults#repay).

If a liquidation auction has timed out and all the debt has been recovered, the liquidation was successful. The vault is released back to the borrower together with any collateral that wasn't claimed in the auction.

If a liquidation auction has timed out without all debt having been recovered it can be restarted via the start auction operation, unless there is no collateral left in the vault, in which case the vault is said to have incurred Bad Debt.

#### State changes

* ```TRANSFERRED_FEES```
* ```COLLATERAL```
* ```PRINCIPAL```
* ```AUCTION_STATE```: ```remaining_initiator_incentive``` gets updated if Liquidation Incentives weren't fully paid out yet
* ```DISCOUNTED_PRINCIPAL```

### Recover Bad Debt

A liquidation fails if all collateral has been sold off to bidders without all debt having been repaid to the vault. The remaining debt minus any Stability Fees that have not been transferred to Treasury is referred to as Bad Debt. Bad Debt can be recovered via the recover Bad Debt operation, which melts BYC from the Treasury to extinguish the Bad Debt.

![Recover bad debt](./../../static/img/Recover_bad_debt_diagram.png)

If there isn't enough BYC in the Treasury to cover the entire Bad Debt amount, keepers can refill the Treasury by [transferring Stability Fees](./collateral-vault#transfer-stability-fees) from collateral vaults that are neither in liquidation nor have incurred Bad Debt. If even after a Treasury refill there isn't enough BYC available to cover the entire Bad Debt, it is possible to extinguish only part of it. Any remaining Bad Debt should be recovered by holding [Recharge Auctions](./recharge-auction) to refill the Treasury.

Once all bad debt has been extinguished, i.e. both ```TRANSFERRED_FEES``` and ```PRINCIPAL``` are 0, ```AUCTION_STATE``` is set to nil. This returns the vault to eve state and hands control back to its owner.

#### State changes

* ```TRANSFERRED FEES```: gets reduced according to recovery amount
* ```PRINCIPAL```: gets reduced according to recovery amount
* ```AUCTION_STATE```: set to nil if all bad debt extinguished
* ```DISCOUNTED_PRINCIPAL```: set to nil
