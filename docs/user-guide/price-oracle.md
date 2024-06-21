---
id: price-oracle
title: Price Oracle
sidebar_position: 60
---

# Price Oracle

The protocol needs to know the market price of XCH in US Dollars to function properly. It does this by retrieving the XCH/USD price from an Oracle, a special coin (singleton).

By having access to the XCH/USD price, the protocol can value XCH collateral deposited in vaults. This is crucial for two reasons:

* Borrowing: If a new loan gets taken out, the resulting Liquidation Threshold must remain below the value of the vault's collateral
* Liquidations: If the value of collateral in a vault drops below the Liquidation Threshold, the vault becomes eligible for liquidation

The XCH/USD market price is an off-chain metric. As such it cannot be obtained in a fully trustless manner. Instead, the Oracle price is updated based on prices provided by **data providers**. Each data provider obtains XCH/USD prices from crypto exchanges or other trading venues and publishes them on-chain via an **Announcer** coin. Governance can whitelist up to 32 Announcers.

![Oracle update](./../../static/img/Oracle_update_diagram.png)


## Oracle price updates

The Oracle price can be updated whenever it

* was last updated more than **PUAS** seconds ago; or
* has changed by more than **PUTB** basis points

Anyone can update the Oracle price, and when an update is performed, the new Oracle price is calculated as the median price of a number of whitelisted Announcers. Whoever performs the update can choose which Announcers to use, as long as the number of Announcers selected is no less than the **Oracle M-of-N** (M-of-N) parameter. Governance should not set the M-of-N parameter too close to the number of whitelisted Announcers in case some Announcers are expired or have published an inaccurate price. Such Announders should be used when updating the Oracle price.

![Statutes Price](./../../static/img/Statutes_price_diagram.png)

The protocol doesn't use the Oracle price directly. Instead, the Oracle price gets copied to Statutes after a certain amount of time, **Oracle Price Delay** (OPD), has passed. The price stored in Statutes is referred to as **Statutes Price**. This is the price that the protocol uses for all internal purposes, such as valuing collateral to determine whether a vault has become eligible for liquidation. The OPD is a safety feature that allows protocol users to anticipate the next Statutes Price.

:::info

Thanks to [identical spend aggregation](https://docs.chia.net/faq/#what-is-identical-spend-aggregation), other protocols built on Chia can use Circuit's Oracle price at no additional cost.

:::


## The role of data providers

Data providers are expected to provide regular, timely and accurate updates of the XCH/USD market price. In particular, Announcer prices must be updated no less often than given by the **Announcer Maximum Validity** (AMV) parameter. Otherwise the Anncouncer price is considered expired and can no longer be used to update the Oracle price.

Governance should closely monitor the performance of data providers, and replace those that perform poorly or can no longer be trusted. The larger the number of high-quality whitelisted data providers, the larger M-of-N can be chosen, and the lower the risk that the Oracle price is not reflective of the market price.

:::warning

Data providers are real-world entities that publish off-chain data on-chain. As such, the Oracle introduces an element of trust to Circuit protocol.

:::


## Data sources and price calculation

It is up to governance to decide what data sources data providers should take into account and how to aggregate them.

For example, as of the time of writing, the majority of XCH trading occurs on OKX. As a result, governance should require all data providers to incorporate OKX data in the XCH/USD price they publish.

Given that XCH trading volumes are still relatively small, there is a risk that a nefarious actor could attempt to manipulate the XCH/USD market price in order to force or prevent the liquidation of collateral vaults. In order to mitigate this risk, the Oracle price should be based on a volume-weighted average price over a trailing time window.

The longer the window over which the average price is calculated, the more capital is required to execute a price manipulation attack. See the page on Oracle price calculation for an analysis of historical trading volumes.


## Data provider rewards

Since publishing up-to-date price information comes with costs for data providers, the protocol allocates credits to them each time the Oracle price is copied to Statutes. The amount of credits per update of the XCH/USD price in Statutes is given by the **Credits per Update** (CPU) paramter.

Data providers can claim 1 CRT from the protocol for each credit received.


## Data provider penalties

To ensure that data providers take their job seriously, they are requied to lock up a bond in their respective Announcer coin. This bond is an amount of XCH as given by the **Announcer Minimum Amount** (AMA) parameter. If an Announcer price is expired, then the **Announcer Penalty Amount** (APA) is deducted from the bond every **Announcer Penalty Frequency** (APF) seconds, until an Announcer price is published again.



## Parameters


* **Oracle M-of-N (M-of-N)**
    * recorded in: Statutes
    * initial value: 2
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations:

* **Oracle Price Updatable after Seconds (PUAS)**
    * recorded in: Statutes
    * initial value: 3600 seconds
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations:

* **Oracle Price Updatable Threshold Bps (PUTB)**
    * recorded in: Statutes
    * initial value: 50 bps
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations:

* **Oracle Price Delay (OPD)**
    * recorded in: Statutes
    * initial value: 3600 seconds
    * updatable: yes
    * votes requied: XYZ CRT
    * considerations: a longer delay gives users of the system more time to perform mitigating actions should the oracle price be incorrect. it also gives governance more time to disable price updates in such a scenario. a shorter delay leads to more timely liquidations and more accurate limits on borrowing, both of which reduce risk of the system becoming insufficiently or under-collateralised.
