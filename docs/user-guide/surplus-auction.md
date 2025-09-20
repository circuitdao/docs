---
id: surplus-auction
title: Surplus Auction
sidebar_position: 225
---

# Surplus Auction

In a Surplus Auction, the protocol auctions off a fixed amount of BYC as specified by the **Surplus Auction Lot Amount** parameter for CRT in an English auction.

A Surplus Auction can be started whenever the BYC balance of the Treasury exceeds the **Surplus Auction Threshold**, which is defined to be the [Treasury Maximum](./treasury) plus the Surplus Auction Lot Amount.

Once the auction has started, bidders can bid increasing amounts of CRT for the Surplus Auction Lot Amount. Each bid needs to exceed the previous bid by a certain percentage as given by **Minimum Bid Increase**.

![Surplus auction](./../../static/img/Surplus_auction_diagram.png)

The auction concludes if a bid sees no higher bid within **Surplus Auction Bid TTL** seconds (TTL = time to live), at which point the auction can be settled.

The winning bidder receives an amount of BYC equal to the Surplus Auction Lot Amount, and the amount of CRT offered in the winning bid gets melted.

:::info

Surplus Auctions reduce the CRT supply.

:::

There can be multiple Surplus Auction at the same time. If the Surplus Auction Threshold is still exceeded after a Surplus Auction has started, another one can be started right away, even in the same block.


## Statutes

* **Minimum Bid Increase**
    * Statutes index: 22
    * Statutes name: STATUTE_MINIMUM_BID_INCREASE_BPS
    * considerations: should be large enough to ensure auctions don't drag on for too long.
* **Surplus Auction Lot Amount**
    * Statutes index: 27
    * Statutes name: STATUTE_SURPLUS_AUCTION_LOT
    * considerations: should be small enough to allow keepers with little working capital to participate in the auction. should be large enough to allow the protocol to discharge BYC at a reasonably fast rate so that BYC accumulation in Treasury doesn't cause upwards pressure on the BYC peg.
* **Surplus Auction Bid TTL**
    * Statute index: 28
    * Statute name: STATUTE_SURPLUS_AUCTION_BID_TTL
    * considerations: should be long enough to allow even less sophisticated keepers, eg those without automated bidding tools, to submit bids. The aim is a competitive bidding process to maximize the amount of CRT that gets melted.
