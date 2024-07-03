---
id: design-decisions
title: Design decisions
sidebar_position: 398
---

# Design decisions

Numerous design decisions had to be made in creating Circuit protocol. These typically involve trade-offs between scalability, costs, code readability, and other factors. None of the trade-offs may negatively affect protocol security, which is a non-negotiabile requirement.

## Scalability

In terms of scalability, the protocol is designed to allow operations to occur independently of each other in the same block. Coins can access the protocol's global state by asserting Statute announcements from the Statutes singleton. However, like any other application running on Chia, Circuit protocol is limited by the block size limit of 11 billion in [costs](https://docs.chia.net/coin-set-costs/). Users should keep this in mind, as it may affect how quickly they can take certain actions or the amount of transactions fees they have to pay to get priority over others. For example, if ther is a sharp increase in the Stability Fee, many borrowers may want to repay their loans. It is therefore advisable for borrowers to follow governance votes, and to consider repaying loans during the Implementation Delay period already instead of waiting until the new Stability Fee gets enacted.

Users should also be aware of how market conditions may affect their ability to interact with the protocol. For example, a sharp drop in the XCH/USD price may lead to multiple liquidations of collateral vaults. Since keepers are paid a generous incentive to trigger and bid in liquidation auctions, Chia block space might become very expensive in such a scenario. This might make it uneconomical, espcially for smaller users, to interact with the protocol for some time. In a worst case situation, this could mean that there will be cascading liquidations because borrowers cannot get transactions processed to repay loans or top-up collateral. Again, this can be mitigated by monitoring the Oracle Price and using the Oracle Price Delay period to manage one's vaults before a Statutes Price drop becomes effective.

Savers should be aware that there is a limited number of Treasury coins.

## Costs

Generally, the aim has been to reduce the cost of coin spends as much as possible. This generally means reducing the cost of Chialisp code, both in terms of cost to run and byte-cost, and using the smallest number of curried arguments possible.

* The Chialisp code of operations that can be performed on a coin does not need to be part of the coin's puzzle. Instead, it is often cheaper to pass in operation-specific code via the puzzle solution. This is particularly useful for puzzles that allow many different operations, such as the collateral vault. To ensure that only permitted operations can be performed, operation mod hashes are curried into the puzzle:

    ```(mod OPERATIONS MOD_HASH ...)```

    where ```OPERATIONS``` is a list of permitted operation mod hashes, and ```MOD_HASH``` is the mod hash of the puzzle mod curried with the ```OPERATIONS``` list. Any remaining curried args are curried in together with the ```MOD_HASH```.

* Using custom singletons instead of relying on the [standard singleton](https://chialisp.com/singletons/). The standard singleton is an outer puzzle that often provides more flexility than needed. Apart from saving on code, it is also possible to eliminate the ```LAUNCHER_MOD_HASH``` curried arg, as a singleton can uniquely be identified by its launcher ID if it can be guaranteed that the launcher coin only has one descendant.

* Conditions make use of ```sha256``` hashes instead of ```sha256tree`` hashes whenever possible as a plain hash is cheaper than a treehash. In doing so, care must be taken to prevent byte shifting attacks by checking the length of each hashed element.

# Security

The protocol makes use of the Chialisp message conditions introduced by [CHIP 25](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0025.md). Message conditions protect against mismatched announce/assert conditions, which should no longer be used.

