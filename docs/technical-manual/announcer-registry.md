---
id: announcer-registry
title: Announcer Registry
sidebar_position: 382
---

# Announcer Registry

The **Announcer Registry**, or **Registry** for short, is a custom singleton that approved Announcers can register with. Registered Announcers can periodically claim **Rewards** from the Registry, which are paid in the form of newly issue CRT tokens. Rewards are intended to compensate data providers for the costs they incur by running an Announcer that publishes up-to-date price information.

Rewards accrue with every Statutes Price update and become claimable once the number of updates since the previous Reward distribution exceeds **Rewards Interval**.

Any Rewards claim automatically distributes CRT tokens to all registered Announcers, not just the keeper executing the operation. When Rewards are distributed, the Registry is cleared and all Announcers are required to re-register to continue to be eligible for Rewards.

:::warning
Data providers must re-register their Announcers every time Rewards are distributed to remain eligible for future Rewards.
:::

## Operations

Puzzle that operations are performed on: [announcer_registry.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer_registry.clsp)

Protocol deployer operations:
* **launch**: eve spend that must be executed at protocol launch - puzzle: [announcer_registry.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer_registry.clsp)

Announcer operations:
* **register**: adds a governance-approved Announcer to the Registry - puzzle: [announcer_registry.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer_registry.clsp)

Keeper operations:
* **reward**: distributes Rewards - puzzle: [announcer_registry.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/announcer_registry.clsp)

Although the Registry is not owned by anyone, the register operation can only be performed by data providers that control an approved Announcer.

### Launch

The Announcer Registry must be launched as part of the [protocol launch](./protocol_launch) process. As such, the launch operation is only performed once and irrelevant to protocol users and keepers.

### Register

The owner of an Announcer that has been approved by governance can register the Announcer with the Announcer Registry. A registered Announcer receives Rewards the next time Rewards are distributed. All registered Announcers receive the same amount of Rewards, irrespective of when they were registered. Announcers need to re-register after Rewards are distributed in order to be eligible for the next Reward distribution.

Announcers are registered by prepending a target puzzle hash to the ```ANNOUNCER_REGISTRY``` list. The target puzzle hash is where the Announcer would like to receive their Rewards. The target puzzle hash can, but need not be, the Announcer's inner puzzle hash. Using a different target puzzle hash allows data providers to separate private key management for the Announcer from custody arrangements used for Rewards.

#### State changes

* ```ANNOUNCER_REGISTRY```: target puzzle hash of Announcer getting registered gets prepended

### Reward

The reward operation is used to distribute Rewards to registered Announcers. Although the operation can be performed by anyone, in practice data providers that control a registered Announcer have the strongest incentive to do so.

When Rewards are distributed, the Registry is cleared, i.e. ```ANNOUNCER_REGISTRY``` is set to nil. This means that Announcers must be re-registered in order to receive Rewards during the next distribution. It is sufficient to re-register at any time before **Price Update Counter** exceeds ```REWARDS_CLAIMABLE_AT```, which is the earliest point in time when the reward operation can be performed next. This gives data providers flexibility to re-register when transaction fees are low.

A slight disadvantage is that if Rewards aren't distributed at the earliest possible opportunity, i.e. when ```Price Update Counter = REWARDS_CLAIMABLE_AT + 1```, for example because transaction fees are high, then there is no corresponding increase in Rewards for additional Price Update Counter increases.

![Registry mint coin spends diagram](./../../static/img/Registry_mint_coin_spends_diagram.png)

The amount of mCRT paid to each registered Announcer during a Rewards distribution is **Rewards per Interval** divided by the number of registered Announcers rounded down to the nearest integer. Any remainder can be claimed by the keeper performing the operation by providing a puzzle hash.

The rate at which CRT rewards can accrue is capped by the **Maximum Reward per Interval** divided by the **Minimum Reward Interval**. Both parameters are fixed args of the Registry mod that are set at protocol launch and can never be changed. This caps the annual CRT supply growth from rewarding Announcers in perpetuity, giving CRT holders a guarantee on the maximum dilution they may suffer.

```
(mod (MAXIMUM_REWARD_PER_INTERVAL MINIMUM_REWARD_INTERVAL ... MOD_HASH ...) ...)
```

:::note
Distributing Rewards increases the CRT supply.
:::

#### State changes

* ```ANNOUNCER_REGISTRY```: gets cleared, i.e. set to nil.
* ```CLAIM_COUNTER```: gets increased by 1
* ```REWARDS_CLAIMABLE_AT```: gets updated to Price Update Counter plus Reward Interval.


## State and lineage

Fixed state:
* ```MAXIMUM_REWARD_PER_INTERVAL```
* ```MINIMUM_REWARD_INTERVAL```
* ```ATOM_ANNOUNCER_MOD_HASH```
* ```CAT_MOD_HASH```
* ```CRT_TAIL_MOD_HASH```
* ```RUN_TAIL_MOD_HASH```
* ```OFFER_MOD_HASH```

Immutable state:
* ```MOD_HASH```
* ```STATUTES_STRUCT```

Mutable state:
* ```ANNOUNCER_REGISTRY```: List of puzzle hashes at which registered Announcers receive Rewards
* ```REWARDS_CLAIMABLE_AT```: Number of Statutes price updates after which Rewards can be distributed next

### Eve state

The eve state of the Registry may come without registered Announcers or with a number of pre-registered Announcers. In the former case, the ```ANNOUNCER_REGISTRY``` curried arg would be set to nil, in the latter case it would be a list of target puzzle hashes of pre-registered Announcers.

### Amount

The Announcer Registry coin amount is always 0.

### Lineage

Being a custom singleton, the Announcer Registry requires a lineage proof when spent. In case of the eve spend, which must be performed using the launch operation, the Registry asserts the [standard launcher](https://chialisp.com/singletons/#launcher) ```CREATE_COIN_ANNOUNCEMENT``` from the Statutes launcher coin. This requires the lineage proof to be the treehash of a list consisting of the Statutes eve puzzle hash (corresponding to the full puzlle including the outer standard singleton layer) and the amount of the Statutes eve coin, which is always 1 <!--(TODO: and the key_value_list if used)-->. It also means that the Registry's eve spend must occur at protocol launch.


## Statutes
* **Reward per Interval**
    * Statute index: 29
    * Statute name: STATUTE_ANNOUNCER_CRT_CREDITS_PER_INTERVAL
    * considerations:
* **Reward Interval**
    * Statute index: 30
    * Statute name:STATUTE_ANNOUNCER_CREDITS_INTERVAL
    * considerations:
