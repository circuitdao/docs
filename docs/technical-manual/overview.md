---
id: overview
title: Overview
sidebar_position: 310
---

# Overview

The technical manual is intended for advanced users, keepers, and oracle data providers that would like to gain an in-depth understanding of the inner workings of the protocol.

For every protocol component, the manual details what their purpose is and which puzzles are involved. For each protocol coin there is a State and Lineage section which breaks down the curried args of the corresponding mod into fixed, immutable and mutable state variables. It also provides information on the eve state, the amount of a coin, and lineage proofs.

Another section deals with operation that can be performed on a given protocol coin. There is a brief overview of what operations exist, grouped by who can perform them. Also shown is the corresponding [driver hint](./design-decisions#driver-hints). Dedicated sections discuss each operation in more detail, including in many cases coin spend diagrams. Each section contains a list of state variables that may be changed by the operation as well as a brief, non-exhaustive explanation, of how each of them is typically changed.

A good starting point is the diagram below and the [Statutes](./statutes) page, given the central role of the Statutes singleton within the protocol.

![Protocol overview](./../../static/img/Protocol_overview_diagram.png)

## List of protocol coins

Coins that are part of the protocol are referred to as **protocol coins**. A complete list is given below.

Shown in the first set of parentheses is the type of coin each protocol coin is. All protocol coins are singletons. Some of them are unique, i.e. only exists once in the entire protocol, whereas others can exist multiple times. Some coins have an owner, which means that some or all operations can be performed only if authorised by the owner, whereas other coins can be spent by anyone.

The second set of parentheses shows whether the coin is a standard XCH coin or a BYC or CRT CAT, and whether any amount or merely a nominal amount (0 or 1 mojo) can be held in them. A CAT singletons is a coin that is both a CAT and a singleton. These are by definition custom singletons.

* [Statutes](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/statutes.clsp) (unique standard singleton) (nominal XCH)
* [Oracle](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/oracle.clsp) (unique standard singleton) (nominal XCH)
* [Announcer registry](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer_registry.clsp) (unique custom singleton) (nominal XCH)
* [Announcers](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/atom_announcer.clsp) (custom singleton with owner) (XCH)
* [Treasury coins](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/p2_circuit_treasury.clsp) (CAT singleton) (BYC)
* [Recharge Auction coins](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/recharge_auction.clsp) (CAT singleton) (BYC)
* Surplus Auctions:
  * [Surplus Auction coin](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/surplus_auction.clsp) (CAT singleton) (CRT)
  * [Payout coin](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/p2_surplus_auction.clsp) (CAT singleton) (BYC)
* [Collateral vaults](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/collateral_vault.clsp) (CAT singleton with owner) (XCH)
  * Liqudation Auction coin (CAT singleton) (XCH)
    * Bad Debt coin (CAT singleton) (nominal XCH)
* [Savings vaults](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/savings_vault.clsp) (CAT singleton with owner, multiple child coins allowed) (BYC)
* [Governance coins](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/governance.clsp):
    * Proposal coin (CAT singleton with owner) (CRT)
    * Veto coin (CAT singleton with owner) (CRT)

Ordinary Bytecash ([BYC](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/byc_tail.clsp)) and governance ([CRT](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/crt_tail.clsp)) tokens are not considered protocol coins.

Singletons are coins that have at most one descendant. A unique singleton is a coin of a type that exits only once in the entire protocol. A singleton with owner is a singleton that can only be spent by its owner(s). Note that singletons may also be CATs. Although CATs are generally designed to be fungible and arbitrarily divisible, an inner puzzle can constrain them to be non-fungible and non-divisible. This is for example the case with Treasury coins, Savings vaults, Recharge Auction coins, and Payout coins, all of which are singleton BYC CATs. Similarly, Surplus Auction and Governance coins are singleton CRT CATs.
