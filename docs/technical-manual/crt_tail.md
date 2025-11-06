---
id: crt-tail
title: CRT Tail
sidebar_position: 392
---

# CRT Tail

The CRT tail is a [TAIL program](https://chialisp.com/cats/#tail) that determines under what conditions CRT tokens may be issued or melted. The CRT tail does not allow for minting.

The tail can only be run on CRT CATs that have [Run Tail mod](./advanced-topics/run-tail-mod) as their inner puzzle.

The CRT tail has one fixed arg, ```RUN_TAIL_MOD_HASH```, and one immutable arg, ```STATUTES_STRUCT```.

## Operations

Puzzle operations are performed on: [crt_tail.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/crt_tail.clsp)

Protocol deployer operations:
* **TGE**: initial issuance - puzzle: [crt_tail.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/crt_tail.clsp)

Approval mod operations:
* **issue**: issuance of CRT tokens - puzzle: [crt_tail.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/crt_tail.clsp)
* **melt**: melting of CRT tokens - puzzle: [crt_tail.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/crt_tail.clsp)

### TGE

The vast majority of CRT tokens to ever exist is issued at protocol launch in a **token generation event** (**TGE**). The mainnet deployment of Circuit is expected to generate 1bn token at TGE.

Since the CRT tail has the Statutes Struct curried in, the TGE operation must be performed at protocol launch.

### Issue

Post-TGE, CRT tokens can only be issued with the approval of an [Approval mod](./advanced-topics/approval-mods). This is enforced by a ```RECEIVE_MESSAGE``` condition in the tail for which an Approval coin must output a corresponding ```SEND_MESSAGE``` condition. There are two Approval mods that allow for issuing CRT, namely Announcer Registry and Recharge Auction.

| CRT tail operation | Approval mod       | Operation | Operation program                                                                                                          |   |
|:-------------------|:-------------------|:----------|:---------------------------------------------------------------------------------------------------------------------------|---|
| issue              | Announcer Registry | reward    | [announcer_registry.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/vault_borrow.clsp)               |   |
| issue              | Recharge Auction   | settle    | [recharge_auction_win.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/recharge_settle.clsp) |   |

### Melt

CRT tokens can only be melted with the approval of an [Approval mod](./advanced-topics/approval-mods). This is enforced by a ```RECEIVE_MESSAGE``` condition in the tail for which an Approval coin must output a corresponding ```SEND_MESSAGE``` condition. There is one Approval mod that allows for issuing CRT, namely Surplus Auction.

| CRT tail operation | Approval mod    | Operation | Operation program                                                                                               | CRT tail operation |
|:-------------------|:----------------|:----------|:----------------------------------------------------------------------------------------------------------------|--------------------|
| melt               | Surplus Auction | settle    | [surplus_auction_win.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/surplus_settle.clsp) |                    |


## State and Lineage

Fixed state:

None.

Immutable state:
* ```GENESIS_ID```: coin ID of the parent coin of eve CRT token(s)
* ```STATUTES_STRUCT```

Mutable state:

None.

### Eve state

Not applicable since standard CRT tokens are not protocol coins.

### Amount

Standard CRT tokens can have any amount, just like any other CAT.

### Lineage

Since CRT tokens are CATs, lineage is enforced by the [CAT layer](https://chialisp.com/cats/#code).
