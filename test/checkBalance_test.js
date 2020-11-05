const ethers = require('ethers')
// node checkBalance_test.js
const privatekey = '0xa2e19e3c8580f31b13ad31fa1638a503bfc6771be57eb1952b3f9416ad07194a'
const provider1 = ethers.getDefaultProvider('ropsten')
const provider2 = ethers.getDefaultProvider('rinkeby')

const erc20 = {
  name: "ERC20 Token",
  symbol: "ERC20",
  version: "1.0.0",
  addresses: {
    ropsten: "0xe33F7eea823ACEcb4CD6A289e93Aca762B28Ba21",
    kovan: "",
    rinkeby: "0x87414D070508d38b450C5e03C2237d6475F685F5",
    goerli: "",
    ganache7545: "",
    ganache8545: "",
  },
  abi: require("./json/erc20.json"),
};

const getBalanceRopsten = async (_wallet, _adddress) => {
  const contract = new ethers.Contract(
    erc20.addresses.ropsten,
    erc20.abi,
    _wallet
  );
  const balance = await contract.balanceOf(_adddress)
  return balance;
}

const getBalanceRinkeby = async (_wallet, _adddress) => {
  const contract = new ethers.Contract(
    erc20.addresses.rinkeby,
    erc20.abi,
    _wallet
  );
  const balance = await contract.balanceOf(_adddress)
  return balance;
}
async function init() {

  let admin = "0xFE31acc342899Aa4Ec470b121a9EDe1e1736ca76";
  let alice = "0x83f53D5327bdaa0eC946A0d1447EA8B71b680Ca9";
  let bob = "0xd627a8B6dbEA4C24a2a4D34E367C27E8019533BA";

  const _wallet1 = new ethers.Wallet(privatekey, provider1)

   const bal1 = await getBalanceRopsten(_wallet1, admin)
  const bal2 = await getBalanceRopsten(_wallet1, alice)
  const bal3 = await getBalanceRopsten(_wallet1, bob)
  console.log('Balance on ropsten network - ' + 
  '\n Admin:-', ethers.utils.formatUnits(bal1, 6) + ' - ' + admin, 
  '\n Alice:-', ethers.utils.formatUnits(bal2, 6) + ' - ' + alice,
  '\n Bob:-  ', ethers.utils.formatUnits(bal3, 6) + ' - ' + bob)
 
   const _wallet2 = new ethers.Wallet(privatekey, provider2)
  const bal4 = await getBalanceRinkeby(_wallet2, admin)
  const bal5 = await getBalanceRinkeby(_wallet2, alice)
  const bal6 = await getBalanceRinkeby(_wallet2, bob)
  console.log('Balance on rinkeyby network - ' + 
  '\n Admin:-', ethers.utils.formatUnits(bal4, 6) + ' - ' + admin, 
  '\n Alice:-', ethers.utils.formatUnits(bal5, 6) + ' - ' + alice,
  '\n Bob:-  ', ethers.utils.formatUnits(bal6, 6) + ' - ' + bob) 
 
}


init()
