---
id: bots
title: Bots
sidebar_position: 1810
---

# Bots

There are bots available to automatically execute housekeeping operations. These are typically keeper operations, but there are also bots for borrowers and savers.

The bots are written in Python and can be found in the following GitHub repository: https://github.com/circuitdao/keeper-bots.


## List of bots

Below a list of bots available for protocol users, governance participants, data providers and keepers to run.

Even though the operations some bots perform are more relevant to some users than others, everyone has an interest in the protocol running smoothly and bots should ideally be run by all users and keepers.


| bot                        | who has most incentive to run this bot | what this bot does                                          |
|----------------------------|----------------------------------------|-------------------------------------------------------------|
| announcer update           | data providers                         | prevents penalization                                       |
| announcer configure        | data providers                         | prevents penalization                                       |
| announcer register (TODO)  | data providers                         | registers for CRT rewards                                   |
| announcer reward (TODO)    | data providers                         | distributes CRT rewards                                     |
| oracle price update        | prospective initiators/vault owners    | start liquidation auction/borrow or withdraw more           |
| statutes price update      | prospective initiators/vault owners    | start liquidation auction/borrow or withdraw more           |
| start liquidiation auction | anyone                                 | receive liquidation incentives (absolute & relative)        |
| bid in liquidation auction | bidders                                | acquire collateral below market price                       |
| recover bad debt           | governance                             | make it easier to keep track of protocol liabilities        |
| recharge_start_settle      | bidders                                | opportunity to acquire CRT below market price               |
| recharge_bid               | bidders                                | bids in recharge auction to acquire CRT                     |
| surplus_start_settle       | bidders                                | starts and settles surplus auctions                         |
| surplus_bid                | bidders                                | bids in surplus auctions to sell CRT                        |
| transfer stability fees    | savers/bidders                         | transfers stability fees from collateral vaults to treasury |
| rebalance treasury         | savers                                 | avoids delays with interest withdrawals                     |
| implement bot (TODO)       | all users                              | implements bills                                            |
| veto bot (TODO)            | all users                              | vetos undesirable bills                                     |
