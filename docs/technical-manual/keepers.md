---
id: keepers
title: Keepers
sidebar_position: 397
---

# Keepers

Keepers are entities that execute operations on the protocol that anyone can perform.

An example would be the triggering of a liquidation auction. Whereas only the vault owner can deposit or withdraw collateral and take out or repay loans, anyone can trigger a liquidation auction if the required preconditions are met.

Keepers tend to be specialised crypto trading or market making firms, but this is not a requirement and there's nothing to stop anyone from becoming a keeper. Typically, keepers automate the execution of operations by using computer bots, but this is not a requirement and keeper tasks can also be performed manually.

Keeper operations can be divided into two types, those that result in a direct financial gain for keepers, and those that don't.

Triggering a liquidation auction is an example of a keeper operation that results in a direct financial gain. The triggering keeper is rewarded with Absolute and Relative Liquidation Incentives as the auction progresses. Similarly, submitting a successful bid in a liquidation auction is rewarded with a share of the Liquidation Penalty.

Recovering Bad Debt is an example of an operation without direct financial gain. For these types of operation, there is only the general incentive for CRT and BYC holders as well as protocol users to ensure that CRT doesn't lose in value, BYC stays pegged, and the protocol continues to operate smoothly.

There are also operations that are required for some other operation to succeed. An example is the transfer of Stability Fees from a collateral vault to the Treasury. On a stand-alone basis, this operation provides no direct incentive to anyone, but a saver wishing to withdraw interest would need to top up the Treasury if the balance is insufficient to cover the interest withdrawal amount.

## Recommendations for keepers

The ability for Treasury coins to be spent is crucial for surplus, recharge and liquidation auctions to succeed. This creates a potential attack vector. A malicious actor could attempt to prevent auctions from succeeding by hogging Treasury coins, ie by spending them every block. Keepers need to be prepared to outbid such an attacker by paying higher transaction fees. Keepers can price this cost into their auction bids, so that it doesn't affect their profitability. It is important for keepers to be prepared to do this and not have any transaction fee limits hardcoded into their bots. Such limits were responsible for bad debt in the Maker protocol in March 2020, when all keeper bots had stopped bidding due to unusually high transaction fees (which in that case weren't caused by an attacker but by the heightened on-chain activity during the March 2020 market crash).

## List of keeper operations

Below a list of all keeper operations of the protocol including any incentives other than the general incentive to keep the protocol operating smoothly.

* Trigger collateral vault liquidiation - Incentive: receive ALI & RLI
* Bid in liquidation auction - Incentive: acquire collateral below market price
* Recover Bad Debt
* Launch recharge auction
* Start recharge auction
* Bid in recharge auction - Incentive: acquire CRT below market price
* Win recharge auction - Incentive (winning bidder only): receive CRT already paid for
* Start surplus auction
* Bid in surplus auction - Incentive: sell CRT above market price
* Win surplus auction - Incentive (winning bidder only): receive BYC already paid for
* Transfer SFs to Treasury - Incentive: may be required for some other operation to succeed (savings interest withdrawal, recovering Bad Debt)
