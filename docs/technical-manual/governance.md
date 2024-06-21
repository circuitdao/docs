---
id: governance
title: Governance
sidebar_position: 170
---

# Governance

Governance coins are CRT CATs with the governance.clsp puzzle as their inner puzzle.

Governance can change all parameters in Statutes with a non-negative index. Governance is conducted via proposing and vetoing **bills**. A bill specifies exactly one Statutes parameter to be changed (via its index), its proposed new value, and the proposed new secondary parameter values.

``` bill = (parameter index, new parameter value, new proposal threshold, new veto period, new implementation delay, new maximum delta) ```

## Operations

Operations:
* Propose bill
* Announce veto
* Veto bill
* Reset bill
* Enact bill

### Propose bill

A bill is proposed by spending a governance coin with the propose bill operation. The operation checks whether the proposed parameter change is permissible under the limitations imposed by the parameter's secondary parameters.

### Veto bill

To veto a bill, CRT needs to be locked up with the governance puzzle in a veto coin. The veto coin is then spent together with a proposal coin. The former with the announce veto operation, the latter with the veto bill operation. The veto succeeds if the amount of CRT locked up in the veto coin is greater than the amount of CRT locked up in the proposal coin.

![Governance veto](./../../static/img/Governance_veto_diagram.png)

Note that proposal coins are able to veto themselves. This addresses attacks vectors in which a malicious actor could try to launch a number of benign proposals to get a large amount of CRT locked up in proposal mode, only to then launch a malicious proposal for which there wouldn't be enough CRT for a successful veto anymore.

### Enact bill

One the Implementation Deplay has passed, the bill can be enacted, i.e. the parameters in Statutes changed as specified in the bill.

![Governance bill enactment](./../../static/img/Governance_bill_enactment_diagram.png)
