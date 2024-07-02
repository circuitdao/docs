---
id: crt-token
title: CRT Token
sidebar_position: 245
---

# CRT Token

**Circuit Token** (**CRT**) is the governance token of CircuitDAO.

CRT token can have standard inner puzzle in which case it acts as a normal CAT token and can be recognized by all wallets or can enter into governance mode by adding a bill layer puzzle.
In governance mode, it can vote to change existing statutes or add a new statute. To start a process, one has to have a CRT coin with an amount that passes the proposal threshold set in statutes. They also need to generate a bill, which is structured as a list of 2 values:
Index
-1 to add a new statutes
0 to execute a function (shutdown, transferring funds from treasury, update oracle price)
>0 to update existing statute
Value
Value of a statute (for example for voting threshold it would be an integer) or function name with params

## Token supply

Upon [protocol launch](./../technical-manual/protocol_launch), 1 billion CRT tokens will be issued.

Additional CRT issuances are possible only in the following two situations:

* The winning bidder in a Recharge Auction is issued an amount of CRT as specified in the winning bid.
* Data providers are issued CRT that they are claiming from the Announcer Registry in return for Statutes Price updates.

The CRT supply decreases when a Surplus Auction is settled:

* The amount of CRT the winning bidder offered in the winning bid gets melted.


## Governance

CRT holders can use the token to update the protocol's Statutes. For details on the governance process, see the [governance](./governance) page.

