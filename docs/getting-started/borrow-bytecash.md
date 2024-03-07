---
id: borrow-bytecash
title: Borrow Bytecash
sidebar_position: 8
---


# Borrow Bytecash

Before you can borrow Bytecash (BYC), you need to deposit XCH (or TXCH on testnet) as **collateral**.

:::info

Circuit is currently on testnet11. You can get Testnet XCH (TXCH) from the [official testnet faucet](https://testnet11-faucet.chia.net).

:::


## Deposit collateral

To deposit XCH as collateral, head over to the Borrow page, click the Deposit button, enter an amount of XCH and a fee in mojos per unit of [costs](https://docs.chia.net/coin-set-costs), and click Deposit.

In your wallet, confirm the messages you are asked to sign. Wait a couple of minutes for the transaction to be confirmed by the network.

On the website, you will see your new collateral balance together with the amount of BYC you are able to borrow.

## Borrow Bytecash

Click the Borrow button, enter an amount of BYC to borrow, and click Borrow. Wait a couple of mintues for the transaction to be confirmed on-chain, and ta-da, you have taken out your first BYC loan!

To see the BYC in your wallet, you need to [register](https://docs.chia.net/getting-started/wallet-guide/#add-a-new-cat) the Bytecash asset ID 0xdeadbeef with your wallet.

Note that the amount you can borrow is capped by the **maximum loan-to-value** (**Max LTV**) set by governance. The Max LTV is shown near to top right of the Borrow page next to the APR.

## Manage debt

As long as a loan remains outstanding, the protocol charges a **Stability Fee**. Stability Fees accrue over time and slowly increase the amount of **debt** that is owed to the protocol.

```
Debt owed = Amount borrowed + Stability Fees accrued
```

The Stability Fee is variable and may be changed by governance. The prevailing Stability Fee rate expressed as an annual percentage rate (APR) is shown near the top right of the Borrow page.

You should ensure that your **loan-to-value** (**LTV**), the debt you owe divided by the value of your collateral, remains below the Max LTV to avoid liquidation.

:::danger

Your collateral will be liquidated if your vault's LTV exceeds the Max LTV.

:::

You generally want to borrow at an LTV much lower than the Max LTV to reduce the likelihood that your vault will get liquidated even if the XCH price drops sharply.

For additional information, see the page on [choosing your LTV](./choosing-your-ltv).

## Repay loan

To repay part or all of the debt you owe, click the Repay button. Enter the desired amount of BYC, and click Repay.

Loans are open-ended, so you can choose to repay them whenever you like.

## Withdraw collateral

You can withdraw collateral at any time as long as your LTV remains below the Max LTV post-withdrawal.

As explained in the Manage your debt section above, in practice you'd probably want to leave a big buffer to stay well below the Max LTV even after collateral has been withdrawn. To withdraw all collateral, you must first repay your entire debt.

