---
id: connect-wallet
title: Connect wallet
sidebar_position: 7
---

import WCB from './../../static/img/Wallet_Connect_button.png';
import PendingTransaction from './../../static/img/Pending_transaction.png';


# Connect wallet

To get started with Circuit, click the Connect button in the top right corner of the [app](https://app.circuitdao.com)

In the pop-up that opens, select [Goby](https://goby.app) to use Goby wallet. Goby is a browser extension available for Chrome and Brave. Click the Install link if Goby isn't installed yet.

:::info

Circuit is currently on testnet11. You can get Testnet XCH (TXCH) from the [official faucet](https://testnet11-faucet.chia.net).

:::

### Goby

When connecting, Goby will ask you to switch to testnet11 if you are connected to another network, and it will also automatically register the BYC asset ID for you.

If for some reason the automatic process fails, you can manually switch to testnet11 by clicking on the settings cog wheel in the top right of the extension ```-> Advanced Options -> Networks -> Testnet11```.

To manually register BYC with Goby, click on ```Import Tokens -> Custom```, and enter latest BYC symbol and asset ID as published in the [FAQ](https://docs.circuitdao.com/faq#what-is-bytecash).

Congrats - you are now connected, and can interact with Circuit protocol!

### Other wallets

Other wallets are not supported yet. This in cludes the official [Chia reference wallet](https://www.chia.net/downloads).

## Next steps

Once you have connected your wallet, you can either [borrow Bytecash](./borrow-bytecash), or start [earning yield](./earn-yield).

Note that you can only perform one operation per block via the app. If there is a pending transaction, a red box will be displayed near the top right of the webpage. You need to wait for the pending transaction to get confirmed before performing another operation.


<img src={PendingTransaction}
     alt="Pending transaction"
     style={{width: 300}}/>


