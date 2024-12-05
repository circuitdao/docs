---
id: crt-tail
title: CRT Tail
sidebar_position: 392
---

# CRT Tail

The CRT tail is a [TAIL program](https://chialisp.com/cats/#tail) that determines under what conditions CRT tokens may be issued or melted. Note that the CRT tail does not allow minting.

CRT tokens can only be issued or melted with the approval of an approved mod hash. This is enforced by a ```RECEIVE_MESSAGE``` condition in the tail for which an approval mod coin must output a corresponding ```SEND_MESSAGE``` condition.

More specifically, there are two approval mods that allow for issuing CRT, and one that allows for melting.

| Operation               | file                                                                                                                    | CRT tail operation |
|:------------------------|-------------------------------------------------------------------------------------------------------------------------|--------------------|
| Announcer Registry mint | [announcer_registry.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/vault_borrow.clsp)            | issue              |
| Recharge Auction win    | [recharge_auction_win.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/recharge_win.clsp) | issue              |
| Surplus Auction win     | [surplus_auction_win.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/surplus_win.clsp)            | melt               |
