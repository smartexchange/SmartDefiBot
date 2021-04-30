# SmartDefiBot

this is clone of EatTheBlocks's tutorial  
(https://www.youtube.com/watch?v=QgBweHjhh1g)
the modified code for pancakeswap exchange

## How to run Run 
* 1. update mnemonic of your wallet in truffle-config.js

const mnemonic = "";

* 2. install dependencies

npm install
truffle compile

* 3. update token pair you want to trade in scripts\trade.js

const ROUTER_ADDRESS = '0x8445ecf043C46fd936f44d1e38AC47C5D99875Ac';
const WETH_ADDRESS = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
const CAKE_ADDRESS ='0x7bee134a9836f9cEf8C84db6192c46bd8E163Bdb';
const amountIn = web3.utils.toWei('0.1');

* 4. run the script ( use right path if on linux/mac)

truffle exec scripts\trade.js --network testnet