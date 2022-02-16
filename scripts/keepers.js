require('dotenv').config();
const { ethers } = require("ethers");

const RoboTrust = require('../src/artifacts/contracts/RoboTrust.sol/RoboTrust.json')
// abitrum contract address
//const contractAddress = "0xcFA566c04F0347861a6982393613cae35E6C36D4";

module.exports = {
  run_keeper: async function (contractAddress) {
    // set up keys and provider.
    const apiKey = process.env.INFURA_API_KEY;
    const privKey = process.env.DEVNET_PRIVKEY;
    provider = new ethers.providers.InfuraProvider("arbitrum-rinkeby", apiKey);
  
    // creating wallet.
    let wallet = new ethers.Wallet(privKey, provider);
    console.log('Your wallet address:', wallet.address);
  
    // connecting signer to deployed RoboTrust contract.
    const contract = new ethers.Contract(contractAddress, RoboTrust.abi, wallet);

    async function checkUpkeep() {
      let currentBlockNumber = await provider.getBlockNumber();
      console.log("Current block number: " + currentBlockNumber);
      console.log("Checking if upkeep is needed.");
      let upkeepNeeded = await contract.checkUpkeep();
      if (upkeepNeeded === true) {
        console.log("Upkeep needed, executing performUpkeep().");
        await contract.performUpkeep();
        console.log("performUpkeep() carried out successfully.");
        // const receipt = tx.wait();
      } else {
        console.log("Upkeep not needed.");
      }
    }

    // setting the function checkUpkeep to run every 15 seconds.
    setInterval(checkUpkeep, 15000);
  }
} 

