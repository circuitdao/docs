---
id: accounting
title: System Accounting
sidebar_position: 40
---

# System Accounting

The protocol has certain assets and liabilities that arise from users interacting with it. Considering collateral vaults for example, when a user borrows BYC, a liability equal to the loan principal is created. Against this liability stands an asset, which is the debt that the user owes to the protocol. Recall that the debt is the sum of loan principal plus accrued Stability Fees, so that the net contribution to the protocol's balance sheet are the accrued Stability Fees.

The table below lists all the protocol's Bytecash assets and liabilities. The net amount is the **Protocol Surplus**, which is discharged via Surplus Auctions.

| Protocol component  | Assets                     | Asset type   | Liabilities                 | Liability type | Arises from                     |
| :-----------------: | :------------------------: | :----------: | :-------------------------: | :------------: | :-----------------------------: |
| Collateral vaults   | Outstanding debt           |  V           |                             |                | Loans taken out                 |
| Collateral vaults   |                            |              | Outstanding loan principal  | P              | Loans taken out                 |
| Collateral vaults   |                            |              | Bad debt                    | V              | Failed liquidation auctions     |
| Savings vaults      |                            |              | Accrued interest            | V              | Savings vaults deposits         |
| Treasury            | Stability Fees paid        |  P           |                             |                | Loans repaid                    |
| Treasury            | Liquidation Penalties paid |  P           |                             |                | Collateral vault liquidations   |
| Treasury            | Refills                    |  P           |                             |                | Refill auctions                 |
| Treasury            |                            |              | Auctioned off surplus       | P              | Surplus auctions                |

Not included are Savings Vaults deposits, as any BYC deposited in them is already accounted for as outstanding Bytecash. XCH deposited in collateral vaults is also not included as it secures the outstanding debt. (What do we do with XCH that ends up in a bad debt coin as a result of a failed liquidation?). 

Note that some of the assets and liabilities represent Bytecash tokens, while others are mere accounting measures (claims on Bytechash tokens). The former are marked by a P (physical) and the latter by a V (virtual) in the table above.

In some cases the distinction between physical and virtual assets and liabilities matters. For example, Savings Vaults depositors can only withdraw their accrued interest if there are physical coins available in the Treasury. For this reason, a minimum Treasury balance is maintained, which is sufficient to serve a typical rate of interest withdrawals. If the minimum balance is no longer met or an unusually large amount of interest withdrawals occurs, a refill auction is triggered. Refill auctions are also triggered to cover bad debt that cannot be covered from Bytecash physically held in the Treasury.

Breaking this down by protocol component, the situation is as follows:
* Collateral Vaults:
  * Bytecash gets created as users borrow it, creating a physical liability for the protocol equal to the loan principal.
  * When a loan is taken out, the debt is a (virtual) assets to the protocol. At the beginning, the debt equals the principal. Over time, the debt increases by accrued SFs. The debt is secured by XCH deposited into the vault as collateral.
  * On loan repayment, which occurs in physical form, the (proportional share of) principal is always melted. The (proportional share of) SFs are sent straight to the Treasury, unless the collateral vault has a surplus auction record with a non-zero value attached to it (see below). If so, an amount of SFs equal to the recorded value gets melted (or amount of SFs paid, whichever is less) and the record updated accordingly, and the remainder of the paid SFs (if any) enters the Treasury.
  * If a loan gets liquidated, liquidation auction bidders provide physical BYC to the protocol to repay the vault's debt. This BYC inflow is treated in exactly the same way as a loan repayment by borrower would have (see bullet point above). If a liquidation auction fails, i.e. the debt is not fully recovered, the protocol incurs bad debt. This is a virtual liability represented by the remaining debt owed to the protocol, which is recorded in bad debt coins.
* Savings vaults:
  * BYC deposited in a savings vault is a physical asset, for which there is a virtual liability of equal amount.
  * Any interest accrued on deposited BYC is a virtual liability of the protocol. When interest is withdrawn by a saver, the protocol must use physical BYC to the saver. To the extent that BYC is available in the Treasury, this is used, and any remaining BYC needed (if any) will be procured via refill auctions.
* Refill auction:
  * If balance is below the Treasury minimum balance, refill auctions can be triggered until the minimum is reached.
  * If there is bad debt exceeding the lot size (in terms of BYC owed, discounting any XCH that may still be locked up in bad debt coins), a refill auction can be triggered to cover the bad debt. In such a case, the refill auction is technically a bad debt auction, and any BYC procured is immediately burned to extinguish the bad debt (which is done by melting the corresponding bad debt coins). Note that bad debt auctions may include left-over XCH collateral, requiring a clear distinction between bad debt auction bidding and general Treasury refills).
  * Interest withdrawals from savings vaults are only possible when there is BYC in the Treasury. For larger withdrawals, savers may have to wait until several refill auctions have been completed to receive their funds.
* Surplus auction:
  * If there is physical Bytecash available in the Treasury, this is auctioned off.
  * If there is no physical Bytecash available in Treasury, new BYC is minted against SFs owed by borrowers. The amounts minted are recorded in the corresponding collteral vaults. When a loan gets repaid by a borrower (or a liquidation auction participant in case of a liquidation), an amount of SFs equal to the recorded mint balance gets melted. Any remaining SFs go to the Treasury.

Bytecash can be created via two processes: borrowers taking out loans and the protocol auctioning off virtual surplus. In both cases the BYC is issued against outstanding debt owed to the protocol. In the former case, BYC is issued against outstanding loan principal, in the latter case, BYC is issued against outstanding Stability Fees. This is sound, because outstanding principal and SFs together constitute the debt owed to the protocol, which in turn is secured by XCH deposited as collateral. In other words, there is no way for the protocol to mint more Bytecash than there is debt, and all debt is subject to overcollateralisation by XCH.