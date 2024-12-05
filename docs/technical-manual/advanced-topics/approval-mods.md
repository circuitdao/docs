---
id: approval-mods
title: Approval Mods
sidebar_position: 1100
---

# Approval mods

**Approval mods** are mods that allow protocol coins whose puzzles are using these mods, referred to as **approval coins**, to approve certain actions within the protocol.

There are five approval mods:
* collateral_vault.clsp
* surplus_auction.clsp
* recharge_auction.clsp
* savings_vault.clsp
* announcer_registry.clsp

There are six actions that approval coins can approve between them. Approval coins are the only coins that are allowed to:
* issue or melt BYC
* issue or melt CRT
* deposit to or withdraw from Treasury

The table below shows which approval mod has which rights.

| index | approval mod       | BYC tail       | CRT tail | Treasury                                   |
|:-----:|:-------------------|:--------------:|:--------:|:------------------------------------------:|
| 1     | Collateral Vault   | issue and melt | :x:      | deposit (repay or transfer Stability Fees) |
| 2     | Surplus Auction    | :x:            | melt     | withdraw (to Payment coin)                 |
| 3     | Recharge Auction   | :x:            | issue    | deposit (from winning bid)                 |
| 4     | Savings Vault      | :x:            | :x:      | withdraw (pay interest)                    |
| 5     | Announcer Registry | :x:            | issue    | :x:                                        |

The Treasury mod, ```treasury.clsp```, does not impose any restrictions on the size of deposits or withdrawals approved by approval coins. Similarly for BYC and CRT tails. It is the approval mods themselves that limit how they can interact with BYC tail, CRT tail, and Treasury coins.

The treehash of the list of the five approval mod hashes in the order shown above is curried into the fixed arg ```APPROVAL_MOD_HASHES_HASH``` of the Statutes singleton.

