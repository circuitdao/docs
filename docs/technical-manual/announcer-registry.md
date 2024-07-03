---
id: announcer-registry
title: Announcer Registry
sidebar_position: 382
---

# Announcer Registry

The **Announcer Registry** is a singleton coin that keeps track of CRT rewards for Statutes Price updates and the Announcers eligible to receive those rewards. In addition the Announcer Registry handles the minting process via which the CRT rewards are paid out to Announcers.


## Operations

Puzzle that operations are performed on: [announcer_registry.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer_registry.clsp)

Operations:
* **Launch**: eve spend that must be executed at protocol launch - puzzle: [announcer_registry.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer_registry.clsp)
* **Register**: adds a governance-approved announcer to the registry - puzzle: [announcer_registry.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer_registry.clsp)
* **Mint**: mints CRT rewards and distributes them to eligible Announcers - puzzle: [announcer_registry.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer_registry.clsp)

Although the Announcer Registry is not owned by anyone, register and mint operations can only be performed by Announcer owners. The launch operation must be performed by the same entity that is launching the protocol.

### Launch

The Announcer Registry must be deployed and launched as part of the [protocol launch](./protocol_launch) process. Its eve spend asserts the launcher ID of the Statutes launcher coin.

### Register

The owner of an Announcer that has been approved by governance can whitelist the Announcer coin with Announcer Registry via the register operation. Once an Announcer is registered, it starts accruing CRT rewards every time the Statutes Price is updated.

### Mint

Since publishing up-to-date price information comes with costs for data providers, the protocol allocates credits to registered Announcers. The amount of credits allocated to an Announcer during a **CRT Claim Interval** is given by the **CRT Credits per Interval**. Announcers can claim CRT rewards that have accrued to them using the mint operation. Each credit is worth 1 CRT.

The rate at which CRT rewards can accrue is capped by the **Maximum Mint Amount** divided by the **Minimum Claim Interval**. Both values are curried into the announcer_registry.clsp puzzle at protocol launch and are immutable.

```(mod (MAX_MINT_AMOUNT MIN_CLAIM_INTERVAL MOD_HASH ...) ...```

The MOD_HASH curried argument refers to the mod hash of the announcer_registry.clsp puzzle curried with the Maximum Mint Amount and Minimum Claim Interval. All other curried args are curried together with the MOD_HASH.


## Statutes
* **CRT Credits per Interval**
    * Statute index: 28
    * Statute name: STATUTE_ANNOUNCER_CRT_CREDITS_PER_INTERVAL
    * considerations:
* **CRT Claim Interval**
    * Statute index: 29
    * Statute name:STATUTE_ANNOUNCER_CLAIM_INTERVAL
    * considerations:

