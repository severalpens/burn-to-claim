const ethers = require('ethers')
const privatekey = '0xa2e19e3c8580f31b13ad31fa1638a503bfc6771be57eb1952b3f9416ad07194a'
const provider = ethers.getDefaultProvider('rinkeby')

const wallet = new ethers.Wallet(privatekey, provider)

const erc20 = {
  name: "ERC20 Token",
  symbol: "ERC20",
  version: "1.0.0",
  addresses: {
    ropsten: "0xa796bB317fF4A1e988E147E0b5D3FC8dde0dE20a",
    kovan: "",
    rinkeby: "0xADe461b16FCe77B70158D6Ba334c2CecfC38D616",
    goerli: "",
    ganache7545: "",
    ganache8545: "",
  },
  abi: require("./json/erc20.json"),
};

const contract = new ethers.Contract(
  erc20.addresses.rinkeby,
  erc20.abi,
  wallet
);

const receiverWallet = '0x83f53D5327bdaa0eC946A0d1447EA8B71b680Ca9';

// We send 0.01 
const howMuchTokens = ethers.utils.parseUnits('0.001', 6)
async function init() {
  let result =  await contract.transfer((receiverWallet, howMuchTokens),overrides)
  console.log(`Sent ${ethers.utils.formatUnits(howMuchTokens, 6)} to this
        address ${receiverWallet}
        `)
}
init()
