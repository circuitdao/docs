---
id: recharge_auction
title: Recharge Auction
sidebar_position: 230
---

# Recharge Auction

A Recharge Auction can be launched whenever the BYC balance of the Treasury drops below the Treasury Minimum.

In a Recharge Auction the protocol acquires BYC to refill the Treasury by auctioning off CRT. Bidders must submit bids offering at least the **Recharge Auction Minimum Bid Amount** of BYC. Bids must also include the CRT price at which the BYC is offered. The CRT price of a bid must be greater than the **Recharge Auction Minimum CRT Price**, and greater than the CRT price of any previous bid.

![Recharge auction](./../../static/img/Recharge_auction_diagram.png)

Note that the amount of BYC offered in a bid can be chosen to be smaller than that of a previous bid. This ensures that keepers with only small amounts of capital can continue to participate in an auction and cannot be pushed out by better capitalised bidders.

The auction concludes if a bid sees no higher bid within **Recharge Auction Bid TTL** seconds (TTL = time to live) or if there is no bid and the **Recharge Auction Timeout** has been reached. Bids can be placed only before the Recharge Auction Timeout has been reached.

The winning bidder receives an amount of CRT equal to the BYC amount offered divided by the CRT price bid. In return, the Treasury receives the BYC amount offered.

:::info
Recharge Auctions increase the CRT supply.
:::

## Statutes

* **Recharge Auction Minimum Bid Amount**
    * Statute index: 23
    * Statute name: STATUTE_RECHARGE_AUCTION_MINIMUM_BID_AMOUNT
    * considerations: should be small enough to allow keepers with little working capital to participate in the auction. should be large enough to allow the protocol to refill the Treasury at a reasonable rate so that liabilities can be covered in a timely manner.
* **Recharge Auction Minimum CRT Price**
    * Statute index: 21
    * Statute name: STATUTE_RECHARGE_AUCTION_BID_TTL
    * considerations: should be set high enough to prevent unreasonable amounts of CRT being minted (without a minimum CRT price, CRT holders could get infinitely diluted), for example in cases where only one keeper shows up to participate in the auction. should be set low enough that it is highly likely that the Treasury can be refilled. Since Recharge auctions are generally a last resort measure to cover protocol liabilities, and in particular Bad Debt, a failure to raise BYC could result in a loss of confidence in the protocol and a death spiral for BYC.
* **Recharge Auction Timeout**
    * Statute index: 20
    * Statute name: STATUTE_RECHARGE_AUCTION_TIMEOUT
    * considerations: should be long enough to allow keepers to show up for the auction to achieve a competitive bidding process and minimize the amount of CRT that gets minted.
* **Recharge Auction Bid TTL**
    * Statute index: 22
    * Statute name: STATUTE_RECHARGE_AUCTION_BID_TTL
    * considerations: should be long enough to allow keepers to show up for the auction to achieve a competitive bidding process and minimize the amount of CRT that gets minted.

