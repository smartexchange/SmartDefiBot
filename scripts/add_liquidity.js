const Factory = artifacts.require('Factory.sol');
const Router = artifacts.require('Router.sol');
const Pair = artifacts.require('Pair.sol');
const Erc20 = artifacts.require('Erc20.sol');
const Weth = artifacts.require('Weth.sol');
var Web3 = require('web3');

module.exports = async done => {
  try {
    const [admin, _] = await web3.eth.getAccounts();
    const wbnbAmount = web3.utils.toWei('0.1'); // input token 1
    console.log(`wbnb input : ${web3.utils.fromWei(wbnbAmount).toString()}`);
    const factory = await Factory.at('0x8b7E2ea8fEbE8cDbAcfC4CD4Df88bA8E141A794B');
    const router = await Router.at('0x8445ecf043C46fd936f44d1e38AC47C5D99875Ac');
    const wbnb = await Erc20.at('0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd');// WBNB
    const cake = await Erc20.at('0x7bee134a9836f9cEf8C84db6192c46bd8E163Bdb');// cake
    const pairAddress = await factory.getPair(wbnb.address,cake.address);
    const bnbcakepair = await Pair.at(pairAddress)
    const reseveration = await bnbcakepair.getReserves()
    const swaprate = reseveration[0].div(reseveration[1]) ;
    console.log(`liquidity rate : ${swaprate.toString()}`);
    const cakeamount = web3.utils.toBN(wbnbAmount).mul( swaprate);
    console.log(`token needed : ${web3.utils.fromWei(cakeamount).toString()}`);
    const wbnbmin = web3.utils.toBN(wbnbAmount).mul(web3.utils.toBN(90)).div(web3.utils.toBN(100));
    const cakemin = web3.utils.toBN(cakeamount).mul(web3.utils.toBN(90)).div(web3.utils.toBN(100));
    await wbnb.approve(router.address, wbnbAmount);
    await cake.approve(router.address, cakeamount); 
    await router.addLiquidity(
        wbnb.address,
        cake.address,
        wbnbAmount,
        cakeamount,
        wbnbmin,
        cakemin,
      admin,
      Math.floor(Date.now() / 1000) + 60 * 10
    );
  
    const balance = await bnbcakepair.balanceOf(admin); 
    console.log(`balance LP: ${balance.toString()}`);
    } catch(e) {
      console.log(e);
    }
  done();
};