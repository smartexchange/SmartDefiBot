  
const Router = artifacts.require('Router.sol');
const Weth = artifacts.require('Weth.sol');
const Erc20 = artifacts.require('Erc20.sol');

const ROUTER_ADDRESS = '0x8445ecf043C46fd936f44d1e38AC47C5D99875Ac';
const WETH_ADDRESS = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
const CAKE_ADDRESS ='0x7bee134a9836f9cEf8C84db6192c46bd8E163Bdb';
const amountIn = web3.utils.toWei('0.1');

module.exports = async done => {
  try {
    const [admin, _] = await web3.eth.getAccounts();
    const router = await Router.at(ROUTER_ADDRESS);
    const weth = await Weth.at(WETH_ADDRESS);
  
    const cake = await Erc20.at(CAKE_ADDRESS);

    await weth.deposit({value: amountIn})  // convert BNB to WBNB
    await weth.approve(router.address, amountIn); // approve Router 
    // get amount out of Cake with WBNB IN
    const amountsOut = await router.getAmountsOut(amountIn, [WETH_ADDRESS, CAKE_ADDRESS]);
    const amountOutMin = amountsOut[1]
        .mul(web3.utils.toBN(90))
        .div(web3.utils.toBN(100));
    const balanceDaiBefore = await cake.balanceOf(admin);

    await router.swapExactTokensForTokens(
      amountIn, 
      amountOutMin,
      [WETH_ADDRESS, CAKE_ADDRESS],
      admin,
      Math.floor((Date.now() / 1000)) + 60 * 10
    );

    const balanceErcAfter = await cake.balanceOf(admin);
    const executionPerf = balanceErcAfter.sub(balanceDaiBefore).div(amountsOut[1]);
    console.log(executionPerf.toString());
  } catch(e) {
    console.log(e);
  }
  done();
};