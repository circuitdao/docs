---
id: bad_debt
title: Bad Debt
sidebar_position: 345
---

# Bad Debt

If all of a vault's collteral has been auctioned off in a liquidation but there is still debt left, the vault is said to have incurred **Bad Debt**. Bad debt recovery is the process of melting BYC to extinguish the remaining debt from the vault with the aim of returning it to its owner. Since there is no collateral left to sell off, bad debt is recovered from Treasury assets, effectively socializing losses amongst CRT holders.

In the unlikely case that the liquidation initiator has not been paid their full initiator incentive, any remaining balance is forfeited. Any remaining accrued Stability Fees are owed to the Treasury, and as such cancel out for bad debt recovery purposes and are ignored too. This leaves the remaining principal as the bad debt that needs to be recovered. If there is a Treasury coin with amount larger than the remaining bad debt, this can be done in a single operation.

Otherwise bad debt can be recovered in multiple tranches, with the only requirement being that the amount recovered per operation must exceed **Minimum Treasury Delta** or recover all remaining Bad Debt.

Once all bad debt has been recovered, the vault is returned in eve state to its owner, i.e. without any collateral or debt.


## Operations

Puzzle that operations are performed on: [collateral_vault.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/collateral_vault.clsp)

Keeper operations:
* **recover bad debt**: extinguish bad debt - puzzle: [vault_keeper_recover_bad_debt.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_keeper_recover_bad_debt.clsp)

### Recover Bad Debt

A liquidation fails if all collateral has been sold off to bidders without all debt having been repaid to the vault. The remaining debt is referred to as Bad Debt. Bad Debt can be recovered via the recover Bad Debt operation, which melts BYC from the Treasury to extinguish the Bad Debt.

![Recover bad debt](./../../static/img/Recover_bad_debt_diagram.png)

If there isn't enough BYC in the Treasury to cover the entire Bad Debt amount, keepers can refill the Treasury by [transferring Stability Fees](./collateral-vault#transfer-stability-fees) from collateral vaults that are neither in liquidation nor have incurred Bad Debt. Alternatively, it is possible to hold [Recharge Auctions](./recharge-auction) to refill the Treasury. It is also possible to extinguish only part of the Bad Debt and wait for the Treasury to refill as borrowers repay Stability Fees that have accrued on their loans.

Once all bad debt has been recovered, ```AUCTION_STATE``` is set to nil. This returns the vault to eve state and hands control back to its owner.

Note that the initiator is not entitled to any upaind initiator incentive once the vault is in bad debt.

#### State changes

* ```AUCTION_STATE```: set to nil if all bad debt extinguished
  * ```initiator_incentive_balance```
  * ```byc_to_treasury_balance```
  * ```byc_to_melt_balance```
