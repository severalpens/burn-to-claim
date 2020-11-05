var chai = require('chai');
var expect  = chai.expect;
var use = chai.use;
var ethers = require('ethers');
var Contract = ethers.Contract;
var BasicToken = require('../build/BasicToken.json');
var btc = require('../build/BurnToClaim.json');
var waffle = require('ethereum-waffle');
var deployContract = waffle.deployContract;
var MockProvider = waffle.MockProvider;
var solidity = waffle.solidity;

usePlugin("@nomiclabs/buidler-waffle");

use(solidity); //npm run btc


describe('Burn-to-claim', () => {
    const [wallet, walletTo] = new MockProvider().getWallets();
    let token;

    beforeEach(async () => {
        token = await deployContract(wallet, BasicToken, [1000]);
        btcInstance = await deployContract(wallet, btc);
      });

      it('Initial balance of token contract', async () => {
        expect(await token.balanceOf(wallet.address)).to.equal(1000);
      });

      
      

})

/* // insialTransfer();

// function to transfer initialBalances to alice
async function insialTransfer() {
    let provider = ethers.getDefaultProvider("ropsten");
    let adminWallet = new ethers.Wallet(admin.privateKey, provider);
  
    let initialBalance = 10;
  
    let erc20Instance = new ethers.Contract(
      erc20.addresses.ropsten,
      erc20.abi,
      adminWallet
    );
  
    // to alice address
    await erc20Instance.transfer(
      alice.address,
      initialBalance
    )
      .then((tx) => {
        console.log(tx);
        tx.wait()
          .then((tx2) => {
            console.log(tx2);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error2) => {
        console.log(error2);
      }); */