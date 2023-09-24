---
id: liquidation
title: Liquidation
---

# Liquidation

Liquidations are the mechanism by which the system forecloses BYC loans that have become insufficiently collateralized. Liquiation of a vault can be triggered as soon as the value of the collateral drops below the liquidation threshold (valued at the oracle price contained in the statutes).

When a liquidation is triggered, a liquidation auction begins (-> see liquidation auction) in which the vaults collateral is auctioned off for BYC. A liquidation is successful if the system manages to obtain BYC in the amount of the outstanding debt (principal + accrued stability fees) plus liquidation penalty. Otherwise, the liquidation is a (partial) failure, and the system accrues bad debt (-> see bad debt auction)

Liquidations are a crucial feature of CircuitDAO, as they ensure that vaults remain overcollateralized at all times. This guarantees that any outstanding BYC is backed by value exceeding its own value.


## Liquidation incentives

The system relies on keepers to trigger liquidations. Altough there is potentially money to be made from liquidations, there is no guarantee that this will be a sufficient incentive for keepers to trigger a liquidation. For example, in periods of high gas costs, keepers might prefer to wait and see if somebody else is willing to trigger a liquidation. Given the system- and time-critial nature of liquidations, keepers are paid an incentive to trigger a liquidation. The incentive is consists of two components:

* absolute liquidation incentive (ALI): an fixed amount of BYC (e.g. 10 BYC)
* relative liquidation incentive (RLI): a percentage amount of the debt owed (principal + accrued stability fees) by the vault being liquidated (e.g. 0.1%)

ALI and RLI are set in statutes and paid to the keeper once the liquidation auction has concluded. ALI and RLI are to be set such that they can be paid from the liquidation penalty in case the auction concluded sucessfully. if bad debt was incurred and the liquidation penalty doesn't cover ALI + RLI, the difference owed is paid from the system buffer.