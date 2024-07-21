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
* **Mutate**: update Announcer price - puzzle: [announcer_mutate.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/announcer_mutate.clsp)
* **Register**: register Announcer with Announcer Registry - puzzle: [announcer_register.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/announcer_register.clsp)

Keeper operations:
* **Announce**: announce Announcer price - puzzle: [announcer_announce.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/announcer_announce.clsp)
* **Govern**: approve Announcer to permit registration - puzzle: [announcer_govern.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/announcer_govern.clsp)
* **Penalize**: slash Announcer's bond - puzzle: [announcer_penalize.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/programs/announcer_penalize.clsp)


### Mutate

The Announcer price can be updated by its data provider at any time via the mutate operation. An Announcer price expires after [Announcer Delay](./../user-guide/price-oracle) seconds.

### Register

An Announcer that has been approved by governance via the govern operation can be registered with the Announcer Registry by its data provider.

A registered Announcer can be used in Oracle Price updates. Registered Announcers are eligible for CRT rewards but are also subject to slashing.

The register operation requires a simultaneous spend of the Announcer Registry with that coin's own register operation.

### Announce

The announce operation leaves the Announcer price unchanged but creates an announcement condition that can be asserted by coins that wish to use the Announcer price. Most importantly, the Announcer price announcement can be picked up by the Oracle coin when updating the Oracle Price.

### Govern

Governance can approve and disapprove Announcers. An approved Announcer may be registered with the Announcer Registry by its data provider. A disapproved Announcer loses its registered status with the Announcer Registry and may not be re-registered until approved again.

### Penalize

Keepers can penalize Announcers whose prices have expired. A price expires if the last update occured longer ago than the Announcer Delay. The amount claimed is dependent on the 

unt of XCH as given by the **Announcer Minimum Deposit**. If an Announcer price is expired, then the **Announcer Penalty Amount** (APA) is deducted from the bond every **Announcer Penalty Frequency** (APF) seconds, until an Announcer price is published again.
