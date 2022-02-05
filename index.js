require('dotenv').config();
const fs = require('fs-extra');
const ethers = require('ethers');
const ethersWrapper = require('./utils/ethersWrapper');
const crypto = require('./utils/cryptoWrapper');
const tokenArtifact = require('./build/contracts/BasicToken.json');
const agentArtifact = require('./build/contracts/BurnToClaim.json');
const TimeHelper = require('./utils/TimeHelper');
const delay = require('delay');

async function main() {
  const settings =  fs.readJSONSync('./settings.json');
  
  console.log('Deploy contracts on Rinkeby');
  let provider = new ethers.providers.InfuraProvider('rinkeby', settings.infura);
  let wallet = new ethers.Wallet(settings.admin.privateKey, provider);
  let tokenFactory = new ethers.ContractFactory(tokenArtifact.abi, tokenArtifact.bytecode, wallet);
  let tokenDeploy = await tokenFactory.deploy(ethers.utils.parseEther("1000.0"));
  let token = await tokenDeploy.deployed();
  settings.sender.tokenAddress = token.address;

  let agentFactory = new ethers.ContractFactory(agentArtifact.abi, agentArtifact.bytecode, wallet);
  let agentDeploy = await agentFactory.deploy();
  let agent = await agentDeploy.deployed();
  settings.sender.tokenAddress = agent.address;

  console.log('Deploy contracts on Ropsten');
  provider = new ethers.providers.InfuraProvider('ropsten', settings.infura);
  wallet = new ethers.Wallet(settings.admin.privateKey, provider);
  tokenFactory = new ethers.ContractFactory(tokenArtifact.abi, tokenArtifact.bytecode, wallet);
  tokenDeploy = await tokenFactory.deploy(ethers.utils.parseEther("1000.0"));
  token = await tokenDeploy.deployed();
  settings.recipient.tokenAddress = token.address;

  agentFactory = new ethers.ContractFactory(agentArtifact.abi, agentArtifact.bytecode, wallet);
  agentDeploy = await agentFactory.deploy();
  agent = await agentDeploy.deployed();
  settings.recipient.tokenAddress = agent.address;
  
  fs.writeJSONSync('./settings.json',settings);


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