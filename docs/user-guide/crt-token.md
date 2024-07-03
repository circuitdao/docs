---
id: crt-token
title: CRT Token
sidebar_position: 245
---

# CRT Token

**Circuit Token** (**CRT**) is the governance token of CircuitDAO.

CRT tokens are Chia Asset Tokens (CATs). The CRT tail hash (asset ID) is:

```<tbd>```

Wallets that have had the CRT asset ID added to them will automatically recognize CRT tokens curried with the [standard inner puzzle](https://chialisp.com/standard-transactions/).

## Governance mode

To use CRT tokens for governance purposes, they must be locked up with a special governance puzzle as inner puzzle.

For information on the governance process, see the [governance](./governance) page in this user guide.

For details on the governance puzzle and related operations, see the [governance](./../technical-manual/governance) page of the Technical Manual.


## Token supply

Upon [protocol launch](./../technical-manual/protocol-launch), 1 billion CRT tokens will be issued.

Additional CRT issuances are possible only in the following two situations:

* The winning bidder in a Recharge Auction is issued an amount of CRT as specified in the winning bid.
* Data providers are issued CRT that they are claiming from the Announcer Registry in return for Statutes Price updates.

The CRT supply decreases when a Surplus Auction is settled:

* The amount of CRT that was offered in the winning bid gets melted.
