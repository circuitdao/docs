---
id: savings
title: Savings
sidebar_position: 30
---


# Savings

By depositing BYC into a **savings vault**, BYC holders can earn interest on their stablecoins. Interest accrues on the balance in the savings vault by the minute according to the prevailing **Savings Rate** (SR). The SR is shown as an annual percentage rate (APR), for example 4%.

![Saving BYC](./../../static/img/Savings_diagram.png)

## Balance

The balance in a savings vault consists of two components, **net deposits** and **accrued interest**. Net deposits is the amount of 'physical' BYC locked up in a savings vault coin. It is the sum of all BYC deposited in the vault minus the sum of all BYC withdrawn from the net deposits balance. Accrued interest is the interest that has accrued to the vault less any amounts deducted from it during withdrawals.

```savings vault balance = net deposits + accrued interest```

## Deposits

When a deposit is made, net deposits is increased by the amount of BYC deposited.


## Withdrawals

When a withdrawal is made, by default as much BYC as possible is taken from accrued interest, with the remainder taken from net deposits.

To give some examples, assume 1000 BYC were deposited in a savings vault, and that after half a year 20 BYC in interest have accrued:
* If a withdrawal for 500 BYC is made, then 20 BYC would be taken from Protocol Treasury, and 480 BYC from the savings vault. Immediately after the withdrawal, the vault would have net deposits of 520 BYC and no accrued interest;
* If on the other hand the Protocol Treasury only had a balance of 10 BYC at the time of the withdrawal, then those 10 BYC would be withdrawn together with 490 BYC from the savings vault, leaving the vault with 510 BYC in net deposits and 10 BYC in accrued interest;
* If the Protocol Treasury is empty, all 500 BYC would come from net deposits, leaving the vault with 500 BYC in net deposits and 20 BYC in accrued interest.

:::note
There is a fixed number of [Treasury Coins](./protocol-treasury). This limits the number of BYC withdrawals from the Protocol Treasury per block. To prevent depositors from being stuck in a withdrawal queue, it is possible to make a withdrawal from net deposits only. (Note: on a protocol level users can choose any split they like, but this is not currently supported by the app).
:::

## Savings Rate

The Savings Rate is a mechanism by which the protocol passes on a percentage of Stability Fees received from borrowers to savers. It sets an incentive for savers to buy and hold BYC, supporting the BYC peg from below.

The Savings Rate is set by governance. Although it is not directly tied to the Stability Fee, both parameters play an important role in balancing supply and demand for BYC, and therefore in maintaining the peg. This should be taken into account by governance when setting the SR.

## Notes

In the event of an Emergency Shutdown, the Savings Rate gets set to 0 to prevent the protocol from incurring any further liabilities.

## Parameters

* **Savings Rate (SR)**
    * recorded in: Statutes
    * initial value: 4%
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations: The higher this value is set, the more support is given to the BYC-USD peg from below. If the value is set too high, it may slow down the rate at which the System Buffer fills up. The SR should not be greater than the Stabiliy Fee, as this would present an arbitrage that could lead to unlimited losses to the protocol.
