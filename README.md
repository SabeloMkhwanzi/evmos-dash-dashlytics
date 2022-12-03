<h1 align="center">
   <b>
        <a href="https://eddalytics.vercel.app/"><img src="https://github.com/SabeloMkhwanzi/evmos-defi-dashlytics/blob/main/public/eddalytics-logo4.png" /></a><br>
    </b>
</h1>


<p align="center">
    <a href="https://eddalytics.vercel.app/"><b>Website</b></a> •
    <a href="https://github.com/SabeloMkhwanzi/evmos-defi-dashlytics/blob/main/README.md"><b>Documentation</b></a>
</p> 

# EddAlytics - Evmos Dex Dashboard Analytics

Provides visual analytics front-end with rich information about the health and performance of Dex on Evmos ecosystem - Powered by Evmos x Covalent. 

## Intro
- Web3 has changed the way we can interact with money by introducing Decentralized finance (DEFI). Decentralized finance provides users with a range of financial services similar to traditional financial industries such as banking, borrowing, insurance, and trading without the need to rely on centralized entities. (DEX) decentralized exchange is one of the popular financial services emerging on the web3 ecosystem, a DEX is an exchange where users trade directly from their own wallets, where you can pay money from one currency to buy money for another.  

- DEX uses Automated Market Makers (AMMs), that allows users to swap tokens on DEX, by paying money from one currency to buy money for another eg. using US dollars stable coin (USDC) to buy Ethereum tokens (ETH). AMMs are protocols for DEXs that help give you the price between these two assets when you swap tokens. AMMs usually rely on a mathematical formula to price assets. Currently, there are different formulas that AMMs use. However, the most fundamental and most well-known formula is the XY=K equation. XY=K is an equation you use for determining how much of one token, called X, is needed to swap for another token, called Y, in any DEX.

## Project mission 
- For any (DEX) decentralized exchange protocol runing on XY=K engine to be successful, it needs a visual analytics front-end dashboard to provide users with rich information about the health and performance of that ecosystem. Emvos is a fast growing ecosystem with (DEX) decentralized exchange built on the ecosystem, thus we approach to solve the problem by providing  [EddAlytics](https://eddalytics.vercel.app/) - Evmos Dex Dashboard Analytics.

## Project Solution 
- Introducing [Covalent](https://www.covalenthq.com/), they built XY=K: the suite of Class B, generalized UniswapV2-like endpoints in their unified API for exchange on various blockchains. They introduced these endpoints to provide you with the richest and most robust on-chain DEX data and allow you to retrieve all the required data for any UniswapV2-like protocol (such as SpiritSwap and SushiSwap) on a variety of blockchains, simply by providing the name of the exchange and the correct chainID for the blockchain. As a result, these endpoints enable you to access any DEX-related protocol in a matter of minutes - Awesome right! 😊

### Project Stack



## Table of Contents

- [Installing](#installing)
- [How to use](#how-to-use)
  - [1. Initialize SDK instance](#1-initialize-sdk-instance)
  - [2. Get the list of supported tokens](#2-get-the-list-of-supported-tokens)
  - [3.1 Approve the transfer of tokens](#31-approve-the-transfer-of-tokens)
  - [3.2 Send Tokens](#32-send-tokens)
  - [Full example](#full-example)
- [Other operations](#other-operations)
  - [Transaction builder](#transaction-builder)
    - [Approve Transaction](#approve-transaction)
    - [Send Transaction](#send-transaction)
      - [Solana Blockchain](#solana-blockchain)
  - [Get information about sent transaction](#get-information-about-sent-transaction)
  - [Calculating amount of tokens to be received after fee](#calculating-amount-of-tokens-to-be-received-after-fee)
  - [Calculating amount of tokens to send](#calculating-amount-of-tokens-to-send)
  - [Getting the amount of gas fee](#getting-the-amount-of-gas-fee)
  - [Getting the average transfer time](#getting-the-average-transfer-time)
- [Semver](#semver)

## Installing

```bash
$ npm install @allbridge/bridge-core-sdk
```

## How to use

### 1. Initialize SDK instance

```js
const AllbridgeCoreSdk = require('@allbridge/allbridge-core-sdk');
const sdk = new AllbridgeCoreSdk();
```

### 2. Get the list of supported tokens

```js
const supportedChains = await sdk.chainDetailsMap();
// extract information about ETH chain
const {bridgeAddress, tokens, chainId, name} = supportedChains[ChainSymbol.ETH];
// Choose one of the tokens supported on ETH
const usdtOnEthTokenInfo = tokens.find(tokenInfo => tokenInfo.symbol === 'USDT');
```

### 3.1 Approve the transfer of tokens

Before sending tokens the bridge has to be authorized to use user's tokens. This is done by calling the `approve` method
on SDK instance.

```js
const response = await sdk.approve(web3, {
  tokenAddress: tokenAddress,
  owner: senderAddress,
  spender: poolAddress,
});
```

**TIP:** To interact with the **Tron** blockchain: </br>
use ```tronWeb``` instead of ```web3```

### 3.2 Send Tokens

Initiate the transfer of tokens with `send` method on SDK instance.

```js
await sdk.send(web3, {
  amount: '1.01',
  fromAccountAddress: senderAddress,
  sourceChainToken: usdtOnEthTokenInfo,
  toAccountAddress: recipientAddress,
  destinationChainToken: usdtOnTrxTokenInfo,
  messenger: Messenger.ALLBRIDGE,
});
```

**TIP:** To interact with the **Tron** blockchain: </br>
use ```tronWeb``` instead of ```web3```

### Full example

Swap BUSD on BSC chain to USDT on TRX chain

```js
const {
  AllbridgeCoreSdk,
  ChainSymbol,
  Messenger,
} = require("@allbridge/bridge-core-sdk");
const Web3 = require("web3");
require("dotenv").config();

async function runExample() {
  // sender address
  const fromAddress = '0x01234567890abcdef01234567890abcdef012345';
  // recipient address
  const toAddress = 'AbcDefGHIJklmNoPQRStuvwXyz1aBcDefG';

  // configure web3
  const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
  const account = web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY);
  web3.eth.accounts.wallet.add(account);

  const sdk = new AllbridgeCoreSdk();

  // fetch information about supported chains
  const chains = await sdk.chainDetailsMap();

  const bscChain = chains[ChainSymbol.BSC];
  const busdTokenInfo = bscChain.tokens.find(tokenInfo => tokenInfo.symbol === 'BUSD');

  const trxChain = chains[ChainSymbol.TRX];
  const usdtTokenInfo = trxChain.tokens.find(tokenInfo => tokenInfo.symbol === 'USDT');

  // authorize a transfer of tokens from sender's address
  await sdk.approve(web3, {
    tokenAddress: busdTokenInfo.tokenAddress,
    owner: fromAddress,
    spender: busdTokenInfo.poolAddress,
  });

  // initiate transfer
  const response = await sdk.send(web3, {
    amount: "1.01",
    fromAccountAddress: fromAddress,
    toAccountAddress: toAddress,
    sourceChainToken: busdTokenInfo,
    destinationChainToken: usdtTokenInfo,
    messenger: Messenger.ALLBRIDGE,
  });
  console.log("Tokens sent:", response.txId);
}

runExample();
```

***TIP:***
For more details, see [***Examples***](https://github.com/allbridge-io/allbridge-core-js-sdk/tree/main/examples)

## Other operations

### Transaction builder

#### Approve Transaction

SDK method `rawTransactionBuilder.approve` can be used to create approve Transaction.

```js
const rawTransactionApprove = await sdk.rawTransactionBuilder.approve(web3, approveData);
```

**TIP:** To interact with the **Tron** blockchain: </br>
use ```tronWeb``` instead of ```web3```

#### Send Transaction

SDK method `rawTransactionBuilder.send` can be used to create send Transaction.

```js
const rawTransactionSend = await sdk.rawTransactionBuilder.send(sendParams, web3);
```

**TIP:** </br>
To interact with the **Tron** blockchain: </br>
use ```tronWeb``` instead of ```web3``` </p>

##### Solana Blockchain

To create send transaction on **Solana** blockchain: </br>

```js
const { transaction, signer } = await sdk.rawTransactionBuilder.send(sendParams);
```

***TIP:***
For more details, see [***Example***](https://github.com/allbridge-io/allbridge-core-js-sdk/blob/main/examples/solana/sol-build-tx.js)

### Get information about sent transaction

SDK method `getTransferStatus` can be used to get information about tokens transfer.

```js
const transferStatus = await sdk.getTransferStatus(chainSymbol, txId);
```

### Calculating amount of tokens to be received after fee

SDK method `getAmountToBeReceived` can be used to calculate the amount of tokens the receiving party will get after
applying the bridging fee.

```js
const amountToBeReceived = await sdk.getAmountToBeReceived(
  amountToSend,
  sourceTokenInfo,
  destinationTokenInfo
);
```

### Calculating amount of tokens to send

SDK method `getAmountToSend` can be used to calculate the amount of tokens to send based on the required amount of
tokens the receiving party should get.

```js
const amountToSend = await sdk.getAmountToSend(
  amountToBeReceived,
  sourceTokenInfo,
  destinationTokenInfo
);
```

### Getting the amount of gas fee

SDK method `getTxCost` can be used to fetch information about the amount of gas fee required to complete the transfer on
the destination chain. Gas fee is paid during the [send](#32-send-tokens) operation in the source chain currency.

```js
const weiValue = await sdk.getTxCost(
  usdtOnEthTokenInfo, // from ETH
  usdtOnTrxTokenInfo, // to TRX
  Messenger.ALLBRIDGE
);
```

### Getting the average transfer time

SDK method `getAverageTransferTime` can be used to get the average time in ms it takes to complete a transfer for a
given combination of tokens and messenger.

```js
const transferTimeMs = sdk.getAverageTransferTime(
  sourceTokenInfo,
  destinationTokenInfo,
  Messenger.ALLBRIDGE
);
```

## Semver

Until bridge-core-sdk reaches a `1.0.0` release, breaking changes will be released with a new minor version. For
example `0.3.1`, and `0.3.4` will have the same API, but `0.4.0` will have breaking changes.



# Evmos Dex Dashborad Analytics
