---
id: surplus-auction
title: Surplus Auction
sidebar_position: 370
---


# Surplus Auction

Surplus Auction is a CRT CAT with [surplus_auction.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/surplus_auction.clsp) puzzle as its inner puzzle. The inner puzzle turns the Surplus Auction into a singleton.

### Lineage and eve state

No lineage proof is required for the Surplus Auction coin eve spend since it has an enforced eve state and amount.

The eve Surplus Auction coin has an enforced eve state:

* LAUNCHER_ID = 0
* BYC_LOT_AMOUNT = 0
* LAST_BID = ()

The eve coin also has an enforced amount of 0, as does the resulting **Start auction coin**.

The eve spend sets LAUNCHER_ID to the coin ID of the eve coin, and the BYC_LOT_AMOUNT to the Surplus Auction Lot Amount. LAST_BID remains unchanged until a subsequent bid operation is performed.

Because the LAUNCHER_ID curried into Surplus Auction coins is the coin ID of the eve coin, the eve coin is referred to as the **Surplus Auction Launcher coin**.

The eve spend does not require a lineage proof and can be set to nil. The lineage proof for bid and win operations has the following format:

```lineage proof = (parent_coin_id parent_amount parent_cat_inner_puzzle_hash)```

### Triggering Surplus Auctions

It is possible to have multiple Surplus Auctions run in parallel. It is even possible to start more than one Surplus Auction in the same block as long as the Treasury has sufficient surplus and there are suitable Treasury coins available to be spent.

However, having Surplus Auctions run simultaneously is not desireable as keepers may not have sufficient capital on stand-by to participate in all of them at competitive prices, and it would make it even harder for manual bidders to keep up with those using bots.

Since both eve state and eve amount of the eve coin are enforced, Surplus Auction Launcher coins cannot share a parent coin. Instead, each Surplus Auction Launcher coin needs to be created from a separate parent coin spend. This is by design, in order to not set an incentive for keepers to wait until the Treasury Maximum has been exceeded by such a large amount that multiple Surplus Auctions can be triggered at once, leading to a saving on transaction costs. The desired behaviour is for keepers to trigger a Surplus Auction as soon as possible once the Treasury Maximum has been exceeded by more than the **Surplus Auction Lot Amount**, and thereby avoiding simultaneous Surplus Auctions.

TODO: do we need a SF transfer incentive, do we need a surplus auction trigger incentive, do we want a minimum bid amount increase (for recharge auction too)?

## Operations

Puzzle that operations are performed on: [surplus_auction.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/surplus_auction.clsp)

Keeper operations:
* **Start**: start a surplus auction - puzzle: [surplus_start_auction.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/surplus_start_auction.clsp)
* **Bid**: submit a bid in surplus auction - puzzle: [surplus_bid.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/surplus_bid.clsp)
* **Win**: melt CRT offered by winning bidder, send them BYC - puzzle: [surplus_win.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/surplus_win.clsp)

Surplus auctions have a relatively long bid timeout, making it feasible to participate manually.

![Surplus Auction](./../../static/img/Surplus_auction_spends_diagram.png)

### Start

To start the surplus auction, a keeper executes the start operation on a Surplus Auction coin in eve state, also referred to as a Surplus Auction launcher coin.

At the same time at which the launcher coin is spent, a Payout coin must be spent to make a Treasury withdrawal and transfer an amount of BYC equal to the Surplus Auction Lot Amount to the Payout coin.

The Payout coin, which is a BYC CAT with [p2_surplus_auction.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/p2_surplus_auction.clsp) as its inner puzzle, stays idle during the bidding phase of the auction. Eventually, the winner of the auction will receive the BYC amount held in the Payout coin.

#### State changes

Surplus Auction Coin:
* LAUNCHER_ID: () -> eve coin ID
* BYC_LOT_AMOUNT: 0 -> Surplus Auction Lot Amount

Payout coin:
* amount: 0 -> Surplus Auction Lot Amount

### Bid

Bidding occurs by spending the Surplus Auction coin using the bid operation. A bid involves the bidder increasing the amount of CRT offered, specifying a **target puzzle hash**, and supplying the current timstamp. The amount of CRT offered is the amount of the Surplus Auction coin. Target puzzle hash and current timestamp are stored in the LAST_BID curried arg:

```LAST_BID = (target_puzzle_hash current_timestamp)```

The **target puzzle**, i.e. the puzzle whose treehash is the target puzzle hash, must be a CAT inner puzzle. If the bid turns out to be the winning bid, an amount of BYC equal to the Surplus Auction Lot Amount is sent to the target puzzle hash. If the bid is outbid, i.e. is not the winning bid, then the bidder has the CRT they locked up in the Surplus Auction coin returned to them at the target puzzle hash.

![Surplus Auction bid](./../../static/img/Surplus_auction_bid_diagram.png)

#### State changes

Surplus Auction coin:
* LAST_BID:
    * first bid: () -> (target_puzzle_hash current_timestamp)
    * subsequent bids: -> (target_puzzle_hash current_timestamp)
* amount:
    * first bid: 0 -> amount of CRT offered
    * subsequent bids: -> amount of CRT offered

### Win

A Surplus Auction ends when either **Surplus Auction TTL** has been reached or if a bid doesn't get outbid within the **Surplus Auction Bid TTL**. When the auction has ended, the win operation can be executed.

The winning bid is the bid recorded in the Surplus Auction coin when the auction ends. The CRT of the Surplus Auction coin is melted, and in return the winner receives the Surplus Auction Lot Amount from the Payout coin at the target puzzle hash specified in the winning bid.

#### State changes

Surplus Auction coin:
* coin is melted

Payment coin:
* puzzle: -> target puzzle (treehash of which is target puzzle hash of winning bid)
