---
id: getting-started
title: Getting started
sidebar_position: 2
---

import WCB from './../static/img/Wallet_Connect_button.png';


# Getting started

:::info

Circuit is on testnet11. Since the official Chia faucet still runs on testnet10, the best way to get your hands on some testnet11 TXCH is to pop into the Circuit [Discord](https://discord.gg/TMama9jTwu) and leave your address in the 🧪-txch channel.

:::

To get started with Circuit, click the Connect button in the top right corner of the [dapp](https://4d25e995.dapp-4il.pages.dev).

In the pop-up that opens, select [Goby](https://goby.app) to use Goby wallet, or Wallet Connect to use the official [Chia reference wallet](https://www.chia.net/downloads). We recommend using Goby as it has better support for signing multiple custom spends, which is required when using Circuit protocol.

Copy the connection string shown and go to your wallet.

### Goby wallet

Goby runs as a plugin in your browser.

### Reference wallet

If you are using the official reference wallet, click the Wallet Connect button near the top right.

<img src={WCB} width="250"/>

Select Add Connection, paste the connection string, and click Continue.

Congrats - you are now connected, and can interact with Circuit protocol!


## Deposit collateral

Before you can borrow Bytecash (BYC), you need to deposit XCH as collateral.

Head over to the Borrow page, click the Deposit button, enter an amount of XCH, and click Deposit to Vault.

In your wallet, confirm the messages you are asked to sign.[^1] Wait a couple of minutes for your deposit transaction to be confirmed by the network.

Your new collateral balance will show on the website, together with the amount of BYC you are able to borrow.

## Borrow Bytecash

Click the Borrow button, enter an amount of BYC to borrow, and click Borrow. Wait a couple of mintues for the transaction to be confirmed on-chain, and ta-da, you have taken out your first BYC loan!

To see the BYC in your wallet, you need to [add](https://docs.chia.net/guides/offers-gui-tutorial/#add-a-new-cat) the Bytecash asset ID 0xdeadbeef.

## Manage your debt

As long as a loan remains outstanding, you are charged a Stability Fee by the protocol. Stability Fees accrue over time and slowly increase the amount of debt that you owe to the protocol.

```
Debt owed = Amount borrowed + Stability Fees accrued
```

The Stability Fee is variable and changes over time. The current Stability Fee rate is shown in the top right of the Borrow page expressed as an annual percentage rate (APR).

:::danger

If the debt you owe exceeds the maximum loan-to-value (Max LTV), then your collateral will be liquidated.

:::

The Max LTV is shown on the Borrow page next to the APR.

To avoid liquidation, you can either repay your loan or deposit additional collateral. You generally want to borrow at an LTV much lower than the Max LTV to reduce the likelihood your collateral will get liquidated even if the XCH price drops significantly.

## Repay loan

To repay part or all of the debt you owe, click the Repay button. Enter the desired amount of BYC, and click Repay.

Loans are open-ended, so you can choose to repay them whenever you like.


[^1]: The reference wallet does not currently support custom spend signature aggregation. For example, if you would like to deposit 10 XCH and your wallet cointains 10 coins worth 1 XCH each, you will have to sign 10 separate messages. In Goby, you will need to click the sign button only once.

