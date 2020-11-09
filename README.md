# burn-to-claim
Demo of [burn-to-claim cross blockchain asset transfer protocol](https://zhehou.github.io/papers/burn_to_claim_cross_blockchain_asset_transfer_protocol.pdf)

## Required Accounts
- [infura.io](https://infura.io/)
- [Mongodb Atlas](https://cloud.mongodb.com/)^
  

## Required Software / Global Installs
- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Truffle](https://www.trufflesuite.com/)
- [Waffle](https://ethereum-waffle.readthedocs.io/en/latest/index.html#)
- [Mongodb](https://docs.mongodb.com/manual/installation/)^

^The app can be run without mongodb but only the latest log result will be retained.

This is a node.js console application running ethers.js. [dotenv](https://www.npmjs.com/package/dotenv) is used to store keys and connection strings.

## To download:
- Download via zip file / git clone / github desktop
- create a file in same folder as 'package.json' called '.env'
- Add the following lines to the .env file:  
  -  `CN_STRING = mongodb+srv://<user>:<password>@<project>.mongodb.net/<database>?retryWrites=true&w=majority`
  -  `INFURA = <keyfrominfuraaccount>`
- run 'npm install' to install all local packages.
- run 'npm start' to start the application.
  


## Compiling
The source contracts are located in `contracts`.
They can be compiled using either Truffle or Waffle.



## Settings
Settings can be found in `utils/settings.json`. Some of the settings include:
- **deploy**: Token and contract will be (re)deployed on the first run (transfer).
- **iterations**: The number of transfers to complete
- **sendLogbookToDb**: If Mongodb is connected, set this to true
- **tokenAmount**: The amount to transfer
- **initialBalance**: On deployment, the intial amount for of tokens


## Video Tutorial
Available on [Youtube](https://youtu.be/VhIfeQ-fgJ0)
  