---
id: intro
title: Introduction
sidebar_position: 1
slug: /
---

# About CircuitDAO

CircuitDAO is an on-chain collateralized stablecoin protocol built on [Chia](https://www.chia.net).

Users can borrow **Bytecash** (**BYC**), the stablecoin issued by CircuitDAO, against XCH deposited in vaults as collateral.


## Overview

This documentation is split into two parts, a user guide that explains how CircuitDAO works on a high-level, and a technical documentation, which delves into the details of the underlying puzzles.


## Coin set model

Because Chia utilizes the [coin set model](https://docs.chia.net/coin-set-intro/), the terminology used is different to that of Ethereum and other blockchains. Smart contracts on Chia are called puzzles. The only objects the blockchain is aware of are coins, and each coin contains the hash of a puzzle. To spend a coin, the puzzle matching its puzzle hash needs to be revealed, and a list of arguments (called the solution) to run the puzzle with provided. The result is a number of conditions being generated. Conditions are instructions to the blockchain, and include operations such as creating new coins, making announcements, and requiring cryptographic signatures.

The fact that puzzles are only revealed when coins are spent, means that executing operations in DeFi protocols such as CircuitDAO typically requires multiple simultaneous coin spends. This way coins can interact with each other via announcements, ensuring that even complex protocols remain in a consistent state.


## Getting Started

To get started, head over to the [CirduitDAO dapp](https://circuitdao.com) and connect your wallet.

### What you'll need

- [Node.js](https://nodejs.org/en/download/) version 16.14 or above:
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Generate a new site

Generate a new Docusaurus site using the **classic template**.

The classic template will automatically be added to your project after you run the command:

```bash
npm init docusaurus@latest my-website classic
```

You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code editor.

The command also installs all necessary dependencies you need to run Docusaurus.

## Start your site

Run the development server:

```bash
cd my-website
npm run start
```

The `cd` command changes the directory you're working with. In order to work with your newly created Docusaurus site, you'll need to navigate the terminal there.

The `npm run start` command builds your website locally and serves it through a development server, ready for you to view at http://localhost:3000/.

Open `docs/intro.md` (this page) and edit some lines: the site **reloads automatically** and displays your changes.
