---
id: overview
title: Overview
sidebar_position: 310
---

# Overview

The technical manual is intended for advanced users, keepers, and oracle data providers that would like to gain an in-depth understanding of the inner workings of the protocol.

For every protocol component, the manual details which puzzles are involved, what operations can be performed, and what the key coin spends look like.

A good starting point is the diagram below and the [Statutes](./statutes) page, given the central role of the Statutes singleton within the protocol.

![Protocol overview](./../../static/img/Protocol_overview_diagram.png)

## List of protocol coins

Coins that are part of the protocol are referred to as **protocol coins**. A complete list is given below.

* [Statutes](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/statutes.clsp) (unique singleton)
* [Oracle](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/oracle.clsp) (unique singleton)
* [Announcer registry](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer_registry.clsp) (unique singleton)
* [Announcers](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/atom_announcer.clsp) (singleton with owner)
* [Treasury coins](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/p2_circuit_treasury.clsp) (singleton)
* [Recharge Auction coins](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/recharge_auction.clsp) (singleton)
* Surplus Auctions:
  * [Surplus Auction coin](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/surplus_auction.clsp) (singleton)
  * [Payout coin](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/p2_surplus_auction.clsp) (singleton)
* [Collateral vaults](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/collateral_vault.clsp) (singleton with owner)  
&nbsp; &nbsp; ➤ Liqudation Auction coin (singleton)  
&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; ➤ Bad Debt coin (singleton)
* [Savings vaults](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/savings_vault.clsp) (singleton with owner)
* [Governance coins](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/governance.clsp):
    * Proposal coin (singleton with owner)
    * Veto coin (singleton with owner)
* [Bytecash](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/byc_tail.clsp) (BYC) tokens (fungible CAT)
* [CRT](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/crt_tail.clsp) governance tokens (fungible CAT)

Singletons are coins that have at most one descendant. A unique singleton is a coin of a type that exits only once in the entire protocol. A singleton with owner is a singleton that can only be spent by its owner(s). Note that singletons may also be CATs. Although CATs are generally designed to be fungible and arbitrarily divisible, an inner puzzle can constrain them to be non-fungible and non-divisible. This is for example the case with Treasury coins, Savings vaults, Recharge Auction coins, and Payout coins, all of which are singleton BYC CATs. Similarly, Surplus Auction and Governance coins are singleton CRT CATs.
