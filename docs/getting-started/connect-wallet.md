---
id: connect-wallet
title: Connect wallet
sidebar_position: 7
---

import WCB from './../../static/img/Wallet_Connect_button.png';
import PendingTransaction from './../../static/img/waiting_for_tx_confirmation.png';
import SageResync from './../../static/img/sage_resync.png';


# Connect wallet

To get started with Circuit, click the Connect button in the top right corner of the [app](https://app.circuitdao.com)

In the pop-up that opens, select either [Sage](https://sagewallet.net) or [Goby](https://goby.app). Sage runs as a standalone app on all major desktop and mobile platforms. Goby is a browser extension available for Chrome and Brave. Click the Install link if Goby isn't installed yet.

### Sage

First, make sure that Sage is on the correct network. ```Settings -> Network -> Default Network``` should be set to ```mainnet```.

Sage knows the BYC asset ID. There is no need to register it manually.

When connecting, you need to either scan the QR code displayed or copy & paste the Wallet Connect URI string to Sage ```Settings -> General -> WalletConnect```.

It is recommended to use a fresh wallet to prevent issues with coins in addresses that have a large derivation index. To prevent the wallet from creating new addresses, set the first wallet address as the change address:

Copy the address with derivation index 0 shown under ```Addresses```. Make sure the hardened address toggle is off. Paste the address to ```Settings -> Wallet -> Change Address```.

The app imports the wallet, and you are good to go ahead and use Circuit protocol!

:::info

If Sage doesn't show expected balances, it's likely a syncing issue.

Resync the wallet under ```Settings -> Wallet -> Resync``` and activate the ```Delete coin data``` and ```Delete all cached data``` toggles.

<img src={SageResync}
     alt="Sage Resync Settings"
     style={{width: 500}}/>

:::

### Goby

When connecting, Goby will ask you to switch to Chia mainnet if you are connected to another network. It will also automatically register the BYC asset ID for you.

If the automatic process fails, you can manually switch to mainnet by clicking on the settings cog wheel in the top right of the extension ```-> Advanced Options -> Networks -> Mainnet```.

To manually register BYC, click on ```Import Tokens -> Custom```, and add the [BYC asset ID](../#bytecash-asset-id)

You are now connected, and can interact with Circuit protocol!

### Other wallets

Other wallets are not supported yet. This includes the official [Chia reference wallet](https://www.chia.net/downloads).

## Next steps

Once you have connected your wallet, you can either [borrow Bytecash](./borrow-bytecash), or start [earning yield](./earn-yield).

Note that you can only perform one operation per block via the app. If there is a pending transaction, a corresponding message gets displayed near the top right of the webpage. You need to wait for the pending transaction to get confirmed before performing another operation.

<img src={PendingTransaction}
     alt="Pending transaction"
     style={{width: 300}}/>
