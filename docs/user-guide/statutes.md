---
id: statutes
title: Statutes
sidebar_position: 80
---

# Statutes

**Statutes** are a set of parameters that define the behaviour of Circuit protocol. These parameters are effectively the global state variables of the protocol.

There three different types of Statutes parameters:
* Parameters that are updated by the protoctol itself
* Parameters the can be updated by governance
* the [Statutes Price](./price-oracle)

Statutes are kept in a singleton coin, which is referred to as the **Statutes coin** or simply **Statutes**. Announcements from this singleton are needed by almost every spend in the protocol as puzzles ensure that they are using the correct parameters by asserting the Statutes coin's announcements.

## Secondary parameters

Governance-updated parameters come with secondary parameters that define the constrainst subject to which these parameters can be updated. There seconary parameters are:

* **Proposal Threshold**: minimum amount of CRT required to make a proposal
* **Veto Period**: time period (in seconds) during which a proposal can be vetoed
* **Implemenation Delay**: time (in seconds) that needs to pass before the new parameter value becomes effective after the end of the veto period
* **Maximum Delta**: the maximum absolute amount by which the parameter may change

For further information on secondary parameters, see the [governance](./governance) page.


## Parameters

Statutes parameter name and index shown below together with a brief explanation of their respective data format and a brief explanation.

Current parameter values are shown on the dashboard (TODO: add link).

### Protocol-updated parameters:

(-4) **CREDITS_BALANCE**: credits available to be claimed by Announcers

(-3) **TREASURY_COIN_APPROVER_MOD_HASHES**: treasury coin mod hashes

(-2) **PAST_CUMULATIVE_INTEREST_DF**: cumulative interest discount factor

(-1) **PAST_CUMULATIVE_STABILITY_FEE_DF**: cumulative stability fee discount factor

### Governance-updated parameters:

(0) **STATUTE_PRICE_ORACLES**:

(1) **STATUTE_STABILITY_FEE_DF**: per-minute stability fee discount factor in millionths of a pip (100th of a basis point), e.g. 1.000 000 000 190, roughly equivalent to an annual DF of 1.05, which in turn is equivalent to a 5% APY

(2) **STATUTE_INTEREST_DF**: per-minute interest discount factor in millionths of a pip (100th of a basis point), e.g. 1. 000 000 000 190, roughly equivalent to an annual DF of 1.05, which in turn is equivalent to a 5% APY

(3) **STATUTE_CUSTOM_ANNOUNCEMENTS**:

(4) **STATUTE_LIQUIDATION_RATIO**:

(5) **STATUTE_ORACLE_M_OF_N**:

(6) **STATUTE_ORACLE_PRICE_UPDATABLE_AFTER_SECONDS**:

(7) **STATUTE_ORACLE_PRICE_UPDATABLE_PERCENT_THRESHOLD**:

(8) **STATUTE_ORACLE_PRICE_EXPIRATION_SECONDS**:

(9) **STATUTE_MINIMUM_VAULT_DEBT_AMOUNT**: (TODO: rename to STATUTE_VAULT_MINIMUM_DEBT?)

(10) **STATUTE_VAULT_AUCTION_STEP_TIME_INTERVAL**:

(11) **STATUTE_VAULT_AUCTION_STEP_PRICE_DECREASE_FACTOR**:

(12) **STATUTE_VAULT_AUCTION_TIMEOUT**:

(13) **STATUTE_VAULT_AUCTION_STARTING_PRICE_FACTOR**:

(14) **STATUTE_VAULT_INITIATOR_FLAT_INCENTIVE**:

(15) **STATUTE_VAULT_INITIATOR_RELATIVE_INCENTIVE_PERCENT**:

(16) **STATUTE_VAULT_LIQUIDATION_PENALTY_PERCENT**:

(17) **STATUTE_TREASURY_MINIMUM**:

(18) **STATUTE_TREASURY_MAXIMUM**:

(19) **STATUTE_MINIMUM_SF_TRANSFER_AMOUNT**:

(20) **STATUTE_RECHARGE_AUCTION_TIMEOUT**:

(21) **STATUTE_RECHARGE_AUCTION_MIN_CRT_PRICE**:

(22) **STATUTE_RECHARGE_AUCTION_BID_TTL**:

(23) **STATUTE_RECHARGE_AUCTION_MINIMUM_BID_AMOUNT**:

(24) **STATUTE_SURPLUS_AUCTION_TIMEOUT**:

(25) **STATUTE_SURPLUS_AUCTION_LOT_AMOUNT**:

(26) **STATUTE_SURPLUS_AUCTION_BID_TTL**:

(27) **STATUTE_SAVINGS_MINIMUM_INTEREST_AMOUNT_TO_WITHDRAW**:

(28) **STATUTE_ANNOUNCER_CRT_CREDITS_PER_INTERVAL**:

(29) **STATUTE_ANNOUNCER_CLAIM_INTERVAL**:

(30) **STATUTE_ANNOUNCER_MIN_DEPOSIT**:

(31) **STATUTE_ANNOUNCER_DELAY**:

(32) **STATUTE_ANNOUNCER_PENALTY_INTERVAL_MINUTES**:

(33) **STATUTE_ANNOUNCER_PENALTY_FACTOR_PER_INTERVAL**:

(34) **STATUTE_ENACTMENT_TIMEOUT_SECONDS**:

### Statutes Price:

* **PRICE_INFO**: copied from Oracle once Oracle Price Delay has passed
  * **price**: XCH/USD price * 1000
  * **last_updated**: Unix timestamp
