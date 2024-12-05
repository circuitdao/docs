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

## Condition prefixes and filtering

When performing an operation on the protocol, it is usually necessary to spend multiple protocol coins at once, and for these coins to communicate with each other to ensure that each of them is being spent in a specific way. The mechanism that Chia uses for this are [conditions](https://docs.chia.net/conditions).

In addition, protocol coins may also want to communicate with the off-chain world, for example with the driver code that is used to construct coin spends. This can be achieved via driver hints, which also use conditions.

### Inter-coin communication

Inter-coin communication is facilitated by announcement and message conditions.

| condition                  | prefixable         |
|:---------------------------|:------------------:|
| SEND_MESSAGE               | :white_check_mark: |
| RECEIVE_MESSAGE            | :white_check_mark: |
| CREATE_COIN_ANNOUNCEMENT   | :white_check_mark: |
| ASSERT_COIN_ANNOUNCEMENT   |                    |
| CREATE_PUZZLE_ANNOUNCEMENT | :white_check_mark: |
| ASSERT_PUZZLE_ANNOUNCEMENT |                    |

For the protocol to be secure, it is crucial that the conditions marked as **prefixable** in the table above cannot be faked.

For example, if a user secures a vault with an inner puzzle, the inner puzzle must not output a SEND_MESSAGE condition that looks like an SEND_MESSAGE condition the outer puzzle could have generated, as this could be used to falsely signal to other coins that the vault is being spent in a certain way or has a certain state.

To prevent conditions from being faked, the protocol uses the same [trick](https://chialisp.com/cats/#prefixes) as CATs, and prepends the **protocol prefix** to the condition message:

```PROTOCOL_PREFIX = "CRT"```

The outer puzzle of any protocol coin can then filter all conditions generated by the inner puzzle or passed in via the solution, and fail the spend if a prefixable condition is encountered.

Assert conditions are not prefixable as these can only restrict the spend of the coin that outputs them, but have no effect on other coins.


### Driver hints

It can be difficult for drivers to tell the state of an unspent coin. The driver code would effectively need to reimplement the coin spend logic of the coin's parent puzzle, so that the state of the unspent coin can be derived from parent puzzle reveal and solution. However, this can be challenging, especially as there are no transpilers for Chialisp available yet, making driver code trying to accurately replicate Chialisp code prone to errors.

As a workaround, puzzles can communicate with the driver via remark conditions. If every spend path of a puzzle includes a remark condition that publishes the state of the child coin created, it is straightforward for the driver to construct the state of the child coin.

| condition | prefixable         |
|:----------|:------------------:|
| REMARK    | :white_check_mark: |

As with conditions use for inter-coin communication, the protocol makes sure that remark conditions used for driver hints cannot be faked by making the protocol prefix the first element following the condition code.

```(list REMARK PROTOCOL_PREFIX ...)```

The outer puzzle of any protocol coin can then filter all remark conditions generated by the inner puzzle or passed in via the solution, and fail the spend if a prefixed one is encountered.

:::warning
Collateral vaults use a prefixed remark condition from the inner puzzle to determine which vault operation is being performed. This means that vault owners need to be careful to only use inner puzzles that allows them to generate the required remark conditions if needed. This has the advantage that complex custody arrangements can be put into place (such as custom rules for how individual vault operations must be authorised), but comes with the risk that an error in the inner puzzle logic results in the collateral deposited in a vault becoming inaccessible.
:::


### Coin creation

The CREATE_COIN condition deserves special attention. Where there is an inner puzzle or the ability to pass in conditions via the solution, it would be possible for additional child coins to be created. This is problematic for [protocol coins](http://localhost:3000/technical-manual/overview#list-of-protocol-coins) that are singletons.

Although it would be possible to prefix CREATE_COIN conditions using the memo field, protocol condition filters ensure that no arbitrary CREATE_COINs can be generated from inner puzzles or solutions. CREATE_COIN conditions are either suitably processed or modified, or cause the spend to fail. If users want to tie the creation of a new coin to protocol coin spends, they can achieve this by using non-prefixed inter-coin communication conditions and protocol-external parent coins.


## Security

The protocol makes use of the Chialisp message conditions introduced by [CHIP 25](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0025.md). Message conditions protect against mismatched announce/assert conditions, which should no longer be used.

