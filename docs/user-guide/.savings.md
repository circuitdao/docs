---
id: savings
title: Savings
sidebar_position: 30
---


# Savings

By depositing BYC into a **savings vault**, BYC holders can earn interest on their stablecoins. The **Savings Rate** (SF) applicable to BYC deposited in the savings vault is given as an annual percentage yield (APY), for example 4.5%.

![Saving BYC](./../../static/img/Savings_diagram.png)

BYC deposited in the savings vault can be withdrawn at any time.

Interest on BYC balances accrues by the second according to the prevailing SR. The Savings Rate does not compound, and only ever applies to the BYC balance. Interest is paid out when BYC is withdrawn from the savings vault. The amount of accrued interest paid out is proportional to the amount of BYC withdrawn.

Interest is paid out in BYC, which is taken from the [System Buffer](./system-buffer). If there is not enough BYC in the Savings Buffer, withdrawals cannot be processed until a additional BYC becomes available via a [Refill Auction](./system-buffer#refill-auction).

## Savings Rate

The SR is a mechanism by which the protocol passes on a percentage of SFs received from borrowers to savers.

The Savings Rate sets an incentive for users to buy and hold BYC, supporting the BYC peg from below.

The Savings Rate is set by governance. Although it is not directly tied to the SF, both parameters have an impact on the peg, and this interplay should be considered by governance when setting these parameters.

## Notes

Note that the SR can be greater than the SF due to the fact that not all outstanding BYC gets deposited in the savings vault.

In the event of an Emergency Shutdown, the Savings Rate gets set to 0 to prevent the protocol from incurring any further liabilities.

## Parameters

* **Savings Rate (SR)**
    * recorded in: Statutes
    * initial value: 80%
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations: The higher this value is set, the more support is given to the BYC-USD peg from below. If the value is set too high, it may slow down the rate at which the System Buffer fills up.

<!-- Note that MakerDAO sets the savings rate independently from the Stability Fee. The reason apparently being that it's an easier to understand product. -->