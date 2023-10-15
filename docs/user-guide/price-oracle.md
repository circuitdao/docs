---
id: price-oracle
title: Price Oracle
sidebar_position: 60
---

# Price Oracle

The protocol needs to know the market price of XCH in US Dollars to function properly. It does this by retrieving the XCH/USD price from an oracle.

By having access to the XCH/USD price, the protocol can value XCH collateral deposited in vaults. If the value of collateral in a vault has dropped below the liquidation threshold, the vault becomes eligible for liquidation.

The protocol also requires an oracle for the BYC/USD price in case of an Emergency Shutdown. This oracle price will only be retrieved once an ES has been successfully triggered.

## Oracle provider

The price oracle will initially be provided by CircuitDAO as there are currently no existing oracles on Chia. The plan is to switch to a third-party oracle once a reliable alternative becomes available, in which case the CircuitDAO oracle will be retained as a back-up in case the third-party oracle fails.

:::info

The CircuitDAO oracle supports [identical spend aggregation](https://docs.chia.net/faq/#what-is-identical-spend-aggregation), allowing it to be used by multiple protocols simultaneously.

:::

## Price calculation

The oracle price for XCH/USD is based on OKX prices, where the majority of XCH trading occurs. The price is calculated as the weighted average of all trades over the last X minutes.

For BYC/USD, the price will initially be fed in manually based on market price observations around the time of the Emergency Shutdown. Once the protocol has been operational for a while and there are liquid markets for BYC/USD either on-chain or off-chain, this process will be automated. As with the XCH/USD oracle, the long-term plan is to pass this to a third-party provider.
