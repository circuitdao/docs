---
id: price-oracle
title: Price Oracle
sidebar_position: 235
---

# Price Oracle

The protocol needs to know the market price of XCH in US Dollars to value the XCH deposited in collateral vaults. The protocol can access the XCH/USD price from an **Oracle**, a special singleton coin that is fed price information by **data providers**.

By having access to the XCH/USD price, the protocol can value XCH collateral deposited in vaults. This is crucial for two reasons:

* Borrowing: If a new loan gets taken out, the resulting Liquidation Threshold must remain below the value of the vault's collateral
* Liquidations: If the value of collateral in a vault drops below the Liquidation Threshold, the vault becomes eligible for liquidation

The XCH/USD market price is an off-chain metric. As such it cannot be obtained in a fully trustless manner. Instead, the Oracle price is updated based on prices provided by data providers. Each data provider obtains XCH/USD prices from crypto exchanges or other trading venues and publishes them on-chain in an **Announcer** coin.

![Oracle update](./../../static/img/Oracle_update_diagram.png)

Before the price of an Announcer can be used by the Oracle, governance must whitelist the respective Announcer and the data provider must register the coin with the **Announcer Registry**, another singleton coin.

## Oracle price updates

The Oracle price can be updated whenever it

* was last updated more than **Price Update Delay** seconds ago; or
* has changed by more than **Price Update Delta** basis points

Anyone can update the Oracle price, and when an update is performed, the new Oracle price is calculated as the median price of a number of whitelisted Announcers. Whoever performs the update can choose which Announcers to use, as long as the number of Announcers selected is no less than **Oracle M-of-N**. Governance should not set the Oracle M-of-N too close to the number of whitelisted Announcers in case some Announcers are expired or have published an inaccurate price. Such Announcers should be used when updating the Oracle price.

![Statutes Price](./../../static/img/Statutes_price_diagram.png)

The protocol doesn't use the Oracle price directly. Instead, the Oracle price gets copied to Statutes after a certain amount of time, **Oracle Price Delay** (OPD), has passed. The price stored in Statutes is referred to as **Statutes Price**. This is the price that the protocol uses for all internal purposes, such as valuing collateral to determine whether a vault has become eligible for liquidation. The OPD is a safety feature that allows protocol users to anticipate the next Statutes Price.

:::info

Thanks to [identical spend aggregation](https://docs.chia.net/faq/#what-is-identical-spend-aggregation), other protocols built on Chia can use Circuit's Oracle price at no additional cost.

:::


## The role of data providers

Data providers are expected to provide regular, timely and accurate updates of the XCH/USD market price. In particular, Announcer prices must be updated no less often than given by the **Announcer Delay**. Otherwise the Anncouncer price is considered expired and can no longer be used to update the Oracle Price.

Governance should closely monitor the performance of data providers, and replace those that perform poorly or can no longer be trusted. The larger the number of high-quality whitelisted data providers, the larger M-of-N can be chosen, and the lower the risk that the Oracle price is not reflective of the market price.

:::warning

Data providers are real-world entities that publish off-chain data on-chain. As such, the Oracle introduces an element of trust to Circuit protocol.

:::

To incentivize Announcers to do their job well, the protocol lets them claim rewards in the form of CRT tokens. In addition, Announcers are required to post an XCH bond which can be slashed if they fail to publish prices on a regular basis. For details please see the [Announcer Registry](./../technical-manual/announcer_registry) page in the Technical Manual.


## Data sources and price calculation

It is up to governance to decide what data sources data providers should take into account and how to aggregate them.

For example, as of the time of writing, the majority of XCH trading occurs on OKX. As a result, governance should require all data providers to incorporate OKX data in the XCH/USD price they publish.

Given that XCH trading volumes are still relatively small, there is a risk that a malicious actor could attempt to manipulate the XCH/USD market price in order to force or prevent the liquidation of collateral vaults. In order to mitigate this risk, the Oracle price should be based on a volume-weighted average price over a trailing time window.

The longer the window over which the average price is calculated, the more capital is required to execute a price manipulation attack.


## Statutes

* **Oracle M-of-N**
    * Statute index: 5
    * Statute name: STATUTE_ORACLE_M_OF_N
    * considerations: should be large enough to provide suffcient redundancy if some of the Announcers fail. should not be too large that Oracle Price can no longer be updated if some of the Announcers fail
* **Oracle Price Update Delay**
    * Statute index: 6
    * Statute name: STATUTE_ORACLE_PRICE_UPDATABLE_AFTER_SECONDS
    * considerations: should give protocol users enough time to manage their positions should the value seem incorrect. should be short enough that it does not unduly delay liquidations. The delay needs to be factored into the the Liquidation Ratio
* **Oracle Price Update Delta**
    * Statute index: 7
    * Statute name: STATUTE_ORACLE_PRICE_UPDATABLE_PERCENT_THRESHOLD
    * considerations: needs to be small enough so that liquidations can get triggered in a timely manner. should be large enough to prevent unnecessary oracle updates and oracle coin hogging attacks
* **Oracle Price Delay**
    * Statute index: 8
    * Statute name: STATUTE_ORACLE_PRICE_EXPIRATION_SECONDS
    * considerations: a longer delay gives users of the system more time to perform mitigating actions should the oracle price be incorrect. it also gives governance more time to disable price updates in such a scenario. a shorter delay leads to more timely liquidations and more accurate limits on borrowing, both of which reduce risk of the system becoming insufficiently or under-collateralised.
* **Announcer Delay**
    * Statute index: 31
    * Statute name: STATUTE_ANNOUNCER_DELAY
    * considerations:
