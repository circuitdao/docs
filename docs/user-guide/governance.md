---
id: governance
title: Governance
sidebar_position: 90
---

# Governance

Circuit protocol is goverend by CRT token holders. Token holders can use their CRT tokens to vote on changes to parameters that define the protocol's behaviour. These parameters are defined in [Statutes](./statutes). Other than the parameters in Statutes, Circuit is fully immutable.

The reason that Circuit requires goverance is to keep the 1:1 peg of Bytecash to the US Dollar. This cannot be fully automated, as the protocol needs to respond to changing market conditions. Governance's responsibilities consist of the following:

* Selecting data providers for the Oracle.
* Monitoring the market price of Bytecash for deviations from the peg
* Adjusting protocol parameters to maintain the peg

### Oracle Selection

It is crucial for the functioning of the protocol that it has access to accurate and timely XCH/USD prices, as liquidations hinge on this. Governance should only whitelist trusted data providers that have a track record of publishing XCH/USD prices in an Announcer coin on-chain. Data provider performance should be monitored on an ongoing basis, and in case of poor performance, governance should unwhitelist the data provider's Announcer. For further details on Oracle and Announcers, see the [Oracle](./oracle) page.

### Monitoring Bytecash market price

As a stablecoin pegged 1:1 to the US Dollar, Bytecash is meant to be valued at 1 USD in the market. If Bytecash trades at a premium or discount to 1 USD for an extended period of time, governance should intervene to push the market price of Bytecash back to its peg.

Since small oscillations of the price around the peg are to be expected, governance only needs to take action is there is a structural deviation from the peg that lasts for days or weeks. An upshot of this is that there is no need for the protocol to have a BYC/USD Oracle.


### Adjusting protocol parameters

The two primary tools governance has at its disposal to maintain the peg are Stability Fee and Savings Rate. Raising the Stability Fee makes it more expensive for borrowers to take out Bytecash loans, incentivising repayments and disincentivising the creation of new Bytecash. Similarly, a higher Savings Rate incentivises users to acquire Bytecash to lock it up in savings vaults, reducing the amount of Bytecash in circulation. Both measures put upwards pressure on the BYC price. Vice versa, governance can put downwards pressure on the BYC price by lowering the Stability Fee and/or Savings Rate.

In addition to Stability Fee and Savings Rate, governance is able to update a few dozen additional protocol parameters. Those additional parameters are not sensitive to market conditions, and are expected to rarely change, if ever. For example, M-of-N, the parameters that defines the minimum number of Announcer prices that must be included in an Oracle price update, typically only needs to be updated when a data provider is whitelisted or unwhitelisted. Other, parameters, for example those that define the auction format may never need to be changed, although changes in the liquidity for assets being auctioned offas well as the number of bidders regularly participating in auctions could make occasional tweaks beneficial.

## Governance process

Circuit protocol governance is conducted fully on-chain. Any CRT token holder can propose to change a protocol parameter by locking up CRT tokens with the governance puzzle, specifying the parameter to be changed and the proposed new value. For a proposal to be valid, the number of CRT locked up in this manner must exceed the **Proposal Threshold**.

![Governance timeline](./../../static/img/Governance_timeline_diagram.png)

Once proposal has been made, a **Veto Period** starts during which other CRT holders have the opportunity to veto the proposal. A veto needs to be backed by more CRT than the original proposal to be successful. If the proposal does not get vetoed, the new parameter value becomes effective once the **Implementation Delay** has passed.

## Secondary parameters

Given that parameters differ in terms of criticality and required update frequency, each parameter comes with a set of **secondary parameters** that impose limitations on how it can be updated:

* **Proposal Threshold**: minimum amount of CRT required to make a proposal
* **Veto Period**: time period (in seconds) during which a proposal can be vetoed
* **Implemenation Delay**: time (in seconds) that needs to pass before the new parameter value becomes effective after the end of the veto period
* **Maximum Delta**: the maximum absolute amount by which the parameter may change

Just like the parameters themselves, governance can update the secondary parameters too, subject to the same limitations.

:::info
Secondary parameters are an important safety measure, as they prevent sudden parameter changes.
:::

The Proposal Threshold protects the protocol against spam proposals.

A proposal can be blocked if within the Veto Period the proposal is vetoed by an amount of CRT larger than is backing the proposal. Once the Veto Period has passed without a successful veto, the protocol waits until the Implementation Delay period has passed before implementing ('enacting') the new parameter value (including any changes to the corresponding secondary parameters).

The Implementation Delay gives users time to withdraw their assets from the protocol in an orderly manner if they are unhappy with the changes made by the proposal. In particular, it protects users from a malicious governance takeover in which an attacker secretly accumulates a CRT stake large enough to make a proposal that cannot be vetoed. As governance takeovers are in general impossible to detect in advance, users of the protocol should keep in mind that a parameter may change to a value unacceptable to them after the Implementation Delay has passed. For example, a borrower may want to ensure that they can repay their loan within the Implementation Delay period for relevant parameters.

The Maximum Delta parameter is designed to give users assurances about the size of changes for parameters that need to have a relatively short Implementation Delay, e.g. to respond to changing market conditions. The parameters for which this is relevant are Stability Fee, Savings Rate, and Treasury Maximum. For other parameters Maximum Delta would typically be set to 0, allowing changes of any size.

## User considerations

Before interacting with the protocol, users should consider how they intend to use the protocol and whether the secondary parameters are set to values that allow them to exit their positions in a timely manner should a proposal get voted through that would change one or more parameters or secondary parameters to values unacceptable to the user.

:::warning
Protocol users should consider whether they are comfortable with the parameters and secondary parameters as set in Statutes, and whether changes to them may adversely affect them.
:::

For example, consider a user who borrows BYC at an 8% Stability Fee to invest in a fund that offers monthly redemptions. Assume the user expects the fund to deliver a return of 10% per annum in any given month. If the Stability Fee has a Veto Period and Implementation Delay of one week each, the borrower could not be certain what the SF is going to be in the last two weeks before they have an opportunity to redeem from the fund and repay their loan. Unless they have other sources of capital to repay the BYC loan after two weeks if governance changes the SF to 12% or more, they cannot protect themselves against their investment making a loss. If on the other hand the fund offered weekly redemptions, the borrower could always exit the fund and repay their BYC debt on time before the new SF is effective.



<!--
Do we need parameters-specific implementation delays, e.g. shorter delays for less critical variables and the SF, longer delays for critial variables?
MakerDAO uses one Governance Pause Delay for everything
In MakerDAO, votes get approved if simple majority of voters is in favour and a minimum of 10k MKR participated (or voted in favour?). Not quite that simple, it seems. There are different poll types. 
-->
