var ethers = require('ethers');

// to run this code -  node connectToContract_test.js


// Connect to the network in this case ropsten
let provider = ethers.getDefaultProvider('ropsten');

// The Contract interface
let abi = [
    "event ValueChanged(address indexed author, string oldValue, string newValue)",
    "constructor(string value)",
    "function getValue() view returns (string value)",
    "function setValue(string value)"
    
];

// The address from the above deployment example
let contractAddress = "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E";

(async () => {

    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    let contract = new ethers.Contract(contractAddress, abi, provider);

    // Get the current value
    let currentValue = await contract.getValue();

    console.log(currentValue);

})();


