---
id: structure
title: Structure
sidebar_position: 2
slug: /structure
---


# Structure

Circuit consists of a number of components that interact with each other.

### Dapp

The dapp is the user interface of Circuit. Initially the dapp will be available via webpage, with a roll-out of mobile versions planned in the future.

By connecting their Chia wallet to the dapp, users can interact with the Circuit protocol. Actions users can perform include:
* Depositing and withdrawing collateral
* Taking out and repaying BYC loans
* Earning interest on BYC in the Savings vault

Another important part of the dapp is its analytics page, which provides users with present and historical information about protocol utilisation, state and other metrics.

The dapp also contains a governance page, which allows CRT holders to participate in votes. For governance-related discussions, please join the governance channel on the CircuitDAO Discord server.

### Protocol

The protocol is the core of Circuit and refers to the puzzles and corresponding smart coins on the Chia blockchain. These include:
* Statutes (permanent)
* Vaults
* Savings vault (permanent)
* System Buffer (permanent)
* Auction coins
* Voting coins
* Oracles (XCH/USD and BYC/USD)

In addition there are also two fungible coins that are part of the overall protocol:
* CRT, the governance token
* BYC, the stablecoin issued by the protocol


### DAO

The DAO of the Circuit protocol, also referred to as CircuitDAO, refers to the holders of CRT tokens. Since CRT tokens can be traded freely on the Chia blockchain, the membership of the DAO changes over time. The DAO is decentralized in the sense that ownership of CRT tokens is decentralized. Tokenholders can permissionlessly join or exit the DAO simply by acquiring or disposing of CRT tokens.

The actions that the DAO can take, such as changing protocol parameters, are defined by the protocol. DAO actions are effected via governance, the process of voting by CRT token holders.


### Keepers

Although keepers are not formally part of Circuit, they are crucial for its smooth operation. As such, the protocol pays incentives to keepers for performing certain actions, such as liquidating vaults. Keepers also participate in protocol auctions (liquidation, bad debt, refill, surplus). To facilitate the participation of keepers, there are a number of open-source tools and bots available on the Circuit Github page that keepers can run.


# State

Chia utilises the coinset model, and as such is a stateless blockchain. The puzzle of smart coins only gets revealed when these coins are spent. As a result, it is not possible to simply look at the information that a full node holds in order to determine what state the protocol is in. Instead, one needs to looks at past coin spends to understand what information the puzzle behind the puzzle hash of unspent coins contains. For this purpose, a `state-monitoring` tool was developed that can derive the current state from information about the puzzles used by a protocol and past coin spends. This tool is used by both the dapp and keeper tools.
