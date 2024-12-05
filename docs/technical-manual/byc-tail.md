---
id: byc-tail
title: BYC Tail
sidebar_position: 391
---

# BYC Tail

The BYC tail is a [TAIL program](https://chialisp.com/cats/#tail) that determines under what conditions Bytecash tokens may be issued or melted. Note that the BYC tail does not allow minting.

Any issuance or melt of BYC tokens requires the approval of a collateral vault coin. The only way that BYC can be brought into circulation is by borrowing it from a collateral vault. The only way that Bytecash can cease to exist is by repaying loans. When making a repayment, not the entire amount of BYC repaid gets melted, but only that part that gets [allocated](http://localhost:3000/technical-manual/collateral-vaults#allocation-of-repayment-amounts) to the principal of the collateral vault.

Approval is enforced by a ```RECEIVE_MESSAGE``` condition in the tail that must have a matching ```SEND_MESSAGE``` from the corresponding collateral vault coin.

There are two collateral vault operations that allow for minting, and one that allows for melting BYC tokens.

| Collateral vault operation | file                                                                                                                                                   | BYC tail operation |
|:---------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| Borrow                     | [vault_borrow.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/vault_borrow.clsp)                                                 | issue              |
| Repay                      | [vault_repay.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/vault_repay.clsp)                                                   | melt               |
| Transfer Stability Fees    | [vault_keeper_transfer_sf_to_treasury.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/vault_keeper_transfer_sf_to_treasury.clsp) | issue              |


