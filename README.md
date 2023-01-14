# Evmos Covalent #OneMillionWallets Hackathon

<h1 align="center">
   <b>
        <a href="https://www.eddalytics.xyz/"><img src="https://github.com/SabeloMkhwanzi/evmos-defi-dashlytics/blob/main/public/eddalytics-logo4.png" /></a><br>
    </b>
</h1>


<p align="center">
    <a href="https://eddalytics.vercel.app/"><b>Website</b></a> •
    <a href="https://github.com/SabeloMkhwanzi/evmos-defi-dashlytics/blob/main/README.md"><b>Documentation</b></a>
</p> 

# EddAlytics - Evmos Dex Dashboard Analytics

Providing a visual analytics front-end with rich information about the health and performance of Dex on Evmos ecosystem - Powered by Evmos x Covalent. 

### Intro
- Web3 has changed the way we can interact with money by introducing decentralized finance (DEFI). Decentralized finance provides users with a range of financial services similar to traditional financial industries such as banking, loaning, insurance, and trading without the need to rely on centralized entities. DEX (decentralized exchange) is one of the popular financial services emerging on the web3 ecosystem, a DEX is an exchange where users trade directly from their own wallets, where you can pay money from one currency to buy money for another.  

- DEX uses Automated Market Makers (AMMs), that allows users to swap tokens on DEX, by paying money from one currency to buy money for another eg. using US dollars stable coin (USDC) to buy Ethereum tokens (ETH). AMMs are protocols for DEXs that help give you the price between these two assets when you swap tokens. AMMs usually rely on a mathematical formula to price assets. Currently, there are different formulas that AMMs use however, the most fundamental and most well-known formula is the XY=K equation. XY=K is an equation you use for determining how much of one token, called X, is needed to swap for another token, called Y, in any DEX.

### Project mission 
- For the success of a DEX protocol, running on an XY=K engine, a visual analytics front-end dashboard is needed to provide users with rich information about the health and performance of that ecosystem. Emvos is a fast growing ecosystem with a decentralized exchange built in the ecosystem, thus we approach to solve the problem by providing  [EddAlytics](https://eddalytics.vercel.app/) - Evmos Dex Dashboard Analytics.

### Project Solution 
- Introducing [Covalent](https://www.covalenthq.com/), they built XY=K: the suite of Class B, generalized UniswapV2-like endpoints in their unified API for exchange on various blockchains. They introduced these endpoints to provide you with the richest and most robust on-chain DEX data and allow you to retrieve all the required data for any UniswapV2-like protocol such as SpiritSwap and SushiSwap on a variety of blockchains by simply providing the name of the exchange and the correct chainID for the blockchain. As a result, these endpoints enable you to access any DEX-related protocol in a matter of minutes - Awesome right! 😊

### Project Stack
- Building Framework: [Nextjs](https://nextjs.org/) -Next.js is an open-source web development framework created by Vercel enabling React-based web applications with server-side rendering and generating static websites
- Frontend: 
  - [1. Mantine](https://mantine.dev/) - Build fully functional accessible web applications faster than ever
  - [2. Chakra-ui](https://chakra-ui.com/) - Create accessible React apps with speed
- [React-Query](https://react-query-v3.tanstack.com/) - Fetch, cache and update data in your React and React Native applications all without touching any "global state".
- [Recharts](https://recharts.org/en-US/) - A composable charting library built on React components

- Backend [Covalent](https://www.covalenthq.com/) - One unified API, One billion possibilities, Covalent provides a unified API bringing visibility to billions of Web3 data points.
- Unstoppable domain to login users: [Unstoppable domain](https://docs.unstoppabledomains.com/) - Login with Unstoppable build a universal Web3 login that authenticates your users.
- Hosting Platform: [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

##### Diffusion HomePage
![Diffusion HomePage](https://github.com/SabeloMkhwanzi/eddalytics/blob/main/public/Addlytics%20update1.png)

##### Diffusion Analytics
![Diffusion Analytics](https://github.com/SabeloMkhwanzi/eddalytics/blob/main/public/Diffusion%20Dex%20%202022-12-03%20.jpg)


## Roadmap for the Project
- [ ] Add more DEX protocol on Evmos mainnet
- [ ] Add wallet portfolio page to display users assest
- [ ] Add filter button on the chart to filter between 7 day - 30 days
- [ ] As the Project scales with usage - contact [Covalent](https://www.covalenthq.com/) for updates to increase rate Limits
- [ ] Fully mobile reponsive
- [ ] Adding more customizable components   

## Table of Contents
- [Installing](#installing)
- [How it Build](#how-it-Build)
  - [Get information about chain statuse and blocked Signeds](#Get-information-about-chain-statuse-and-blocked-Signed)
  - [Get 30d volume and liquidity as a timeseries chart](#Get-30d-volume-and-liquidity-as-a-timeseries-chart)
  - [Get Top tokens by price volume liquidity](#Get-Top-tokens-by-price-volume-liquidity)
  - [Get Top pools by price volume liquidity](#Get-Top-pools-by-price-volume-liquidity)
  - [Get transactions for account address](#Get-transactions-for-account-address)

## Installing

1. clone the repo with the following git command:

```bash
git clone https://github.com/SabeloMkhwanzi/eddalytics
```

2. open a terminal in the root directory of the project and run:

```bash
npm install
```

to install all the package dependencies for the project

Create a .env.local file in the root folder and populate it with the following variables, Get Api a key from [Covalent](https://www.covalenthq.com/)

```bash
NEXT_PUBLIC_COVALENTKEY=
NEXT_PUBLIC_UNSTOPPABLEDOMAIN_CLIENT_ID=
```


Finally, run the development server:

```bash
npm run dev
```

## How to use 

### Get information about chain statuse and blocked Signed

API method `GET/v1/chains/status/` can be used to get information about chain statuse and blocked Signed at.
 - note: `const chainStatus = data?.data?.items[25].synced_block_height` at `[25]` we the get the chain id of Evmos in array of objects 😊

```js
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function ChainStatus() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["chainStatus"], async () => {
    const res = await fetch(
      `https://api.covalenthq.com/v1/chains/status/?key=${APIKey}`
    );
    return res.json();
  });
  const chainStatus = data?.data?.items[25].synced_block_height;
  const blockedSignedAt = data?.data?.items[25].synced_blocked_signed_at;
  
     if (isFetching)
    return "Loading..."

  if (error) "error + messaage"
    
}


```

### Get 30d volume and liquidity as a timeseries chart

API XY=K method `/v1/9001/xy=k/cronus/ecosystem/?&key=${APIKey}`can be used to get information on volume 7-30 days & liquidity 7-30 days
- notes: we simply provide the name of the exchange `/cronus/` and the correct chainID (9001 = Evmos_mainnet) `/9001/` for the blockchain. Lastly your Api key from [Covalent](https://www.covalenthq.com/) you provided on .env.local as a variables `/?&key=${APIKey}` , as a result, these endpoints enable you to access any DEX-related protocol in a matter of minutes, cool hey 😊

```js
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function CronusOverview() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["cronusEco"], async () => {
    const res = await fetch(
      `https://api.covalenthq.com/v1/9001/xy=k/cronus/ecosystem/?&key=${APIKey}`
    );
    return res.json();
  });

  // Chart data for Evmos liquidity_chart_30d
  const CronusLiquidity = data?.data?.items[0].liquidity_chart_30d.map(
    (item) => ({
      X: moment(item.dt).format("MMM Do"),
      Y: item.liquidity_quote,
    })
  );

// Chart data for Evmos volume_chart_30d
  const CronusVolume = data?.data?.items[0].volume_chart_30d.map((item) => ({
    X: moment(item.dt).format("MMM Do"),
    Y: item.volume_quote,
  }));
  
   if (isFetching)
    return "Loading..."

  if (error) "error + messaage"
     
  }
```

### Get Top tokens by price volume liquidity

API XY=K method `/9001/xy=k/diffusion/tokens` can be used to get information on tokens by price, volume, liquidity, 
- notes: we simply provide the name of the exchange `/diffusion/` and the correct chainID (9001 = Evmos_mainnet) `/9001/` for the blockchain. Lastly your Api key from [Covalent](https://www.covalenthq.com/) you provided on .env.local as a variables `/?&key=${APIKey}` ,as a result, these endpoints enable you to access any DEX-related protocol in a matter of minutes, Amazing right😊

```js
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function CronusTokens() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["diffusionTokens"], async () => {
    const res = await fetch(
      `https://api.covalenthq.com/v1/9001/xy=k/diffusion/tokens/?key=${APIKey}`
    );
    return res.json();
  });

  const items2 = data?.data?.items;
  
    if (isFetching)
    return "Loading..."

  if (error) "error + messaage"
   
}
```

### Get Top pools by price volume liquidity

API method `/9001/xy=k/evmoswap/pools` can be used to get information on tokens by price, volume, liquidity, 
- notes: we simply provide the name of the exchange `/evmoswap/` and the correct chainID (9001 = Evmos_mainnet) `/9001/` for the blockchain. Lastly your Api key from [Covalent](https://www.covalenthq.com/) you provided on .env.local as a variables `/?&key=${APIKey}` ,as a result, these endpoints enable you to access any DEX-related protocol in a matter of minutes, Super great!😊

```js
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function EvmoswapPools() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(["evmoswapPools"], async () => {
    const res = await fetch(
      `https://api.covalenthq.com/v1/9001/xy=k/evmoswap/pools/?key=${APIKey}`
    );
    return res.json();
  });

  const items = data?.data?.items;
  
 if (isFetching)
    return "Loading..."

  if (error) "error + messaage"
     
);
}
```

### Get transactions for account address

API XY=K method `/v1/9001/xy=k/evmoswap/tokens/address/0x181c262b973b22c307c646a67f64b76410d19b6b/transactions/` can be used to get transactions information on account address, which also includes these type of transactions eg. SWAP, ADD LIQUIDITY, REMOVE LIQUIDITY. 
- notes: we simply provide the name of the exchange `/evmoswap/` and the correct chainID (9001 = Evmos_mainnet) `/9001/` for the blockchain, and you will note that here we have account, an address, which represents evmoswap address - which will help us get all the transactions on this address. Lastly your Api key from [Covalent](https://www.covalenthq.com/) you provided on .env.local as a variables `/?&key=${APIKey}` ,as a result, these endpoints enable you to access any DEX-related protocol in a matter of minutes, Nice!😊
- Development TIP! 💁‍♂️: when mapping through the data it comes in a decending list of array from old to new (old information on top of list and new information on the bottom), suggest you Use `map()` on an Array in Reverse Order in JS :
```js
const arr = ['a', 'b', 'c'];

const mapReverse1 = arr
  .slice(0)
  .reverse()
  .map(element => {
    return element;
  });

console.log(mapReverse1); // 👉️ ['c', 'b', 'a']

```


```js
const APIKey = process.env.NEXT_PUBLIC_COVALENTKEY;

export default function EvmoswapTransactions() {
  // used React-Query to fetch Covalent API
  const { data, error, isFetching } = useQuery(
    ["evmoswapTransactions"],
    async () => {
      const res = await fetch(
        `https://api.covalenthq.com/v1/9001/xy=k/evmoswap/tokens/address/0x181c262b973b22c307c646a67f64b76410d19b6b/transactions/?key=${APIKey}`
      );
      return res.json();
    }
  );

  const items = data?.data?.items;
  
   if (isFetching)
    return "Loading..."

  if (error) "error + messaage"
     
}
```

#### GitHub Repository: https://github.com/SabeloMkhwanzi/eddalytics

#### Demo video: [video](https://youtu.be/2uNcdUntzZA)

#### Project Start: Date: Nov 07, 2022 - Dec 4, 2022

Happy Hacking 😊
