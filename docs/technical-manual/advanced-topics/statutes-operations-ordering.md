---
id: statutes-operations-ordering
title: Statutes Operations Ordering
sidebar_position: 1200
---

# Statutes operations ordering

The Statutes singleton enforces a number of rules on the order in which operations can be performed.

* **announce**: must not be preceded by an ephemeral spend
* **mutate**: can only be performed if previous spend was an announce operation
* **update price**: can only be performed if previous spend was an announce operation

These rules allow for exactly one of the following Statutes singleton spend combinations to occur in any given block:
* no spend
* announce
* mutate
* update price
* announce + mutate
* announce + update price

Limiting Statutes spends to these combinations protects the Statutes singleton against a number of attacks. Primarily, these attacks fall into two categories, those that could be used to delay or prevent certain operations from being performed, and those that result in different values of the same Statute to be announced in the same block. The former are essentially denial-of-service attacks, and the latter arbitrage attacks.

The rules allow for mutate and update price operations to follow an announce spend in the same block. This prevents announce spends, which can be performed by anyone, from being used to deny a mutate or update price operation, for example by stuffing the mempool with announce spends. Keep in mind that Chia's [replace-by-fee](https://docs.chia.net/mempool/#replace-by-fee) rules do not allow for the replacement of input coin spends unless the solution is identical. I.e. A -> B can only be replaced by A->B with higher fee, not by A->C. Since, however, RBF is allowed on non-input coins, A->B can be replaced by A->B->C, which allows an announce operation to be followed by a mutate or update price operation. In addition, since B is not an input coin (it has a prior ephemeral spend), A->B->C can be replaced by A->B->D. This means that mutate and update price operations can compete against each other for inclusion in a block on a highest fee basis.

The rules also guarantee that a mutate operation cannot be followed by another spend in the same block. Since the mutate operation announces pre-mutation Statutes, and the other two operations leave Statutes unchanged, it cannot happen that two different values get announced for the same Statute in the same block. This prevents arbitrage attacks in which different operations or even different coins spends within the same operation could attempt to assert different Statute values.

The rules are enforced via an ```ASSERT_HEIGHT_RELATIVE 0``` condition in the announce operation, as well as the ```PREV_ANNOUNCE``` state variable, which keeps track of whether the previous operation was an announce (1) or not (nil). In the eve state, this variable is set to 2 to allow for an announce eve spend with prior ephemeral spend of the launcher coin.
