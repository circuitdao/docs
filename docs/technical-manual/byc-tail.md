---
id: byc-tail
title: BYC Tail
sidebar_position: 391
---

# BYC Tail

The BYC tail is a [TAIL program](https://chialisp.com/cats/#tail) that determines under what conditions Bytecash tokens may be issued or melted. The BYC tail does not allow for minting.

Running the BYC tail requires approval from a Collateral vault as Approval mod. Approval is enforced by a ```RECEIVE_MESSAGE``` condition in the tail that must have a matching ```SEND_MESSAGE``` condition output by a Collateral vault coin.

The tail can only be run on BYC CATs that have [Run Tail mod](./advanced-topics/run-tail-mod) as their inner puzzle.

The BYC tail has one fixed arg, ```RUN_TAIL_MOD_HASH```, and one immutable arg, ```STATUTES_STRUCT```.

## Operations

Puzzle operations are performed on: [byc_tail.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/byc_tail.clsp)

Approval mod operations:
* **issue**: issue BYC tokens - puzzle: [byc_tail.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/byc_tail.clsp)
* **melt**: melt BYC tokens - puzzle: [byc_tail.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/byc_tail.clsp)

### Issue

Any issuance of BYC tokens requires the approval of a Collateral vault coin as [Approval mod](./advanced-topics/approval-mods). Approval is enforced by a ```RECEIVE_MESSAGE``` condition in the tail that must have a matching ```SEND_MESSAGE``` from the corresponding Collateral vault coin.

There are two Collateral vault operations that allow for issuing BYC:

| BYC tail operation | Approval mod     | Operation               | Operation program                                                                                                                                               |
|:-------------------|:-----------------|:------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| issue              | Collateral vault | borrow                  | [vault_borrow.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_borrow.clsp)                                                 |
| issue              | Collateral vault | transfer Stability Fees | [vault_keeper_transfer_sf_to_treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_keeper_transfer_sf_to_treasury.clsp) |

There are no restrictions on the child coins of the issuance coin other than that the sum of their amounts must add up to the amount of the issuance coin, i.e. the [**delta**](https://chialisp.com/cats/#extra-delta) (also known as **extra delta**) must be 0. In other words, subject to amounts matching, the issuer can pass ```CREATE_COIN``` conditions of their choosing into the tail.

### Melt

Any melting of BYC tokens requires the approval of a Collateral vault coin as [Approval mod](./advanced-topics/approval-mods).

There are three Collateral vault operations that allow for melting BYC:

| BYC tail operation | Approval mod     | Operation                    | Operation program                                                                                                                                 |
|:-------------------|:-----------------|:-----------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------|
| melt               | Collateral vault | repay                        | [vault_repay.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_repay.clsp)                                     |
| melt               | Collateral vault | bid (in liquidation auction) | [vault_keeper_bid.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_keeper_bid.clsp)                           |
| melt               | Collateral vault | recover bad debt             | [vault_keeper_recover_bad_debt.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/vault_keeper_recover_bad_debt.clsp) |

The BYC tail does not allow for partial melting. If a BYC coin is melted, it does not create any child coins. It is the job of the driver to create a BYC coin of correct size prior to melting. The driver is also responsible for absorbing any melt mojos for the vault owner or keeper.
