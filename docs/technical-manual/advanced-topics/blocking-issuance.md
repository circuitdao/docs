---
id: blocking-issuance
title: Blocking Issuance
sidebar_position: 1300
---

# Blocking Issuance of BYC and CRT

The Statute ```BLOCK_ISSUANCE``` allows governance to restrict certain protocol operations. It is intended as an emergency measure when a smart contract vulnerability is discovered.

By restricting what operations are possible, the attack surface is significantly reduced. At the same time, protocol users are still able to
* withdraw BYC from savings vaults
* repay debt
* withdraw collateral

When ```BLOCK_ISSUANCE``` is activated, it is no longer possible to issue BYC or CRT. In addition, all collateral vault operations except repay and withdraw get disabled.

Disabling issuance of BYC and CRT coins indirectly blocks a number of operations:
* borrowing BYC
* transferring Stability Fees from collateral vaults to treasury
* settling recharge auctions
* distributing CRT rewards to Announcers

Blocking all but two collateral vault operations significantly reduces the risk that collateral can be drained. Borrowers should be aware that the transfer operation gets blocked too, making it impossible to change the inner puzzle of the vault.
