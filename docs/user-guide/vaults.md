---
id: vaults
title: Vaults
sidebar_position: 10
---

# Vaults

A **vault** is a smart coin in which XCH can be deposited and from which BYC can be borrowed. XCH deposited in a vault is referred to as **collateral** as it backs any BYC borrowed.

Vaults can be created premissionlessly by anyone. Whoever creates a vault becomes its owner.

:::note

Vaults are sometimes referred to as **collateral vaults** to distinguish them from [savings vaults](./savings.md), which serve a different purpose.

:::


## Borrowing

Once a vault has been created and collateral deposited, the vault owner can take out a loan by borrowing BYC from it.

![Taking out a BYC loan](./../../static/img/Borrow_diagram.png)

The BYC borrowed when a loan is taken out is called the **principal**. While a BYC loan is outstanding, it accrues a **Stability Fee** (SF). This is similar to how interest accrues on traditional loans. The sum of principal and accrued Stability Fees is the **debt** owed to the vault.

The ratio of outstanding debt over collateral value of a vault is the **loan-to-value** (LTV) ratio. There is a **maximum loan-to-value** (Max LTV) that is enforced across all vaults to ensure that BYC remains sufficiently overcollateralized. For additional information see the [Liquidation](.liquidation) section.

:::info

The Max LTV determines how much BYC can be borrowed against the collateral in a vault.

:::


## Stability Fee

The Stability Fee can be thought of as an interest rate charged on BYC loans. It accrues per second on the outstanding principal. Because the SF applies to principal only and not to any accrued SFs, it doesn't compound.

The SF is the primary mechanism by which BYC maintains its 1:1 peg to the US Dollar.

* If BYC trades at > 1 USD in the market, the price can be brought down by lowering the SF, so that borrowing BYC becomes more attractive, thereby increasing the BYC supply.
* If BYC trades at < 1 USD in the market, the SF can be increased in order to make holding BYC more expensive, encouring repayment of BYC loans, which tightens the supply and pushes up the price of BYC.

Given that supply-demand dynamics for BYC are driven by the market, the SF needs to be adjusted on an ongoing basis. For this reason, CircuitDAO will hold a monthly **risk call** in which market developments and the need for any SF adjustements will be discussed. A governance vote is held two days after the risk call to implement any changes to the SF.

## Repaying loans

A borrower can repay their loans partially or fully by returning BYC plus a proportional share of the accrued SF to the vault.

For example, if a vault is owed 1000 BYC in principal and has accrued 15 BYC in SFs, the borrower can reduce their loan balance by 25% by repaying 250 + 3.75 = 253.75 BYC.

![Repaying a BYC loan](./../../static/img/Repay_diagram.png)

Repaying a loan lowers the Liquidation Threshold, which frees up collateral for the vault owner to withdraw.

## Liquidation

If the value of collateral in a vault drops below the Liquidation Threshold, the vault becomes eligible for liquidation. Liquidations ensure that BYC remains overcollateralized. When a liquidation is triggered, the protocol effectively seizes the vault from its owner, and auctions off the collateral it holds to recover the debt owed to the vault.

For details on the liqudation process please see the [Liquidation](./liquidation) page.

## Vault constraints

The protocol enforces a **minimum debt** (MD) that must be drawn when taking out a loan. This prevents too many small loans being taken out, which could be used as a form of attack on the protocol by clogging up block space with liquidations.

## Notes

:::note

When a loan is taken out from a vault, the BYC borrowed is minted ad hoc by the protocol. When a loan is repaid, the principal gets melted and the Stability Fees goes to the [Protocol Treasury](./protocol-treasury.md).

:::


## Parameters

* **Stability Fee (SF)**
    * recorded in: Statutes
    * initial value: 5% of loan principal, payable in CRT
    * updatable: yes
    * votes requied: tbd CRT
    * considerations: The SF is one of the key mechanisms by which the peg is maintained. The SF needs to be adjusted based on market conditions, i.e. according to supply and demand for Bytecash.
* **Minimum Debt (MD)**
    * recorded in: Statutes
    * initial value: 100 BYC
    * updatable: yes
    * votes requied: tbd CRT
    * considerations: Should be high enough to discourage spam attacks in which an attacker creates many small vaults in the hope of them all getting liquidated at once, clogging up Chia block space, and preventing timely liquidation of vaults. MD should also be high enough to prevent the harvesting of Absolute Liquidation Incentives, i.e. MD > ALI / Liquidation Penalty. Otherwise the MD should be kept as small as possible in order not to make it economically unviable for legitimate users to take out small loans.


<!--The protocol charges a **Vault Creation Fee** (VCF) whenever a new vault is created. The fee protects the protocol against too many small vaults being as a way of spamming the system and resulting in excessive blockspace use in the case of liquidations.-->

<!--
Other parameters used by MakerDAO:
* Global Debt Ceiling -> can be managed via the stability fee? Can we make this an 'informal' parameter?
* RWE Agreement
* Liquidation Penalty -> we moved this to Liquidations
-->


<!--* **Vault Creation Fee (VCF)**
    * recorded in: Statutes
    * initial value: TODO
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations: The fee should be large enough to discourage spam, but small enough to not discourage vault creation for legitimate use cases.
-->
