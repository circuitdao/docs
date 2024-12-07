---
id: byc-tail
title: BYC Tail
sidebar_position: 391
---

# BYC Tail

The BYC tail is a [TAIL program](https://chialisp.com/cats/#tail) that determines under what conditions Bytecash tokens may be issued or melted. The BYC tail does not allow for minting.

## Operations

Puzzle operations are performed on: [byc_tail.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/byc_tail.clsp)

Approval mod operations:
* **issue**: issue BYC tokens - puzzle: [byc_tail.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/byc_tail.clsp)
* **melt**: melt BYC tokens - puzzle: [byc_tail.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/byc_tail.clsp)

### Issue

Any issuance of BYC tokens requires the approval of a Collateral vault coin as [Approval mod](./advanced-topics/approval-mods). The only way that BYC can be brought into circulation is by borrowing it from a Collateral vault.

Approval is enforced by a ```RECEIVE_MESSAGE``` condition in the tail that must have a matching ```SEND_MESSAGE``` from the corresponding Collateral vault coin. There are two Collateral vault operation that allow for issuing BYC tokens.

| BYC tail operation | Approval mod | Operation | Operation program |
|:---------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------|:--|
| issue | Collateral vault | borrow                     | [vault_borrow.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/vault_borrow.clsp)                                                 | issue              |
| issue | Collateral vault | transfer Stability Fees    | [vault_keeper_transfer_sf_to_treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/vault_keeper_transfer_sf_to_treasury.clsp) | issue              |

### Melt

Any melting of BYC tokens requires the approval of a Collateral vault coin as [Approval mod](./advanced-topics/approval-mods). The only way that Bytecash can cease to exist is by repaying loans. When making a repayment, not the entire amount of BYC repaid may get melted, but only that part that gets [allocated](./collateral-vaults#allocation-of-repayment-amounts) to the principal and Transferred Fees portion of the outstanding debt.

Approval is enforced by a ```RECEIVE_MESSAGE``` condition in the tail that must have a matching ```SEND_MESSAGE``` from the corresponding Collateral vault coin. There is one Collateral vault operation that allow for melting BYC tokens.

| BYC tail operation | Approval mod | Operation | Operation program |
|:---------------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------|:--|
| melt | Collateral vault | repay                      | [vault_repay.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/vault_repay.clsp)                                                   | melt               |


