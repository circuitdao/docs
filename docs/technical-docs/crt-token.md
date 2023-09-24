---
id: crt-token
title: CRT Token
sidebar_position: 8
---

# CRT Token

The Circuit Token (CRT) is the governance token of CircuitDAO. Token holders can use their CRT to vote on certain matters, such as updating parameters in the statutes, triggering an emergency shutdown, and so on.

CRT token can have standard inner puzzle in which case it acts as a normal CAT token and can be recognized by all wallets or can enter into governance mode by adding a bill layer puzzle.
In governance mode, it can vote to change existing statutes or add a new statute. To start a process, one has to have a CRT coin with an amount that passes the proposal threshold set in statutes. They also need to generate a bill, which is structured as a list of 2 values:
Index
-1 to add a new statutes
0 to execute a function (shutdown, transferring funds from treasury, update oracle price)
>0 to update existing statute
Value
Value of a statute (for example for voting threshold it would be an integer) or function name with params

## Activation delay
We don’t want to activate newly enacted bills instantly so that users have time to withdraw vaults and exit the system if they strongly disagree with the new bill or have time to trigger an emergency shutdown.
