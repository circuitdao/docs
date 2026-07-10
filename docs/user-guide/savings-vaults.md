---
id: savings-vaults
title: Savings Vaults
sidebar_position: 215
---


# Savings Vaults

By depositing BYC into a **savings vault**, BYC holders can earn interest on their stablecoins. Interest accrues according to the prevailing **Savings Rate** (SR). The SR is shown as an annual percentage rate (APR), for example 4%.

![Saving BYC](./../../static/img/Savings_diagram.png)

### Savings

The **savings** in a savings vault consist of two components, **savings balance** and **accrued interest**. The savings balance is the amount of 'physical' BYC locked up in a savings vault, i.e. the amount of the savings vault coin. Accrued interest is the amount of interest that has accrued to the vault.

```
savings = savings balance + accrued interest
```

### Interest

Savings interest compounds. It accrues by the minute on the vault's entire savings. Accrued interest is an accounting measure until an interest withdrawal is made, in which case 'physical' BYC from the Treasury gets paid out.

The protocol doesn't use the SR directly. Instead, the **Interest Discount Factor** (IDF), a per-minute accrual factor, is used at the protocol level.

### Deposits

When making a deposit the savings balance is increased by the amount of BYC deposited, while accrued interest remains unchanged.

### Withdrawals

When making a withdrawal, the user automatically receives an interest payment from the Treasury for the entire accrued interest. The savings balance is decreased by the amount of BYC withdrawn minus the accrued interest.

For example, if a user has a savings balance of 1000 BYC and 50 BYC in accrued interest and withdraws 100 BYC, the new savings balance would be 950 BYC. If on the other hand the user only withdraws 25 BYC, then the savings balance would increase to 1025 BYC. In both cases accrued interest resets to 0.

:::info

Savings can only be fully withdrawn if accrued interest exceeds the Treasury Delta Minimum.

:::

If accrued interest does not exceed the **Treasury Delta Minimum**, no interest payment can be made from the Treasury, and the user can withdraw at most the savings balance.


## Savings Rate

The Savings Rate is a mechanism by which the protocol passes Stability Fees received from borrowers on to savers. It sets an incentive for savers to buy BYC and deposit it in a savings vault, which supports the BYC peg from below.

The Savings Rate is set by governance. Although it is not directly tied to the Stability Fee, both parameters play an important role in balancing supply and demand for BYC, and therefore in maintaining the peg. This should be the primary consideration for governance when setting the SR.


## Parameters

* **Interest Discount Factor (IDF)**
    * Statute index: 2
    * Statute name: ```STATUTE_INTEREST_DF```
    * considerations: needs to be adjusted based on market conditions, i.e. according to supply and demand for Bytecash, to maintain the peg. the higher the value is set, the more support is given to the BYC-USD peg from below. must not be greater than the Stability Fee Discount Factor to prevent arbitrage against the protocol
* **Treasury Delta Minimum**
    * Statute index: 22
    * Statute name: ```STATUTE_TREASURY_MINIMUM_DELTA```
    * considerations: choose large enough to prevent Treasury coin hogging. choose small enough to allow small scale savers to make regular interest withdrawals
