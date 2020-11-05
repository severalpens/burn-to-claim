var ethers = require('ethers');
const { Wallet } = require('ethers');

// node BurnToClaim_test.js

var admin = {
  address: "0xFE31acc342899Aa4Ec470b121a9EDe1e1736ca76",
  privateKey:
    "0xa2e19e3c8580f31b13ad31fa1638a503bfc6771be57eb1952b3f9416ad07194a",
};

var alice = {
  address: "0x83f53D5327bdaa0eC946A0d1447EA8B71b680Ca9",
  privateKey:
    "0xdecf82d77bda6d90cb0b56c2f03d942c784bc30c9ec4a78271d3be673d35d077",
};

var bob = {
  address: "0xd627a8B6dbEA4C24a2a4D34E367C27E8019533BA",
  privateKey:
    "ab4c632b201914ffbd8a53560aebb9206009bb7d1a73930f43bf96caf24d9e10",
};

var burnToClaimContract = {
  name: "burnToClaim",
  symbol: "BTC",
  version: "1.0.0",
  addresses: {
    ropsten: "0x8c6492eEBfa12080E8D0Ef47dCc91f733Dd72056",
    //   kovan: "",
    //  rinkeby: "",
    //  goerli: "",
    ganache7545: "",
    ganache8545: "",
  },
  abi: require("./json/burnToClaim_ABI.json"),
};

var griffithTokenContract = {
  name: "Griffith Token",
  symbol: "GT",
  version: "1.0.0",
  addresses: {
    ropsten: "0xddd8baa36bf04ee5558450775b7d42528740137d",
    //  kovan: "",
    //  rinkeby: "",
    //  goerli: "",
    ganache7545: "",
    ganache8545: "",
  },
  abi: require("./json/griffithToken_ABI.json"),
};

let provider = ethers.getDefaultProvider('ropsten');

const adminWallet = new ethers.Wallet(admin.privateKey, provider)
const aliceWallet = new ethers.Wallet(alice.privateKey, provider)
const bobWallet = new ethers.Wallet(bob.privateKey, provider)

async function checkBalance() {

  let erc20Instance = new ethers.Contract(
    griffithTokenContract.addresses.ropsten,
    griffithTokenContract.abi,
    adminWallet
  );

  const adminBal_ERC = await erc20Instance.balanceOf(adminWallet.address)
  const aliceBal_ERC = await erc20Instance.balanceOf(aliceWallet.address)
  const bobBal_ERC = await erc20Instance.balanceOf(bobWallet.address)

  console.log("Token Balance @ ERC: Admin-" + _format(adminBal_ERC),
    "Alice-" + _format(aliceBal_ERC),
    "Bob-" + _format(bobBal_ERC));

  let btcInstance = new ethers.Contract(
    burnToClaimContract.addresses.ropsten,
    burnToClaimContract.abi,
    adminWallet);

  const adminBal_BTC = await btcInstance.balanceOf(adminWallet.address)
  const aliceBal_BTC = await btcInstance.balanceOf(aliceWallet.address)
  const bobBal_BTC = await btcInstance.balanceOf(bobWallet.address)

  console.log("Token Balance @ BTC: Admin-" + _format(adminBal_BTC),
    "Alice-" + _format(aliceBal_BTC),
    "Bob-" + _format(bobBal_BTC));



  //helper
  function _format(_bal) {
    const x = ethers.utils.formatUnits(_bal, 18)
    return x;
  }

}

checkBalance();