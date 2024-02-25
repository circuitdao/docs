---
id: getting-started
title: Getting started
sidebar_position: 2
---

import WCB from './../static/img/Wallet_Connect_button.png';


# Getting started

To get started with Circuit, click the Connect button in the top right corner of the [app](https://app.circuitdao.com)

In the pop-up that opens, select [Goby](https://goby.app) to use Goby wallet. Goby is a browser extension available for Chrome and Brave. Click the Install link if Goby isn't installed yet.

:::info

Circuit is currently on testnet11. You can get Testnet XCH (TXCH) from the [official faucet](https://testnet11-faucet.chia.net).

:::

### Goby wallet

When connecting, Goby will ask you to switch to testnet11 if you are connected to another network, and it will also automatically register the BYC asset ID for you.

If for some reason the automatic process fails, you can manually switch to testnet11 by clicking the settings cog wheel in the top right of the extension -> Advanced Options -> Networks -> Testnet11. To manually register BYC with Goby, click on Import Tokens -> Custom, and enter latest BYC symbol and asset ID as published in the [FAQ](https://docs.circuitdao.com/faq#what-is-bytecash).

Congrats - you are now connected, and can interact with Circuit protocol!

### Reference wallet

The official [Chia reference wallet](https://www.chia.net/downloads) is not supported yet.

## Deposit collateral

Before you can borrow Bytecash (BYC), you need to deposit XCH (or TXCH on testnet) as **collateral**.

Head over to the Borrow page, click the Deposit button, enter an amount of XCH and a fee in mojos per unit of [costs](https://docs.chia.net/coin-set-costs), and click Deposit to Vault.

In your wallet, confirm the messages you are asked to sign.[^1] Wait a couple of minutes for the transaction to be confirmed by the network.

On the website, you will see your new collateral balance together with the amount of BYC you are able to borrow.

## Borrow Bytecash

Click the Borrow button, enter an amount of BYC to borrow, and click Borrow. Wait a couple of mintues for the transaction to be confirmed on-chain, and ta-da, you have taken out your first BYC loan!

To see the BYC in your wallet, you need to [register](https://docs.chia.net/getting-started/wallet-guide/#add-a-new-cat) the Bytecash asset ID 0xdeadbeef with your wallet.

Note that the amount you can borrow is capped by the **maximum loan-to-value** (**Max LTV**) set by governance. The Max LTV is shown near to top right of the Borrow page next to the APR.

## Manage your debt

As long as a loan remains outstanding, you are charged a **Stability Fee** by the protocol. Stability Fees accrue over time and slowly increase the amount of **debt** that you owe to the protocol.

```
Debt owed = Amount borrowed + Stability Fees accrued
```

The Stability Fee is variable and changes over time. The prevailing Stability Fee rate expressed as an annual percentage rate (APR) is shown near the top right of the Borrow page.

You should ensure that your **loan-to-value** (**LTV**), the debt you owe divided by the value of your collateral, remains below the Max LTV to avoid liquidation.

:::danger

Your collateral will be liquidated if your vault's LTV exceeds the Max LTV.

:::

You generally want to borrow at an LTV much lower than the Max LTV to reduce the likelihood your collateral will get liquidated even if the XCH price drops significantly.

For additional information, see the page on [choosing your LTV](./choosing-your-ltv).

## Repay loan

To repay part or all of the debt you owe, click the Repay button. Enter the desired amount of BYC, and click Repay.

Loans are open-ended, so you can choose to repay them whenever you like.

## Withdraw collateral

You can withdraw collateral at any time as long as your LTV remains below the Max LTV post-withdrawal.

As explained in the Manage your debt section above, in practice you'd probably want to leave a big buffer to stay well below the Max LTV even after collateral has been withdrawn. To withdraw all your collateral, you must first repay your entire debt.


[^1]: The reference wallet does not currently support custom spend signature aggregation. For example, if you would like to deposit 10 XCH and your wallet cointains 10 coins worth 1 XCH each, you will have to sign 10 separate messages. In Goby, you will need to click the sign button only once.

