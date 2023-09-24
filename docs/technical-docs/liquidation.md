---
id: liquidation
title: Liquidation
sidebar_position: 2
---

# Liquidation

If the value of the collateral locked-up in a vault drops below a certain threshold relative to the BYC debt of the vault, the vault gets liquidated. In a **liquidation**, the system recovers debt from a vault by auctioning off its collateral.

:::info

Liquidation is the key mechanism by which the protocol ensures that BYC remains fully backed.

:::

The liquidation process consists of three steps:
1. Liquidation gets triggered. Collateral in the vault is seized by the protocol
2. Keepers submit bids in a liquidation auction until there is a winner
3. The auction gets settled, and the vault is dissolved

![Liquidation process](./../../static/img/Liquidation_diagram.png)

Liquiation of a vault can be triggered as soon as the value of the collateral drops below the liquidation threshold (valued at the oracle price contained in the statutes).

When a liquidation is triggered, a liquidation auction begins (-> see liquidation auction) in which the vault's collateral is auctioned off for BYC. A liquidation is successful if the system manages to obtain BYC in the amount of the outstanding debt (principal + accrued stability fees) plus liquidation penalty. Otherwise, the liquidation is a (partial) failure, and the system accrues bad debt (-> see bad debt auction)

Liquidations are a crucial feature of CircuitDAO, as they ensure that vaults remain overcollateralized at all times. This guarantees that any outstanding BYC is backed by value exceeding its own value.


## Liquidation incentives

The system relies on keepers to trigger liquidations. Altough there is potentially money to be made from liquidations, there is no guarantee that this will be a sufficient incentive for keepers to trigger a liquidation. For example, in periods of high gas costs, keepers might prefer to wait and see if somebody else is willing to trigger a liquidation. Given the system- and time-critial nature of liquidations, keepers are paid an incentive to trigger a liquidation. The incentive is consists of two components:

* absolute liquidation incentive (ALI): an fixed amount of BYC (e.g. 10 BYC)
* relative liquidation incentive (RLI): a percentage amount of the debt owed (principal + accrued stability fees) by the vault being liquidated (e.g. 0.1%)

ALI and RLI are set in statutes and paid to the keeper once the liquidation auction has concluded. ALI and RLI are to be set such that they can be paid from the liquidation penalty in case the auction concluded sucessfully. if bad debt was incurred and the liquidation penalty doesn't cover ALI + RLI, the difference owed is paid from the system buffer.

## Liquidation Auction

Liquidation acutions are Dutch auctions. 

### Start auction
If this vault becomes undercollateralized it’s possible to start the auction process. This will update the state of the auction with start time and initial price. See System variables.
Start auction can be called after auctions end without collecting all BYC debt. This process can be repeated for up to 6 hours, at which point any remaining debt becomes bad debt.

Formula to calculate outstanding BYC vault debt:

    Vault Debt = fee_(auction initiator % per second) * outstanding BYC + fee_(auction initiator fixed) + P *e^(fee_(interest per second) * vaultAgeInSeconds)

### Bid

Bid operation takes: 
the amount of XCH is willing to bid
Target puzzle hash to send XCH to
It calculates current price base on amount of time passed since auction started
Where current_price is delayed price in statutes.

For bid to succeed it needs to:
* Burn (XCH amount in bid) * xch_price(t) of BYC
* Transfer XCH to themselves
* Update the auction state and xch deposited + byc minted state 

Auction can end if it reaches MAP (see System variables) or all BYC in debt has been paid for. If MAP is reached, it can be restarted instantly. 

## Parameters

