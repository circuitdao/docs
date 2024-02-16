---
id: system-upgrades
title: System Upgrades
sidebar_position: 9
---

# System Upgrades

We want to be able to upgrade all puzzles with minimal downtime to the system if governance votes in favour of it.
One major upgrade that we expect to do in the near future is singleton aggregation spend. That will change many puzzles as it will become possible to spend Statutes oracle multiple times per block enabling us to have accurate accounting balances of various balances in the system.

Statutes will define a mod hash for every puzzle in the system. This field will either be:
A hash atom 
A list containing:
Current hash 
Valid until block height
New hash
Upgrade puzzle that requires to be run to generate correct hash for next coin

Statutes will also have a flag if upgrades are allowed or not. 
This field will contain upgrade info until block height is reached, at which point it will revert back to the new hash to save on cost.
Puzzles should upgrade by that block, by using the upgrade puzzle when currying. 
To run an upgrade on a coin, pass a CREATE_COIN condition without amount and upgrade info for puzzle hash. 

(list CREATE_COIN (NEW_MOD_HASH <upgrade puzzle))

Passed values will be checked against the statutes to validate the upgrade. 

## Upgrading Statutes
Upgrading statutes works in a similar way. Vote is passed to upgrade mod hash of statutes to a specific hash and also puzzle used to map current curried values to new puzzle mod. 
Because Statutes is a singleton, this should not require all other puzzles to change as they should pick up the new puzzle automatically and already have statutes launcher id and its singleton puzzle curried in. 

## Freezing upgrades
CRT holders should be able to decide that the system is stable enough and upgrades aren’t needed anymore to close a potential attack vector of maliciously upgrading puzzles. 
To do this, a bill will have to be passed that sets a flag that disables upgrades. 

## XCH price feed
Current XCH price in $ will be stored in statutes as a separate variable and will be updated depending on a price delay set in statutes. 
Whenever oracle updates the price, they will check if enough time has passed since the last update on statutes and create a spend for it while updating oracle singleton coin. 
