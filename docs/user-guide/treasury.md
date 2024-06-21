---
id: treasury
title: Treasury
sidebar_position: 40
---

# Treasury

The **Treasury** is a component of the protocol that stores BYC. It effectively functions as a buffer which takes in and distributes BYC in response to user interactions with the protocol.

The Treasury is filled by:
* Stability Fees (including Transferred Fees)
* Liquidation Penalties
* Treasury Shortfall

Treasury funds are discharged in the form of:
* Savings Interest
* Treasury Surplus

Note that funds in the Treasury cannot be directly accessed by anyone. The only way in which funds can leave the Treasury are to pay Savings Interest when savers make a withdrawal or to pay the winner of a Surplus Auction.

![Treasury as buffer](./../../static/img/Treasury_diagram.png)

If the Treasury balance exceeds the **Treasury Maximum** plus the [Surplus Auction Lot Amount](./surplus-auction), a **Surplus Auction** can be triggered that auctions off an amount of BYC equal to the Surplus Auction Lot Amount for CRT. If the Treasury balance remains above the Treasury Maximum plus the Surplus Auction Lot Amount, another Surplus Auction can be started right away.

If the Treasury balance is below the **Treasury Minimum** less the [Recharge Auction Lot Amount](./recharge-auction) or the protocol has incurred Bad Debt, a **Recharge Auction** can be triggered. The protocol auctions off CRT that it mints in return for an amount of BYC equal to the Recharge Auction Lot Amount to refill the Treasury. If the Treasury balance remains below the Treasury Minimum minus the Recharge Auction Lot Amount, another Recharge Auction can be started right away.

Another option to recharge the Treasury is to mint BYC against accrued Stability Fees in collateral vaults. This can be done by anyone at any time. The amount of BYC minted in this manner is kept track of in the **Transferred Fees** variable of the respective collateral vault. It is not possible to transfer fees in excess of accrued SFs, and a fee transfer is only allowed if it is larger than the **Minimum SF Transfer Amount** and the collateral vault is not in liquidation. Fee transfers are an important mechanism to ensure that there is enough Bytecash available in the Treasury for the protocol to meet its liabilities on demand.


Q: how can we prevent people from calling recharge auctions instead of transferring SFs, esp if there is an incentive for Recharge Auctions (is there though? and if there isn't, why not? wouldn't that be desireable so that bad debt auctions get triggered in a timely manner?!

![Treasury thresholds](./../../static/img/Treasury_thresholds_diagram.png)

It is governance's responsibility to continuously monitor the protocol's assets and liablities to ensure that the Treasury Maximum:
* is not set so low as to prevent the Treasury from holding enough BYC to cover the outstanding Savings Interest on demand
* is not set too high, so that the amount of BYC removed from circulation is so large that it causes BYC to trade above its peg

In practice, governance should set the Treasury Maximum to the amount of accrued Savings Interest plus a buffer that can be used to cover Bad Debt in case it arises. Similarly, the Treasury Minimum should be set so that it can cover an occurrence of Bad Debt.

Q: Why do we need a Treasury Minimum? -> If all SFs have been transferred out, we'd like to be able to build a buffer in case there's still accrued Savings Interest or Bad Debt arises? Ideally we should never get close to this scenario if governance does its job well. Does MakerDAO have a Treasury Minimum?


## Parameters

* **Treasury Minimum**:
    * Statutes index: 17
    * initial value: 0 BYC
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations:
* **Treasury Maximum**:
    * Statutes index: 18
    * initial value: 10,000 BYC
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations:
* **Minimum SF Transfer Amount**:
    * Statutes index: 19
    * initial value: 10 BYC
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations:
