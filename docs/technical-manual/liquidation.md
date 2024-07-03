---
id: liquidation
title: Liquidation
sidebar_position: 340
---

# Liquidation

When a collateral vault liquidation is triggered, owner operations can no longer be performed on the vault and Stability Fees stop accruing on the vault's outstanding debt. In other words, triggering a liquidation freezes the debt, and the borrower is relieved of their obligations. In return, the protocol seizes the collateral and auctions it off on-chain in an attempt to recover the debt from third parties.

## Operations

Puzzle that operations are performed on: [collateral_vault.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/collateral_vault.clsp)

Keeper operations:
* **Start liquidation auction**: trigger a liquidation auction - puzzle: [vault_keeper_start_auction.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_keeper_start_auction.clsp)
* **Bid in liquidation auction**: submit a bid in liquidation auction - puzzle: [vault_keeper_bid.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_keeper_bid.clsp)
* **Recover bad debt**: burn BYC from Treasury to extinguish Bad Debt - puzzle: [vault_keeper_recover_bad_debt.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_keeper_recover_bad_debt.clsp)

### Start auction

Starts or restarts a liquidation auction. A liquidation auction can be started if the value of the collateral, valued at the Statutes Price, is less than or equal to the vault's outstanding debt.

Liquidation auctions are Dutch auctions that either recover all debt or eventually time out. If a timeout occurs without all debt having been recovered but with collateral left in the vault, then a liquidation auction can be restarted. If a timeout occurs without all debt having been recovered and with no collateral left in the vault, then a restart is no longer possible, and the vault is said to have incurred Bad Debt.

### Bid

Once started, keepers can bid in the liquidation auction until it times out.

Bid operation takes:
the amount of XCH is willing to bid
Target puzzle hash to send XCH to
It calculates current price base on amount of time passed since auction started
Where current_price is delayed price in statutes.

For bid to succeed it needs to:
* Burn (XCH amount in bid) * xch_price(t) of BYC
* Transfer XCH to themselves
* Update the auction state and XCH deposited + BYC minted state

If a liquidation auction has timed out and all the debt has been recovered, the liquidation was successful. The vault is released back to the borrower together with any collateral that wasn't claimed in the auction.

If a liquidation auction has timed out without all debt having been recovered it can be restarted via the start auction operation, unless there is no collateral left in the vault, in which case the vault is said to have incurred **Bad Debt**.

### Recover Bad Debt

A liquidation fails if all collateral has been sold off to bidders without all debt having been repaid to the vault. The remaining outstanding debt is referred to as Bad Debt. Bad Debt can be recovered via the recover Bad Debt operation, which melts BYC from the Treasury to extinguish the Bad Debt.

![Recover bad debt](./../../static/img/Recover_bad_debt_diagram.png)

If there isn't enough BYC in the Treasury to cover the entire Bad Debt amount, keepers can refill the Treasury by transferring Stability Fees from collateral vaults that are not in liquidation. If even after a Treasury refill there isn't enough BYC available to cover the entire Bad Debt, it is possible to extinguish only part of it. Any remaining Bad Debt should be recovered by holding [Recharge Auctions](./recharge-auction) to refill the Treasury.
