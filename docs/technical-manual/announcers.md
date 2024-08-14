---
id: announcers
title: Announcers
sidebar_position: 381
---

# Announcers

Announcers are singleton coins deployed by data providers. Their purpose is to make the XCH/USD market price available on-chain.

Announcer prices are used to update the Oracle Price.


## Operations

Puzzle that operations are performed on: [announcer.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer.clsp)

Owner operations:
* **Mutate**: update Announcer state - puzzle: [announcer_mutate.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/announcer_mutate.clsp)
* **Register**: register Announcer with the [Announcer Registry](./announcer-registry) - puzzle: [announcer_register.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/announcer_register.clsp)

Keeper operations:
* **Announce**: announce Announcer price - puzzle: [announcer_announce.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/announcer_announce.clsp)
* **Govern**: approve or disapprove Announcer - puzzle: [announcer_govern.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/announcer_govern.clsp)
* **Penalize**: slash Announcer's bond - puzzle: [announcer_penalize.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/announcer_penalize.clsp)

![Announcer diagram](./../../static/img/Announcer_diagram.png)

### Mutate

An Announcer's state, including its price, can be updated by its data provider at any time via the mutate operation. The price expires [Announcer Validity](./../user-guide/price-oracle) seconds after an update. The expiration time is recorded in the curried arg TIMESTAMP_EXPIRES.

State variables (curried args) that can be updated by the data provider are:
* INNER_PUZZLE_HASH:
* APPROVED: indicates whether Announcer has been approved by governance
* DEPOSIT: the amount in the Announcer coin. This is the bond that can be slashed in a penalization operation (TODO: is this curried arg needed? why not use Announcer coin's amount directly?)
* DELAY: number of seconds for which an updated price is valid. used to calculate the expiry timestamp, TIMESTAMP_EXPIRES
* ATOM_VALUE: XCH/USD price published by data provider

Note that for cost reasons the DELAY curried arg is only checked against the corresponding Statute, STATUTES_ANNOUNCER_DELAY, when the Oracle price is updated. This means that even an approved Announcer whose price is not expired may not be used in an Oracle price update. Therefore, setting a large delay (and then disapproving themselves) is a way for data providers to stop publishing prices without getting penalized (TODO: potentially not wanted?!). Governance should monitor the DELAY curried arg of approved Announcers and disapprove announcers that do not keep DELAY in lockstep with the corresponding Statute.

The mutate operation can also be used by the data provider to disapprove the Announcer. Such a unilateral disapproval by the data provider is referred to as a **deactivation**. For an Announcer to be disapproved in this way, the _deactivate_ solution argument must be set to 1. In order to allow governance to find a replacement data provider, a deactivation comes with a delay of <TODO: insert Statute name> seconds before becoming effective.

Lastly, it is possible to **melt** an unapproved Announcer via the mutate operation by setting the _melt_ solution argument to 1.

### Register

An approved Announcer can be registered with the Announcer Registry by its data provider. Registered Announcers are eligible for CRT rewards. Although data providers are not required to register their Announcers, there is no downside in doing so.

The register operation leaves the state of the Announcer unchanged. Registration is effected by adding the Announcer's inner puzzle hash to the Announcer Registry.

### Announce

The announce operation creates an announcement that can be asserted by coins that wish to use the Announcer price. Within Circuit protocol, the Oracle is the only coin that makes used of these announcements, namely when updating the Oracle price. Oracle price updates may only use Announcers that have been approved by governance, i.e. Announcers in which the APPROVED curried arg is equal to 1.

The announce operation leaves the state of the Announcer unchanged.

### Govern

Governance can **approve** or **disapprove** Announcers. In the former case, the Announcer's APPROVED curried arg is set to 1, in the latter case it is set to 0, returning the Announcer to an unapproved state. An approved Announcer may be registered with the Announcer Registry by its data provider. A disapproved Announcer loses its registered status with the Announcer Registry and may not be re-registered until approved again.

### Penalize

Keepers can penalize approved Announcers whose prices have expired by at least the Penalty Interval (STATUTE_ANNOUNCER_PENALTY_INTERVAL_MINUTES). A price expires if the last update, as indicated by the TIMESTAMP_EXPIRES curried arg, lies further in the past than the current time minus the Announcer Validity (STATUTE_ANNOUNCER_DELAY).

When an Announcer is penalized, an amount of XCH equal to the Penalty Factor multiplied by the number of full Penalty Intervals that have passed since expiry or the previous penalization event is slashed from the Announcer coin. This amount can either be claimed by the keeper performing the penalization operation or wholly or partly left to the farmer of the block.

Since keepers will be competing to penalize an expired Announcer, it can generally be expected that the penalty is applied at the earliest possible point in time, and that therefore the deposit (bond) of an expired Announcer will decline at an exponential rate according to the Penalty Factor.
