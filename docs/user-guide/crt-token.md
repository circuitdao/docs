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

CRT token holders can participate in governance as described on the [governance](./governance) page. Since the protocol is largely immutable, governance is limited to changing Statutes or outputting custom conditions from the Statutes coin.

However, even these limited actions come with a high degree of responsibility as misconfigured Statutes could disrupt the functioning of the protocol and potentially result in a BYC depeg and CRT tokens to become worthless. This also opens up the possibility of governance attacks in which malicious actors could try to gain financially by borrowing CRT to pass governance proposals that would wreak havoc on the protocol, while at the same time shorting CRT.

:::danger
CRT holders should never lend out their tokens as there is a fundamental incentive misalignment. Any interest to be paid by borrowers will likely be earned by shorting CRT and attacking the protocol in an attempt to tank the CRT price.
:::

To use CRT tokens for governance purposes, they must be locked up with a special governance puzzle as inner puzzle.

For information on the governance process, see the [governance](./governance) page in this user guide.

For details on the governance puzzle and related operations, see the [governance](./../technical-manual/governance) page of the Technical Manual.


## Token supply

Upon [protocol launch](./../technical-manual/advanced-topics/protocol-launch), 1 billion CRT tokens will be issued.

Additional CRT issuances are possible only in the following two situations:

* The winning bidder in a Recharge Auction is issued an amount of CRT as specified in the winning bid.
* Data providers are issued CRT that they are claiming from the Announcer Registry in return for Statutes Price updates.

The CRT supply decreases when a Surplus Auction is settled:

* The amount of CRT that was offered in the winning bid gets melted.
