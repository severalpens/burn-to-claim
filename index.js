require('dotenv').config()
const ethers = require('ethers');
const ethersWrapper = require('./utils/ethersWrapper');
const crypto = require('./utils/cryptoWrapper');
const tokenArtifact = require('./build/contracts/BasicToken.json');
const agentArtifact = require('./build/contracts/BurnToClaim.json');
const settings = require('./utils/settings.json');
const TimeHelper = require('./utils/TimeHelper');
const delay = require('delay');
const senderToken = {}
const recipientToken = {}
const senderAgent = {}
const recipientAgent = {}

async function main() {

  console.log('Deploy BasicToken on Rinkeby');
  let provider = new ethers.providers.InfuraProvider('rinkeby', settings.infura);
  let wallet = new ethers.Wallet(settings.admin.privateKey, provider);
  let factory = new ethers.ContractFactory(tokenArtifact.abi, tokenArtifact.bytecode, wallet);
  let deployment = await factory.deploy(ethers.utils.parseEther("1000.0"));
  let result = await deployment.deployed();
  senderToken.address = result.address;
  console.log(senderToken);
  senderToken.contract = new ethers.Contract(senderToken.address, tokenArtifact.abi, wallet);


//   console.log('Deploy BasicToken on Ropsten');
//   provider = new ethers.providers.InfuraProvider('ropsten', settings.infura);
//   wallet = new ethers.Wallet(settings.admin.privateKey, provider);
//   factory = new ethers.ContractFactory(tokenArtifact.abi, tokenArtifact.bytecode, wallet);
//   deployment = await factory.deploy(ethers.utils.parseEther("1000.0"));
//   result = await deployment.deployed();
//   recipientToken.address = result.address;
//   recipientToken.contract = new ethers.Contract(recipientToken.address, tokenArtifact.abi, wallet);


//   console.log('Deploy BurnToClaim on Rinkeby');
//   provider = new ethers.providers.InfuraProvider('rinkeby', settings.infura);
//   wallet = new ethers.Wallet(settings.admin.privateKey, provider);
//   factory = new ethers.ContractFactory(agentArtifact.abi, agentArtifact.bytecode, wallet);
//   deployment = await factory.deploy();
//   result = await deployment.deployed();
//   senderAgent.address = result.address;
//   senderAgent.contract = new ethers.Contract(senderAgent.address, tokenArtifact.abi, wallet);


//   console.log('Deploy BurnToClaim on Ropsten');
//   provider = new ethers.providers.InfuraProvider('ropsten', settings.infura);
//   wallet = new ethers.Wallet(settings.admin.privateKey, provider);
//   factory = new ethers.ContractFactory(agentArtifact.abi, agentArtifact.bytecode, wallet);
//   deployment = await factory.deploy();
//   result = await deployment.deployed();
//   recipientAgent.address = result.address;
//   recipientAgent.contract = new ethers.Contract(recipientAgent.address, tokenArtifact.abi, wallet);


//   console.log('Deploy BurnToClaim on Ropsten');
//   let burnAccount = ethersWrapper.genAccount();
//   let hashPair = crypto.newSecretHashPair();

//   await senderToken.contract.registerContract(recipientAgent.address);
//   await recipientAgent.contract.registerContract(senderAgent.address);
//   await senderToken.contract.transfer(senderAgent.address, 1000);
//   await recipientToken.contract.transfer(recipientAgent.address, 1000);

//   let transferAmount = 1;
//   let timeoutSeconds = 10000;
  
//   await senderToken.contract.approve(senderAgent.address, transferAmount);

//   let transactionId = await senderAgent.contract.exitTransaction(
//     burnAccount.address,
//     hashPair.hash,
//     timeoutSeconds,
//     senderToken.address,
//     transferAmount
//   );

//   await senderAgent.contract.reclaimTransaction(
//     transactionId
//   );

//   await recipientAgent.contract.add(
//     transactionId
//   );

//   await recipientAgent.contract.entryTransaction(
//     transactionId
//   );

//   await senderAgent.contract.update(
//     recipientAgent.address,
//     transactionId,
//     hashPair.secret
// );


};

main();