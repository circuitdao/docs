---
id: liquidation
title: Liquidation
sidebar_position: 120
---

# Liquidation

At the point when the liquidation of a collateral vault is triggered, Stability Fees stop accruing to the vault's outstanding debt. In other words, triggering a liquidation freezes the debt and the borrower is relieved of their obligations. In return the protocol seizes the collateral and auctions it of on-chain in an attempt to recover the debt from third parties.

## Operations

Puzzle: collateral_vault.clsp

* start auction
* bid
* recover bad debt

All three operations can be executed by anyone.

### Start auction

Starts a liquidation auction

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

### Recover bad debt

A liquidation fails if all collateral has been paid out to bidders without all debt having been repaid. The remaining outstanding debt is referred to as Bad Debt. Bad Debt can be recovered via the recover bad debt operation, which uses BYC from the Treasury for that purpose.

![Recover bad debt](./../../static/img/Recover_bad_debt_diagram.png)

If there isn't enough BYC in the Treasury, it is possible to recover only part of the Bad Debt. In such cases [Recharge Auctions](./recharge-auction) should be triggered to refill the Treasury.
