---
id: coinset
title: Coin Set Model
sidebar_position: 3
---

# Coin set model

Because Chia utilizes the [coin set model](https://docs.chia.net/coin-set-intro/), the terminology used is different to that of Ethereum and many other blockchains. Smart contracts on Chia are called **puzzles**. The only objects the blockchain is aware of are coins, and each coin contains the hash of a puzzle.

To spend a coin one needs to
* reveal the puzzle matching the coin's puzzle hash
* provide a list of arguments - the **solution** - to run the puzzle with

Spending a coin results in a number of **conditions**. Conditions are instructions to the blockchain, and include operations such as creating new coins, making announcements, and requiring cryptographic signatures.

The fact that puzzles are only revealed when coins are spent, means that interacting with DeFi protocols such as CircuitDAO typically requires multiple simultaneous coin spends. This way coins can communicate with each other via announcements, ensuring that even complex protocols remain in a consistent state.
