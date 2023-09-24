---
id: liquidation-auction
title: Liquidation Auction
---

# Liquidation Auction

Liquidation acutions are Dutch auctions. 

## Start auction
If this vault becomes undercollateralized it’s possible to start the auction process. This will update the state of the auction with start time and initial price. See System variables.
Start auction can be called after auctions end without collecting all BYC debt. This process can be repeated for up to 6 hours, at which point any remaining debt becomes bad debt.

Formula to calculate outstanding BYC vault debt:

    Vault Debt = fee_(auction initiator % per second) * outstanding BYC + fee_(auction initiator fixed) + P *e^(fee_(interest per second) * vaultAgeInSeconds)

## Bid

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
