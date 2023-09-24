---
id: price-oracle
title: Price Oracle
sidebar_position: 6
---

# Price Oracle

The protocol needs to know the market price of XCH and BYC to function properly. If the value of XCH locked-up in a vault drops below the value of outstanding debt multiplied by the liquidation ratio, the vault need to be liquidated.

The price oracle is currenty provided by CircuitDAO as there are no other oracles available on Chia. Eventual, the oracle will be able to be replaced by a third-party oracle by governance vote. In that case the CircuitDAO oracle will be retained as a back-up oracle in case the third party oracle fails.

The oracle supports identical spend aggregation.

The oracle price is calculated based on OKX prices. It is calculated as the weighted average of all trades over the last X minutes.







