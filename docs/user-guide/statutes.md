---
id: statutes
title: Statutes
sidebar_position: 90
---

# Statutes

Statutes are a set of parameters that define the behaviour of CircuitDAO. These parameters are effectively the global state variables of the protocol. Statutes are kept in a singleton.

The Statutes singleton makes use of [identical spend aggregation](https://docs.chia.net/faq/#what-is-identical-spend-aggregation), which allows multiple spend bundles to spend the same coin in the same block. This way any announcements from the Statutes can be asserted by various other coins at the same time.

For example TODO.

Parameters:

* XCH oracle price: gets copied from the oracle every X minutes
* BYC oracle price: only gets copied in case of emergency shutdown, when outstanding BYC is exchanged for collateral

