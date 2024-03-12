---
id: faq
title: FAQ
sidebar_position: 110
---

# FAQ

### What is Circuit?

Circuit is a DeFi protocol. More specifically, Circuit is an on-chain collateralized stablecoin protocol built on [Chia](https://www.chia.net).

### Is Circuit live yet?

We are live on testnet11, and expect to go live on mainnet in the next few months.

You can head over directly to the [app](https://app.circuitdao.com), or check out our [Getting Started](./getting-started) guide first.

### What is Bytecash?

Bytecash, or BYC for short, is the stablecoin issued by the Circuit protocol. BYC is pegged 1:1 to the US Dollar.

BYC is pronounced 'bick'.

Bytecash is issued as a [Chia Asset Token](https://chialisp.com/cats) (CAT2) with custom tail. You can get your wallet to recognize BYC coins by [registering](https://docs.chia.net/guides/offers-gui-tutorial/#add-a-new-cat) the Bytecash asset ID with your wallet.

:::note

While on testnet, we expect the asset ID to change occassionally as the protocol remains under development and gets redeployed. In this case you'll lose access to your testnet coins via the app, and would have to recreate any vaults and register a new BYC asset ID with your wallet. Also make sure your wallet is connected to testnet11.

Testnet11 BYC asset IDs - always use the latest version:
* BYC03 - 91bfdb4a750308c25b12d0f787309df590a4cad80e7466accdd99b1d1759d9e4
* BYC02 - skipped
* BYC01 - 1763a32f8a9c66f256d8b4631226870ee63dfcfd9668f83c6f75b98f82dc791f

:::

### How can I get hold of Bytecash?

You can obtain BYC by borrowing it directly from the protocol. The [Getting Started](./getting-started) guide shows you how.

Alternatively, you can acquire BYC in the open market, for example via [offers](https://www.chia.net/offers) on bulletin boards like [Dexie](https://dexie.space).

### Can I earn interest on Bytecash?

Yes! You can deposit BYC in a [savings vault](./user-guide/savings.md) to earn interest. The interest rate is variable and financed from Stability Fees paid by borrowers.

### What do I need to use Circuit?

All you need is a Chia wallet that supports custom spend signing. At this point [Goby](https://goby.app) is recommended, and we are planning to add support for the official [reference wallet](https://www.chia.net/downloads) soon.

### Can I use assets other than XCH as collateral?

Currently only XCH is supported as collateral. This may be extended to other assets in the future.

### What is the CRT token?

CRT is the governance token of the Circuit protocol. Token holders can participate in governance. Note that Circuit governance is permissionless, i.e. proposals are made, voted on, and enforced on-chain. To participate in governance, visit the Governance Portal.[^1]

### Is Circuit the same as CircuitDAO?

Not quite. Circuit is the protocol, i.e. the smart coins on the Chia blockchain that make up the protocol. CircuitDAO is a term used to refer to the set of all CRT token holders. However, sometimes CircuitDAO is used to refer to the protocol, usually because that way it's immediately clear that Circuit is a DeFi protocol.

### Why was Circuit built on Chia?

There are too many reasons for why to build on Chia to list them all here, but what perhaps stands out most from a DeFi perspective is that [XCH is an excellent store-of-value and collateral asset](https://medium.com/@circuitdao/xch-as-a-store-of-value-and-collateral-asset-6872215a07bc). It's only natural then to build a protocol that allows XCH holders to utilize their tokens by borrowing against them. For a list of additional use cases that Circuit unlocks, see the [Litepaper](https://medium.com/@circuitdao/circuitdao-an-on-chain-collateralized-stablecoin-protocol-8991e3d5f01d).

### Is Circuit similar to Terra Luna?

No. Terra Luna was an uncollateralized 'algorithmic' stablecoin. Circuit on the other hand is overcollateralized by XCH locked-up in [collateral vault](./user-guide/vaults) smart coins. In that sense, Circuit is more similar to the original single-collateral [Maker](https://makerdao.com) protocol on Ethereum.

### Are there any risks in using Circuit?

There are a number of risks. These include, without limitation:

* Smart contract risk: If there are bugs or vulnerabilities in the Chialisp code, an attacker might be able to exploit these and potentially drain assets from collateral or savings vaults, the protocol treasury, or otherwise harm users. A successful exploit could also result in a loss of confidence that Bytecash can maintain its peg, which might lead to losses for BYC and CRT holders. You can review all Chialisp code used by Circuit protocol on [Github](https://www.github.com/circuitdao)

* Market risk: Borrowing is inherently a risky activity. If the price of XCH declines unexpectedly, vaults may get liquidated, which can lead to losses for borrowers. There is also a risk that the Max LTV was not chosen low enough to protect the protocol from becoming undercollateralized. In such a case bad debt would be incurred. Although bad debt can be covered by assets in the Protocol Treasury or via Recharge Auctions,  there remains a risk that BYC depegs, potentially leading to a downwards price spiral. Moreover, Recharge Auctions dilute CRT holders and will negatively impact the value of their holdings.

* Peg stability risk: The protocol relies on a number of mechanisms to keep Bytecash pegged to the US Dollar. This includes adjusting the Stability Fee and Savings Rate, as well as the actions of market participants that arbitrage deviations of BYC's market price from the peg. There isn't a guarantee that these mechanisms will work sufficiently well or kick in quickly enough to keep BYC at its peg in all circumstances. This might lead to the BYC deviating from its peg. Such deviations may be small, temporary, and not critical to the functioning of the overall system, but longer term dislocations in the BYC price could potentially lead to a loss of confidence in the system and a downwards spiral in BYC and CRT prices.

### Is the code open-source?

The code will be published on [Github](https://www.github.com/circuitdao) for anyone to review and contribute to. However, note that the code is currently copyrighted and not available under an open-sourece licence. We are still evaluating what type of licence will be appropriate going forward. The most likely scenario at this point is that the code will remain copyright protected for a number of years before being released under an open-source licence. This is the approach taken by major DeFi protocols such as Uniswap and Aave.

### Where can I report bugs?

Reach out to us on [Discord](https://discord.gg/TMama9jTwu) or send an email to info@circuitdao.com.

### Do you provide an API?

We do. You can access it [here](https://api.circuitdao.com).


[^1]: Work in progress. Will be released soon.
