var ethers = require('ethers');

// node test.js
let provider = ethers.getDefaultProvider('ropsten');

provider.getBlockNumber().then((blockNumber) => {
    console.log("Current block number: " + blockNumber);
});
