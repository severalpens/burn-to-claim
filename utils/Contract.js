
/**
 * Controller class that instantiates a contract via ethers.js
 */
const fs = require('fs-extra');
const ethers = require("ethers");
const TimeHelper = require('./TimeHelper');
class Contract {
	constructor(network, msgSender, contractSettings, artifact) {
		this.network = network;
		this.msgSender = msgSender;
		this.contractSettings = contractSettings;
		this.address = contractSettings.addresses[network];
		const infura = new ethers.providers.InfuraProvider(network, 'abf62c2c62304ddeb3ccb2d6fb7a8b96');
		const ganache = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
		this.provider = network == "ganache" ? ganache : infura;
		this.wallet = new ethers.Wallet(msgSender.privateKey, this.provider);
		this.ethersContract = new ethers.Contract(this.address, artifact.abi, this.wallet);
		this.timer = new TimeHelper();
		this.transactionId = '';
		this.gasUsed = 0
		this.result = {};
		this.overrides = {
			// The maximum units of gas for the transaction to use
			gasLimit: 200000,
			// The price (in wei) per unit of gas
			gasPrice: ethers.utils.parseUnits('20.0', 'gwei'),
			// The amount to send with the transaction (i.e. msg.value)
			// value: ethers.utils.parseEther('0.05'),
		};
	}

	async balanceOf(address) {
		let balance = await this.ethersContract.balanceOf(address);
		return parseInt(balance);
	}

	async balanceOfLog(account) {
		let balance = await this.balanceOf(account.address);
		return {network: this.network,contractAddress: this.address,accountAddress: account.address, accountName: account.name,balance};
	}

	async run(tx, stopwatch, logbook) {
		let { method, args } = tx;
		console.log(method);
		let ethersTx = this.ethersContract[method];
		let gasEstimationHex = await this.provider.estimateGas(ethersTx);
		let gasEstimation = parseInt(gasEstimationHex);
		logbook.txs.push({ method, args, gasEstimation, split: Math.floor(stopwatch.read(0) / 1000) });
		await ethersTx(...args, this.overrides).then(async (signedTx) => {
			logbook.signedTxs.push(signedTx);
			await signedTx.wait().then(async (completedTx) => {
				completedTx.gasUsed.int = parseInt(completedTx.gasUsed._hex);
				completedTx.cumulativeGasUsed.int =  parseInt(completedTx.cumulativeGasUsed._hex);
				let gasUsed = completedTx.cumulativeGasUsed.int;
				this.gasUsed += gasUsed;
				delete completedTx.logsBloom;
				logbook.completedTxs.push(completedTx);
				logbook.summary.push({ method, gasUsed, split: Math.floor(stopwatch.read(0) / 1000) });
				this.transactionId = method === 'exitTransaction' ? completedTx.events[completedTx.events.length - 1].args.transactionId : null;
			})
			.catch(async (completedTxError) => {
				console.log('completedTx error');
				logbook.completedTxErrors.push(completedTxError);
				// throw completedTxError;
			})
			.finally(async () => {
			});
		})
		.catch(async (signedTxError) => {
			console.log('signedTx error');
			logbook.signedTxErrors.push(signedTxError);
			// throw signedTxError;

		})
		.finally(async () => {
		});
		return this.result;
	}

	async writeToLogbook(logbook){
	}
}

module.exports = Contract;
