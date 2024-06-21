---
id: treasury
title: Treasury
sidebar_position: 140
---

# Treasury

The Treasury is a set of BYC coins with a special inner puzzle that allows the coins to be spent only in very specific ways.

When a withdrawal is made from Treasury, the amount withdrawn must either be transferred to coins with non-treasury puzzle hashes, or it must be melted. A combination of the two is not possible.

Operations that can withdraw from Treasury:
* Paying savings interest (withdraw)
* Cancelling bad debt (melt)
* Starting Surplus Auction (withdraw)

Operations that deposit to Treasury:
* Payment of Stability Fees
* Bidding in liquidation auction (SFs + LP)
* Recharge Auction win

There is no incentive for transferring stability fees as savers that want to withdraw interest and keepers wanting to trigger a surplus auction have an incentive to do so. CRT holders are also incentivised to keep the the Treasury filled to prevent Recharge Auctions from being triggered, which are dilutive to them.

## Treasury Ring

The inner puzzle prevents Treasury coins from being divided, effectively making them singletons. Since Treasury coins are also BYC CATs, Treasury coins must be arranged in a ring when spent, just like any other CATs.

![Treasury ring](./../../static/img/Treasury_ring_diagram.png)

Although Treasury coins cannot be divided, it is possible to increase or decrease their amounts. This allows BYC to be deposited to and withdrawn from the Treasury. It is not necessary to include all Treasury coins in a spend. Just as with ordinary CATs, any sub-set of Treasury coin, including a single coin, is sufficient as long as they are arranged in a ring.


## Recommendations for keepers

The ability for treasury coins to be spent is crucial for surplus, recharge and liquidation auctions to succeed. This creates a potential attack vector. A malicious actor could attempt to prevent auction from succeeding by hogging treasury coins, ie spend them every block. Keepers need to be prepared to outbid such an attacker by paying higher transaction fees than the attacker. Keepers can price this cost into their auction bids, so that it doesn't affect their profitability. It is important for keepers to be prepared to do this and not have any transaction fee limits hardcoded into their bots. Such limits were responsible for bad debt in the Maker protocol in March 2020, when all keeper bots had stopped bidding due to unusually high transaction fees (which in this case weren't caused by an attacker but by the heightened on-chain activity during the March 2020 market crash).
