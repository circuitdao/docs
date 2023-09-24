---
id: emergency-shutdown
title: Emergency Shutdown
sidebar_position: 6
---

# Emergency Shutdown

The emergency shutdown is a mechanism by which the entire CircuitDAO system can be wound down. No new collateral may be deposited, and no new BYC loans may be taken out. Oustanding BYC can be exchanged for collateral, and excess collateral is returned to vault owners.

Having an emergency shutdown mechanism is a crucial feature that supports the stability of BYC. It is the only mechanism by which BYC holders that didn't borrow BYC from the protocol but acquired it from third parties can redeem their BYC with the protocol. Otherwise BYC holders would be at the mercy of borrowers in case of of BYC depeg to the downside, which could result in a panic to sell BYC and resulting death spiral.


## Situations for which an Emergency Shutdown is intended

An emergency shutdown is intended to be triggered in the following scenarios:

* Critical Vulnerabilities: If a severe vulnerability is discovered in the MakerDAO system that could jeopardise the safety of the assets or the stability of Dai, an Emergency Shutdown might be initiated to protect users and their funds.
* Severe Market Disruptions: In the case of extreme market events where the collateral assets experience unprecedented volatility or other disruptions, the system might be shut down to prevent cascading liquidations or other systemic risks.
* Long-Term Market Irrationality: If the price of Dai remains significantly off its $1 peg for an extended period, and all other mechanisms to restore the peg fail, an Emergency Shutdown might be considered.
* External Attacks: If the MakerDAO system is under attack, either through malicious governance actions, oracle attacks, or other external threats, an Emergency Shutdown might be initiated to protect the system and its users.
* Regulatory or Legal Challenges: If there are significant regulatory or legal challenges that threaten the operation or viability of the MakerDAO system, an Emergency Shutdown might be a potential response.


## Triggering an Emergency Shutdown

To trigger the shutdown, a system variable will determine how many CRT tokens are required to be locked into statutes to trigger it. CRT tokens locked in the statutes can’t be withdrawn and are effectively bricked.

Locking CRT tokens will require a p2_puzzle. Locked tokens expire (TODO: what's a reasonable time here) if they’re not spent within a certain amount of time. Expired tokens can be melted, reducing the CRT supply.

Once there are enough tokens locked, they can be spent to execute a shutdown on statutes. However, an ES can be cancelled at any time before it has been executed by governance with X votes.


## Result of Emergency Shutdown

When an emergency shutdown is executed:

* The system freezes the current state of all Vaults.
* Price oracles provide a final price feed for XCH and BYC in the system.
* Vault owners can claim the net value of their collateral based on the final price feed.
* BYC holders can redeem their BYC for a proportional share of the collateral in the system based on the final oracle prices.
