---
id: recharge_auction
title: Recharge Auction
sidebar_position: 142
---

# Recharge Auction

A Recharge Auction is a BYC CAT with recharge_auction.clsp puzzle as inner puzzle. The inner puzzle turns the Recharge Auction coin into a singleton.

## Operations

Puzzle: recharge_auction.clsp
Operations:
* Launch - puzzle: recharge_launch.clsp
* Start - puzzle: recharge_start_auction.clsp
* Bid - puzzle: recharge_bid.clsp
* Win - puzzle: recharge_win.clsp

All four operations can be executed by anyone. Recharge auctions are typically run by keeper bots, but due to relatively long bid timeouts, it's also feasible to participate manually.

### Launch

To launch a Recharge Auction, a BYC CAT with inner puzzle being recharge_auction.clsp must be created and then spend with the launch operation. This launches the Recharge Auction by creating a Recharge Auction Start coin, which is a BYC

### Start

Spends a Recharge Start Auction Coin to create an eve auction coin. The eve auction coins does not constitute a bid yet.

![Recharge auction launch](./../../static/img/Recharge_auction_launch_diagram.png)


### Bid

Spends an auction coin. The new coin created contains a bid in the LAST_BID curried arg. A bid is a list

```bid = ((BYC bid amount . CRT bid amount), target puzzle hash, timestamp)```

The target puzzle hash belongs to an inner BYC CAT puzzle, and will receive the CRT bid amount should the bid turn out to be the winning bid.

The BYC bid amount of a bid may be smaller or larger than that of the previous bid as long as it is greater than the Recharge Auction Minimum Bid Amount. If it is larger than in the previous bid, then the bidder needs to make a contribution bid.

![Recharge auction bid increasing BYC amount](./../../static/img/Recharge_auction_bid_increase_amount_diagram.png)

If the new BYC bid amount is smaller than the previous one, the bidder must return the difference to the previous bidder.

![Recharge auction bid decreasing BYC amount](./../../static/img/Recharge_auction_bid_decrease_amount_diagram.png)

### Win

Once the auction has concluded, the winner can mint an amount of CRT as specified in the bid by asserting the corresponding announcement from the auction coin. The BYC amount bid gets paid to the Treasury. Keepers should aim for an even distribution of BYC among Treasury coins by selecting a suitable Treasury sub-ring.

A new Recharge Auction Start coin is automatically created. If the Treasury balance is still below the Treasury Minimum, then bidding can commence immediately. Otherwise, the Recharge Auction coin stays idle until the conditions for a Recharge Auction are satisfied again.

![Recharge auction win](./../../static/img/Recharge_auction_win_diagram.png)

Note that the launcher ID of the Recharge Auction coin only changes if it is melted by governance (TODO: is this possible?). Governance also has the ability to launch additional Recharge Auction coins, in which case it is possible to conduct multiple Recharge Auctions in parallel (TODO: when would governance want to do that?).

