---
id: savings-vaults
title: Savings Vaults
sidebar_position: 215
---


# Savings Vaults

By depositing BYC into a **savings vault**, BYC holders can earn interest on their stablecoins. Interest accrues on the balance in the savings vault by the minute according to the prevailing **Savings Rate** (SR). The SR is shown as an annual percentage rate (APR), for example 4%.

![Saving BYC](./../../static/img/Savings_diagram.png)

### Balance

The balance in a savings vault consists of two components, **net deposits** and accrued **savings interest**. Net deposits is the amount of 'physical' BYC locked up in a savings vault. It is the sum of all BYC deposited in the vault minus the sum of all BYC withdrawn from the vault. Savings interest is the interest that has accrued to the vault less any withdrawn interest.

```Savings vault balance = net deposits + accrued savings interest```

Savings interest compounds, i.e. accrues on the entire vault balance. The protocol does not directly use the SR. Instead, there is an **Interest Discount Factor** (IDF) parameter in Stautes, which is defined as IDF = 1 + SR. Using the IDF instead of the SR simplifies calculations.

### Deposits

When making a deposit, the user can choose to either not receive an interest payment at all, or to get Treasury to pay out the entire accrued interest. In the former case, net deposits is increased by the amount of BYC deposited, and the amount of accrued interest remains the same. In the latter case, net deposits is increased by the amount of accrued interest.

### Withdrawals

When a withdrawal is made, by default as much BYC as possible is taken from accrued interest, with the remainder taken from net deposits. If interest is withdrawn, it must be no less than the **Savings Minimum Interest Amount To Withdraw**.

To give some examples, assume 1000 BYC were deposited in a savings vault, and that after half a year 20 BYC in interest have accrued:
* If a withdrawal for 500 BYC is made, then 20 BYC would be taken from Protocol Treasury, and 480 BYC from the savings vault. Immediately after the withdrawal, the vault would have net deposits of 520 BYC and no accrued interest;
* If on the other hand the Protocol Treasury only had a balance of 10 BYC at the time of the withdrawal, then those 10 BYC would be withdrawn together with 490 BYC from the savings vault, leaving the vault with 510 BYC in net deposits and 10 BYC in accrued interest;
* If the Protocol Treasury is empty, all 500 BYC would come from net deposits, leaving the vault with 500 BYC in net deposits and 20 BYC in accrued interest.


## Savings Rate

The Savings Rate is a mechanism by which the protocol passes on Stability Fees from borrowers to savers. It sets an incentive for savers to buy BYC and deposit it in a savings vault, which supports the BYC peg from below.

The Savings Rate is set by governance. Although it is not directly tied to the Stability Fee, both parameters play an important role in balancing supply and demand for BYC, and therefore in maintaining the peg. This should be the primary consideration for governance when setting the SR.


## Parameters

* **Interest Discount Factor (IDF)**
    * Statutes index: 2
    * initial value: 4%
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations: The higher this value is set, the more support is given to the BYC-USD peg from below. If the value is set too high, it may slow down the rate at which the System Buffer fills up. The SR should not be greater than the Stabiliy Fee, as this would present an arbitrage that could lead to unlimited losses to the protocol.

* **Savings Minimum Interest Amount To Withdraw** (TODO: rename to SAVINGS_MINIMUM_INTEREST_WITHDRAWAL_AMOUNT?)
    * Statutes index: 27
    * initial value: 10 BYC
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations: choose large enough to prevent Treausry coin hogging. Choose small enough to allow small scale savers to make regular withdrawals
