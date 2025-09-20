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

Frequently used numbers are defined as constants as constants are referenced whereas numbers are spun up as Chialisp programs. For example
```
(defconst MINUS_ONE 1)
(defconst ZERO 0)
(defconst ONE 1)
```
and so on. Note that the modern Chialisp keyword ```defconst``` is used instead of ```defconstant```.


## Security

The protocol makes use of the Chialisp message conditions introduced by [CHIP 25](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0025.md). Message conditions protect against mismatched announce/assert conditions, which should no longer be used unless assertion by an unknown number of coins is required as is for example the case for Statutes.

### Securing solutions

The primary way in which coin spends are protected from modification in Chia are signatures. For example, the standard transaction puzzle emits an ```AGG_SIG_ME``` condition, rendering the spend invalid unless a corresponding signature is provided.

In the protocol, coins that have an owner have an inner puzzle or inner puzzle hash curried. Owners can use the standard transaction for the inner puzzle (recommended), or an inner puzzle of their choosing. All information required by outer layers of a coin's puzzle are extracted from the output of the inner puzzle. For example, the savings puzzle, ```savings_vault.clsp```, which itself is the inner puzzle of a BYC CAT, has an ```INNER_PUZZLE``` curried arg. The vault owner can spend the coin by providing a corresponding inner solution via the ```inner_solution``` solution arg of the savings puzzle. The conditions resulting from applying the inner solution to the inner puzzle are then filtered, to ensure that (a) no protocol conditions are generated to avoid clashes with conditions generated by the savings puzzle, and (b) there is only once ```CREATE_COIN``` condition. The ```CREATE_COIN``` condition is then parsed to extract args needed by the savings layer from it, such as the inner puzzle hash to be curried into the child savings vault, the new BYC balance of the vault, the amount of interest to withdraw, if any, and information needed approve the spend of the treasury coin from which to withdraw the interest, and so on.

For coins that don't have an owner, or coins that have spends paths that can be executed by non-owners, e.g. a collateral vault liquidation, using signatures is not a feasible approach as the private keys would have the be public, which would defeat their purpose. Instead, solution args of keeper spends are secured via message conditions. Puzzles are written so that every keeper spend path outputs a ```SEND_MESSAGE``` protocol condition with bitmask ```111-000```, coin ID to none, and treehash of solution args as its message. This message can then be received by a coin that the keeper controls, for example a fee or funding coin, ensuring that the solution of the protocol coin cannot be tampered with. The only exception to this is the Statutes coin, which emits no such ```SEND_MESSAGE``` condition since solution args are (a) enforced to be nil in announce spend path, (b) verified against a governance coin in mutate spend path, and (c) verified against oracle coin in update price spend path.

