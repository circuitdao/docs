---
id: surplus-auction
title: Surplus Auction
sidebar_position: 370
---


# Surplus Auction

Surplus Auction is a CRT CAT with [surplus_auction.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/surplus_auction.clsp) puzzle as its inner puzzle. The inner puzzle turns the Surplus Auction into a singleton, and is one of the [approval mods](./advanced-topics/approval-mods).

A Surplus Auction coin is accompanied by a **Payout coin**. The Payout coin is a BYC CAT singleton with [payout.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/payout.clsp) as its inner puzzle. The Payout coin receives the amount of BYC being auctioned off from the Treasury when a Surplus Auction is started.

When the auction concludes, the winning bidder is paid the BYC from the Payout coin in return for burning an amount of CRT as offered in the winning bid.

Surplus Auctions have a relatively long bid timeout, making it feasible to participate manually.

### Starting Surplus Auctions

A Surplus Auction can be started as soon as the **Surplus Auction Threshold** is exceeded, which is defined as the Treasury Maximum plus the Surplus Auction Lot Amount.

It is possible for multiple Surplus Auctions to run in parallel. It is even possible to start more than one Surplus Auction in the same block as long as the Treasury has sufficient surplus and there are suitable Treasury coins available to be spent.

However, having Surplus Auctions run simultaneously is not desireable as keepers may not have sufficient capital on stand-by to participate in all of them at competitive prices, and it would make it even harder for manual bidders to keep up with those using bots.

Since both eve state and eve amount of the eve coin are enforced, Surplus Auction Launcher coins cannot share a parent coin. Instead, each Surplus Auction Launcher coin needs to be created from a separate parent coin spend. This is by design, in order to not set an incentive for keepers to wait until the Surplus Auction Threshold has been exceeded by such a large amount that multiple Surplus Auctions can be triggered at once, leading to a saving on transaction costs. The desired behaviour is for keepers to start a Surplus Auction as soon as possible once the Surplus Auction Threshold has been exceeded, and thereby avoiding simultaneous Surplus Auctions.


## Operations

Surplus Auctions involve two different coins, a Surplus Auction coin and a Payout coin.

### Surplus Auction coin

Puzzle that operations are performed on: [surplus_auction.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/surplus_auction.clsp)

Keeper operations:
* **start auction**: start a Surplus Auction - puzzle: [surplus_start_auction.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/surplus_start_auction.clsp)
* **bid**: submit a bid in a Surplus Auction - puzzle: [surplus_bid.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/surplus_bid.clsp)
* **settle**: settle a Surplus Auction - puzzle: [surplus_win.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/surplus_win.clsp)

### Payout coin

Puzzle that operations are performed on: [payout.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/payout.clsp)

Keeper operations:
* **fund**: receive funds from Treasury - puzzle: [payout.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/payout.clsp)
* **pay out**: pay winner of Surplus Auction - puzzle: [payout.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/payout.clsp)

The diagram below shows how Surplus Auction coin, Payout coin and Treasury coin interact with each other over the course of a Surplus Auction. In this example, the Payout coin is funded from only one Treasury coin. In general, the keeper starting a Surplus Auction is free to select any number of Treasury coins. In fact, this is usually necessary, since no individual Treasury coin is likely to hold an amount in excess of the Treasury Maximum, which is a prerequisite for starting a Surplus Auction. It is recommended to select Treasury coin withdrawal amounts such that they even out any imbalances between Treasury coin balances as much as possible.

![Surplus Auction coin spends diagram](./../../static/img/Surplus_auction_coin_spends_diagram.png)

### Start and Fund

To start the Surplus Auction, a keeper executes the start operation on a Surplus Auction coin in eve state, also referred to as a Surplus Auction launcher coin. The start operation obtains the latest values of **Surplus Auction Bid TTL**, **Minimum Bid Increase** and **Surplus Auction Lot Amount** from Statutes and stores them in the state of the Surplus Auction coin. These values are then immutable for the remainder of the existence of the Surplus Auction coin.

At the same time, a Payout coin and one or more Treasury coins must be spent to transfer an amount of BYC equal to the Surplus Auction Lot Amount from the Treasury to the Payout coin.

#### State changes

Surplus Auction Coin:
* ```LAUNCHER_ID```: nil -> Surplus Auction eve coin ID
* ```BID_TTL```: 0 -> Surplus Auction Bid TTL
* ```MIN_BID_INCREASE_BPS```: 0 -> Minimum Bid Increase
* ```BYC_LOT_AMOUNT```: 0 -> Surplus Auction Lot Amount

Payout coin:
* amount: 0 -> Surplus Auction Lot Amount

### Bid

Bidding occurs by spending the Surplus Auction coin using the bid operation. A bid involves the bidder increasing the amount of CRT offered, referred to as the **bid amount**, and specifying a **target puzzle hash** and the current time.

The bid amount becomes the amount of the new Surplus Auction coin, whereas target puzzle hash and current time get stored in the Surplus Auction coin's state.
```
LAST_BID = (target_puzzle_hash . current_timestamp)
```

For every bid that is placed, the previous bidder is refunded their bid amount at the target puzzle hash they submitted with their bid via a settlement payment.

![Surplus Auction bid coin spends diagram](./../../static/img/Surplus_auction_bid_coin_spends_diagram.png)

With each bid, the bid amount must increase by at least the percentage defined by **Minimum Bid Increase**. This, together with the Surplus Auction Bid TTL ensures that Surplus Auction, once they've received a bid, progress at a certain minimum pace.

Note that in theory it is possible for a Surplus Auction to never receive a bid. In practice this is unlikely to happen since there is no minimum bid amount or price enforced, and a bidder can potentially earn a large profit if there are no other bidders willing to submit a bid.

The Payout coin stays idle during the bidding phase.

#### State changes

Surplus Auction coin:
* ```LAST_BID```:
    * first bid: nil -> (target_puzzle_hash . current_timestamp)
    * subsequent bids: -> (target_puzzle_hash . current_timestamp)
* amount:
    * first bid: 0 -> amount of CRT offered
    * subsequent bids: -> amount of CRT offered

Payout coin:
Does not get spent until settle operation is performed on Surplus Auction coin.

### Settle and Pay out

A Surplus Auction ends when a bid doesn't get outbid within the **Surplus Auction Bid TTL**. When the auction has ended, it is possible to settle the auction by performing the settle operation on the Surplus Auction coin and the pay out operation on the Payout coin in parallel.

The winning bid is the bid recorded in the Surplus Auction coin when the auction ends. The Surplus Auction coin is melted, reducing the supply of CRT, and in return the winner receives the Surplus Auction Lot Amount from the Payout coin at the target puzzle hash specified in the winning bid.


#### State changes

Surplus Auction coin:
* coin gets melted

Payout coin:
* inner puzzle hash: set to target puzzle hash of winning bid, which transforms the Payout coin to a (standard) BYC CAT.


## State and lineage of Surplus Auction coin

Fixed state:
* ```OPERATIONS```
* ```CAT_MOD_HASH```
* ```BYC_TAIL_MOD_HASH```
* ```CRT_TAIL_MOD_HASH```

Immutable state:
* ```MOD_HASH```
* ```STATUTES_STRUCT```

Mutable state:
* ```LAUNCHER_ID```: Set to coin ID of eve Surplus Auction coin in eve spend, then immutable. Equal to nil in eve state
* ```BID_TTL```: Set to Surplus Auction Bid TTL in eve spend, then immutable. Equal to 0 in eve state
* ```MIN_BID_INCREASE_BPS```: Set to Minimum Bid Increase in eve spend, then immutable. Equal to 0 in eve state
* ```BYC_LOT_AMOUNT```: Set to Surplus Auction Lot Amount in eve spend. Equal to 0 in eve state
* ```LAST_BID```: current best bid in Surplus Auction. Equal to nil until the first bid is received

### Eve state

The eve Surplus Auction coin has an enforced eve state:

* ```LAUNCHER_ID``` = nil
* ```BID_TTL``` = 0
* ```MIN_BID_INCREASE_BPS``` = 0
* ```BYC_LOT_AMOUNT``` = 0
* ```LAST_BID``` = nil

Because the LAUNCHER_ID curried into Surplus Auction coins is the coin ID of the eve coin, the eve coin is referred to as the **Surplus Auction Launcher coin**.

### Amount

The eve coin has an enforced amount of 0, as does the resulting Start auction coin.

Once the first bid has been placed, the amount is that of the latest bid amount.

### Lineage

No lineage proof is required (i.e. can be set to nil) for the Surplus Auction coin eve spend since it has an enforced eve state and amount.

The lineage proof for bid and win operations has the following format:

```
lineage proof = (parent_coin_id parent_amount parent_cat_inner_puzzle_hash)
```

## State and lineage of Payout coin

Fixed state:

* ```CAT_MOD_HASH```

Immutable state:

* ```MOD_HASH```
* ```CRT_TAIL_HASH```
* ```SURPLUS_AUCTION_MOD_HASH```: hash of the Surplus Action mod
* ```SURPLUS_AUCTION_LAUNCHER_ID```: Launcher coin ID of the Surplus Auction

Mutable state:
None.

### Eve state

The Payout coin is tied to a Surplus Auction coin via the curried arg ```SURPLUS_AUCTION_LAUNCHER_ID```, which the Payout coin eve spend verifies to be identical to the Surplus Auction launcher coin's ID.

### Amount

The eve Payout coin must have an amount of 0. The fund operation increases the amount to Surplus Auction Lot Amount.

### Lineage

The Payout coin does not require a lineage proof as it its operations are unambiguously tied to Surplus Auction operations.
