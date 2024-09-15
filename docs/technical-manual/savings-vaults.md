---
id: savings-vaults
title: Savings Vaults
sidebar_position: 350
---


# Savings Vaults

Savings vaults are BYC CAT with inner puzzle savings_vault.clsp.

The savings vault puzzle has itself an inner puzzle, which can be chosen freely by the savings vault owner. The inner puzzle may output multiple create coin conditions. The first of these yields the savings vault's child vault (inner puzzle, amount and memo are all preserved), whereas any other child coins created are no longer protocol coins (they can for example be coins that receive an amount withdrawn from the savings vault).

:::info
It is safe to use the [standard transaction puzzle](https://chialisp.com/standard-transactions/#code) for the inner puzzle of a savings vault.
:::

Savings vaults can be created on a standalone basis, i.e. without requiring a simultaneous spend of any protocol coins.

## Interest accrual and accounting

Savings interest compounds by the minute, i.e. the prevailing Interest Discount Factor (IDF) is successively applied to the aggregate of net deposits and accrued savings interest. Net deposits are the amount locked up in the Savings Vault coin. The protocol keeps track of accrued interest only indirectly via the **discounted deposits** state variable.

Discounted deposits are effectivley the vault's net deposits valued at vault creation, and are defined as the sum of all amounts deposited and withdrawn from the Savings Vault coin discounted by the respective **Current Cumulative Interest Discount Factor** (CCIDF) at the time:

$$
discounted\ deposits = \sum_{i=1}^A \frac{B_i}{CCIDF_{t_{B_i}}} - \sum_{j=1}^B \frac{R_j}{CCIDF_{t_{R_j}}},
$$

where $t_{B_i}$ are the times when deposits were made, and $t_{R_j}$ the times when withdrawals occurred.

This is analogous to how [collateral vaults](./collateral_vault) account for accrued Stability Fees. Accordingly, the Current Cumulative Interest Discount Factor is calculated as

$$
CCIDF(t_C) = CIDF(t_S)\; IDF^{C-S},
$$

where $t_C$ is the current time, $t_S$ is the timestamp of the current Statutes Price, and the **Cumulative Interest Discount Factor** (CIDF) at time $t_S$ is defined as

$$
CIDF(t_S) = \prod_{i=P}^{S} IDF_{t_i}
$$

:::info
Similarly to the situation with collateral vaults, it is possible for CCIDF to change retroactively when the IDF is updated by governance. However, since there is no risk of liquidation with savings vault, the impact is limited to the amount of interest earned, which is generally uncritical. See the Danger box on the [collateral vaults](./collateral_vaults) page for additional info.
:::

As with collateral vaults, savers are given a three minute window of flexibility for specifiying the current timestamp vs the actual block timestamp when making depsoits or withdrawals to reduce the likelihood that an operation times out and will fail to be included in the blockchain. Since a malicious vault owner could exploit this flexibility by making deposits in the past and withdrawing in the future to boost their effective savings rate, the actual definition of CCIDF in the savings vault puzzle includes an additional factor IDF^(-3) to reduce the interest accrued by the maximum that can be gained from the timestamp flexibility.


## Operations

Puzzle that operations are performed on: [savings_vault.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/savings_vault.clsp)

Owner operations:
* **Deposit**: deposit BYC - puzzle: [savings_vault.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/savings_vault.clsp)
* **Withdraw**: withdraw BYC - puzzle: [savings_vault.clsp](https://github.com/circuitdao/puzzles/blob/main/circuit_puzzles/savings_vault.clsp)

Savings vault operations are part of the savings vault's main puzzle. The reason being that deposit and withdrawal operation have in fact the same implementation. Whether an operation on the savings vault is a deposit or withdrawal can be inferred from how it changes net deposits and accrued interest of the vault and whether an interest withdrawal from Treasury was made.

### Deposit

When depositing to a savings vault, the user needs to make a contribution spend to add to the vault's net deposits. It is also possible to increase net deposits by requesting Treasury to pay out the accrued interest. In this case, the Treasury will always pay the full accrued interest as a protective measure against coin hogging.

![Savings vault deposit with interest](./../../static/img/Savings_vault_deposit_spends_diagram.png)

### Withdraw

The number of savings vaults from which interest can be withdrawn in any given block is limited, as each withdrawal requires its own Treasury coin spend, and there is only a fixed number of [Treasury Coins](./treasury). Although it is possible to spend Treasury coins repeatedly in the same block, the block limit still means that there's a max of about X interest withdrawals per block.

![Savings Interest withdrawal](./../../static/img/Savings_interest_withdrawal_diagram.png)

To prevent depositors from having to wait for a Treasury coin to become available in times of high demand, it is possible to make a withdrawal from net deposits only, which does not require a treasury spend.

![Savings vault withdrawal with interest](./../../static/img/Savings_vault_withdrawal_spends_diagram.png)
    
:::note
On a protocol level, savers can choose any split between net deposits and interest when making a withdrawal, but this is not currently supported by the app.
:::
