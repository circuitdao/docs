---
id: liquidation
title: Liquidation
sidebar_position: 20
---


# Liquidation

In a **liquidation**, the system recovers debt from a vault by auctioning off its collateral. A vault becomes eligible for liquidation if the value of the collateral locked-up in the vault drops below the **Liquidation Threshold** (LT).

![Liquidation threshold](./../../static/img/Collateralization_diagram.png)

The Liquidation Threshold is calculated as the **Liquidation Ratio** (LR) multiplied by the debt of the vault. The Liquidation Ratio is a global parameter that applies to all vaults.

:::info

The inverse of the Liqudiation Ratio is referred to as the **maximum loan-to-value** (Max LTV) ratio.

:::


## Liquidation Penalty

The protocol incentivizes borrowers to keep their vaults in a sufficiently overcollateralized state by charging a **Liquidation Penalty** (LP) whenever a vault gets liquidated. The Liquidation Penalty is a percentage of the debt owed to the vault at the point when the liquidation is triggered.

:::warning

When a vault gets liquidated, borrowers are charged a Liquidation Penalty, which is added to the vault's debt. Borrowers can avoid getting liquidated by repaying loans or topping up collateral.

:::

## Liquidation Process

The liquidation process consists of three steps:
1. Liquidation gets triggered by a keeper. Collateral in the vault is seized by the protocol.
2. Keepers bid on collateral until the debt, incl LP, has been recovered.
3. Leftover collateral is returned to Borrower.

If a liquidation auction fails to recover all BYC owed to a vault, it will eventually time out and get repeated. This continues until either either all BYC owed is paid back or all collateral has been sold, in which case the protocol incurs [Bad Debt](./bad-debt).

![Liquidation process](./../../static/img/Liquidation_diagram.png)

Liquidations are a crucial feature of the protocol, as they ensure that vaults remain overcollateralized, i.e. that any outstanding debt is backed by collateral exceeding its own value.

:::info

Liquidation is a key mechanism by which the protocol ensures that BYC remains fully backed.

:::

Collateral is valued using [Statutes Price](./price-oracle), the latest Oracle price available in [Statutes](./statutes). Debt, which is denominated in BYC, is valued at a 1:1 exchange rate to the US Dollar, independent of the market price of BYC. This ensures that if BYC depegs to the downside the effective Liquidation Ratio is higher, which is desirable. If BYC depegs to the upside, the effective Liquidation Ratio is lower, which is acceptable since BYC trading above its peg indicates high confidence in the protocol and the amount of collateral backing BYC.


## Liquidation Incentives

The system relies on keepers to trigger liquidations. Altough it is possible for bidders to turn a profit in a liquidation auction, there is no guarantee that this will be a sufficient incentive for keepers to trigger a liquidation. For example, in periods of high on-chain transaction costs, keepers might prefer to wait and see if somebody else is willing to trigger a liquidation. Given the system- and time-critial nature of liquidations, keepers are paid an incentive to trigger a liquidation. The incentive consists of two components:

* **Absolute Liquidation Incentive** (ALI): a fixed amount of BYC (e.g. 10 BYC)
* **Relative Liquidation Incentive** (RLI): a percentage amount of the debt owed (principal + accrued stability fees) to the vault being liquidated (e.g. 0.1%)

ALI and RLI are paid to the keeper once the liquidation auction has concluded. ALI and RLI are to be set such that they can be paid from the liquidation penalty in case the auction concludes sucessfully. If bad debt was incurred and the liquidation penalty doesn't cover ALI + RLI, the difference owed is paid from the Protocol Treasury.


## Liquidation Auction

Once a liquidation has been triggered, a liquidation auction starts in which the vault's collateral is sold for BYC to recover the debt owed to the vault. Liquidation auctions are descending price auctions, also known as [Dutch auctions](https://en.wikipedia.org/wiki/Dutch_auction).

The purpose of a Liquidation Auction is to recover debt as quickly as possible to avoid an undercollateralization of the vault. Dutch auctions are particularly well suited for this as they largely prevent tactical bidding and drawn out bidding wars. As soon as a bidder is happy with the latest auction price they can repay all or part of the outstanding debt at this price. Bids can be settled immediately as there is no need to wait for counter-offers as is the case with [English auctions](https://en.wikipedia.org/wiki/English_auction).

![Liquidation auction](./../../static/img/Liquidation_Auction_diagram.png)

The auction starts with a **Start Price** (SP), calculated as the [Statutes Price](./statutes) multiplied by the **Starting Price Factor** (SPF). The SPF is a factor slightly greater than 100% to account for a potential rebound in the XCH price before the auction starts.

As the auction is underway, the auction price automatically decreases step-by-step every few blocks as defined by the **Step Time Interval** (PV) parameter.

The amount by which the auction price is lowered in each step is specified by the **Price Decrease Factor** parameter. The PD is calculated as a percentage of the Start Price, and gets substracted from the previous auction price at each step.

The auction ends when either
* the vault's debt was fully repaid
* there is no collateral left in the vault; or
* the auction has timed out.

An auction ends when the **Liquidation Auction Timeout** has been reached. Since Start Price, Step Time Interval and Price Decrease Factor are deterministic, there is a **Minimum Auction Price** that can be reached before the auction times out. Governance should set parameters such that the Minimum Auction Price is low enough that a liquidation is highly likely even in the case of extreme price drops.

A timed out auction can be restarted. This process continues ad infinitum until either the debt gets fully repaid, or there is no collateral left, at which point any remaining debt (incl LP) becomes Bad Debt.


## Parameters

* **Liquidation Ratio (LR)**
    * Statutes index: 4
    * initial value: 150% of outstanding debt (valued at 1 BYC = 1 USD)
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations: The higher the LR, the more overcollateralized the system becomes, and the less likely a depeg to the downside becomes. On the other hand, a higher LR makes it less attractive to borrow BYC, due to the higher associated capital costs of having to lock up more XCH.
* **Liquidation Penalty (LP)**
    * Statutes index: 16 (TODO: rename in Statutes? Currently: LIQUIDATION_PENALTY_PERCENT)
    * initial value: 13% of BYC owed to vault
    * updatable: yes
    * votes required: XYZ CRT
    * considerations: Needs to be high enough to set a strong incentive to borrowers to keep vaults sufficiently collateralized without being unreasonably punitive.
* **Absolute Liquidation Incentive (ALI)** (TODO: rename? In Statutes: INITIATOR_FLAT_INCENTIVE)
    * Statutes index: 14
    * initial value: 10 BYC
    * updatable: yes
    * votes required: XYZ CRT
    * considerations: Needs to be high enough to incentivize keepers to trigger liquidation of small vaults that pay a negligible RLI (see below). The ALI should also cover the incentivize the first bidder in the subsequent liquidation auction (introduce a separate parameter for this, given that transaction fee cost of triggering and bidding might differ?). If trigger keeper and first bidder are different, the incentive gets split.
* **Relative Liquidation Incentive (RLI)** (TODO: rename? In Statutes: INITIATOR_RELATIVE_INCENTIVE)
    * Statutes index: 15
    * initial value: 0.1% of debt owed to vault
    * updatable: yes
    * votes required: XYZ CRT
    * considerations: Needs to be high enough to incentivize keepers to trigger liquidation of large vaults even in extremely high fee environments, without being so high that it discourages borrowers to use the protocol.
* **Starting Price Factor (SPF)**
    * Statutes index: 13
    * initial value: 110% of latest oracle price
    * updatable: yes
    * votes required: XYZ CRT
    * considerations: A higher value enables keepers to bid in more scenarios in which there's been a rebound of the market price between the latest oracle update and start of bidding. A lower value makes it more likely that the auction will finish quickly if the collateral price continues to fall after the latest oracle price was published.
* **Step Price Decrease Factor (PD)**
    * Statutes index: 11
    * initial value: 2% of Starting Price
    * updatable: yes
    * votes required: XYZ CRT
    * considerations: A higher value results in a shorter auctions, which reduces the probability that the price drops further while the auction hasn't concluded. It also leaves bidders with a higher profit margin. A lower value results in longer auctions with smaller margins for keepers.
* **Step Time Interval (STI)**
    * Statutes index: 10
    * initial value: 1 block
    * updatable: yes
    * votes required: XYZ CRT
    * considerations: A higher value gives keepers more time to bid, but increases the risk that the value of the collateral falls further until the auction has completed. A low value might make it difficult for keepers that bid manually to keep up.
* **Liquidation Auction Timeout (LAT)** (TODO: rename in Statutes? in Statutes: VAULT_AUCTION_TIMEOUT)
    * Statutes index: 12
    * initial value: 6 hours
    * updatable: yes
    * votes required: XYZ CRT
    * considerations: A higher value allows keepers more time to participate in a liquidation auction, but increases the risk that more bad debt accrues. However, if there are no keepers available to participate in liquidation auctions, it is unlikely that a bad debt auction will see bids.

<!--
MakerDAO:
* Supports different types of auction price function. linear step, exponential, and step exponential
* Local Liquidation Limit: max amount of debt for which collateral auctions for a given collateral type can be active. -> Needed? Maybe not as long as we have just one vault type.
* Global Liquidation Limit: max amount of debt for which collateral acutions can be active. -> Needed? Maybe not as long as we have just one vault type.
* Breaker Price Tolerance: Limits the amount by which successive oracle prices can deviate from each other. -> Needed?


For an analysis of possible parameter choices in the case of ETH collateral, see https://maker-report.gauntlet.network/


* **Minimum Price Factor (MPF)**
    * Statutes index:
    * initial value: 20% of Starting Price
    * updatable: yes
    * votes required: XYZ CRT
    * considerations: A higher value might prevent the auction price from reaching a level at which keepers are willing to bid if the market price continues to fall. The primary risk of a low value is that collateral gets sold below market value if unusual conditions prevent keepers from bidding. Such conditions may include extreme transaction fees or clogged blocks, technical difficulties experienced by keepers participating in auctions, etc.
-->
