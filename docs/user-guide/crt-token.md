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

CRT token holders can participate in governance as described on the [governance](./governance) page. Since the protocol is largely immutable, governance is limited to changing Statutes or outputting custom conditions from the Statutes coin. However, even these limited actions come with a high degree of responsibility as misconfigured Statutes can disrupt the orderly functioning of the protocol.

For information on the governance process, see the [governance](./governance) page in this user guide.

To use CRT tokens for governance purposes, they must use special governance puzzle as their inner puzzle. For details on the governance puzzle and related operations, see the [governance](./../technical-manual/governance) page of the Technical Manual.

### Governance attacks

The ability to change Statutes opens up the possibility of governance attacks. Not only could a malicious actor with a large amount of CRT under their control try to disrupt the orderly functioning of the protocol, they could also attempt to gain from it financially by shorting BYC or CRT.

To exclude the possibility of governance attacks, **CRT holders should refrain from lending out their CRT tokens**. Any interest offered to CRT lenders will likely be earned by borrowers by shorting CRT or BYC and attacking the protocol in an attempt to lower the CRT price or cause a BYC depeg.

:::danger
CRT holders should never lend out their tokens as there is a fundamental incentive misalignment that could encourge governance attacks.
:::

### Flashloans

Flashloans are loans that are taken out and repaid in the same block. Although it is not possible to borrow CRT tokens out of nowhere due to the [CRT tail](./crt-tail) requiring approval from an Approval mod, and any such approval is only given in specific circumstances and for a specific amount of CRT, there may one day be large pools of CRT tokens in AMMs such as [TibetSwap](https://v2.tibetswap.io/) or other DeFi protocols.

If those pools are of CRT tokens not in governance mode, then flashloans for the purpose of interfering with governance processes are impossible since exiting governance mode requires a delay of at least one block vs the previous spend.

It is not possible for pools of CRT tokens in governance mode to exist, because CRT tokens cannot change their amount while in governance mode.


## Token supply

Upon [protocol launch](./../technical-manual/advanced-topics/protocol-launch), 1 billion CRT tokens will be issued.

Issuance of additional CRT tokens is possible only in the following two situations:

* A Recharge Auction gets settled. An amount of CRT as specified in the winning bid is issued.
* Announcer Registry distributes Rewards. An amount of CRT tokens as specified in Rewards per Interval Statute is issued.

The protocol decereases the supply of CRT tokens only in the following situation:

* A Surplus Auction gets settled. The winning Surplus Auction coin gets melted, destroying a corresponding amount of CRT.
