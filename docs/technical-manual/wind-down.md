---
id: wind_down
title: Protocol wind-down
sidebar_position: 199
---

# Protocol wind-down

It may be necessary to wind down the protocol, for example in case a vulnerability is discovered that cannot be fixed or mitigated.

In such a scenario it would be desirable to wind down the protocol in an orderly manner, i.e. such that BYC remains pegged and BYC holders can sell their BYC without a loss, such that borrowers can fully repay their loans and reclaim all their collateral, and such that savers can withdraw their BYC from savings vault, ideally with full accrued savings interest.

CRT holders would still get wiped out, but this cannot be avoided.

Key to an orderly wind-down is to ensure that there is sufficient supply of BYC in the market to allow borrowers to repay their loans. Thanks to SF transfers, accrued SFs can be brought into circulation via Surplus Auctions by lowering the Treasury Maximum. In addition, the Savings Rate should be lowered to encourage the withdrawal of BYC from Savings Vaults.

Since all three of SF, SR and Treausry Maximum can be changed by governance with little lead time (these are the variables that make use of the Maximum Delta secondary parameter), governance should be able to manage the peg even in a rapidly unfolding situation.
