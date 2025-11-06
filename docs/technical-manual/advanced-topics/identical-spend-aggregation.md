---
id: identical_spend_aggregation
title: Identical Spend Aggregation
sidebar_position: 1300
---

# Identical Spend Aggregation

In the coinset model, if multiple coins need to access information from the state of another coin, it is desirable that there is a unique spend (ie solution) of the coin whose state is being accessed. This ensures that users interacting with the protocol can construct their spend bundles without having to inspect the mempool and attaching the spends of their own bundle to an existing bundle via RBF. Instead, they can make use of **identical spend aggregation** (**ISA**), which is a mempool feature that allows a spend to be used in multiple spend bundles in the same block.

In the context of Circuit, this is particularly useful for two types of spends:
* Statutes announce operation
* Announcer announce operation

## Statutes announce operation

Because the Statutes singleton contains what is effectively the global state of the protocol, a Statutes coin spend is required for almost every operation so that other coins can assert any Statutes values needed.

## Announcer announce operation

The situation is subtly different for announce spends of Announcers. The operation is only needed as part of the Oracle update operation, which occurs infrequently. However, timely Oracle price updates are of critical importance for the protocol, and using the same mempool pollution attack outlined above could prevent or at least delay Oracle updates. If on the other hand the announce operation is ISAble, this no longer works given that all other keeper operations of the Announcer, namely penalize and govern, can only be performed in certain situations, which moreover only arise infrequently.

## Requirements for ISAbility

An operation is ISAble if the byte-code representation of the corresponding coin spend is guaranteed to be unique. Superficially, it is sufficient for the puzzle to check that all solution args have exactly the expected value. However, there are two subtleties to keep in mind. Firstly, the representation of an integer is not unique in CLVM as an arbitrary number of 0-bytes can be pre-pended to their representation. E.g. ```0x01``` equals ```0x0001```. Secondly, destructing into proper lists in CLVM works by discarding any excess elements. E.g. ```(a b c) (M N O)``` and ```(a b c) (M N O P)```, both get destructured into the proper list ```(M N O)```.

To prevent ambiguous integer representations, 

To prevent ambiguous input to destructing operations, we need to ensure we only ever destructure into improper lists (also called structs). Structs do not discard excess input elements but absorb them into their own final element. E.g. ```(a b . c) (M N O)``` results in the proper list ```(M N O)```, whereas ```(a b . c) (M N O P)``` results in the improper list ```(M N . (O P))```.

For the Announcer, achieving ISAbility was straightforward as it is a completely custom puzzle that was designed specifically for Circuit. The Statutes singleton on the other hand was originally designed to be a standard singleton. To make it ISAable, the standard singleton layer had to be modified in addition to the Statutes mod itself. The modified singleton layer can be found in ...
