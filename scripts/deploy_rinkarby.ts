require('dotenv').config();
const { ethers } = require("ethers");
const hre = require("hardhat");
const args = require("./arguments.js");
//const { run_keeper } = require('../scripts/keepers.js');

async function main() {
  
    // set up keys and provider.
    //const apiKey = process.env.INFURA_API_KEY;
    const apiKey = process.env.ALCHEMY_API_KEY;
    const provider = new ethers.providers.AlchemyProvider("arbitrum-rinkeby", apiKey);
    //const provider = new ethers.providers.InfuraProvider("arbitrum-rinkeby", apiKey);
    const privKey = process.env.DEVNET_PRIVKEY as string;
   
    // create wallet.
    let wallet = new ethers.Wallet(privKey, provider);
    console.log('Your wallet address:', wallet.address);
  
    // connect signer to contract object.
    /*
    const RoboTrustContract = await (
      await hre.ethers.getContractFactory("RoboTrust")
    ).connect(wallet);
    */
   const RoboTrustDeployerContract = await (
     await hre.ethers.getContractFactory("RoboTrustDeployer")
   ).connect(wallet);
   console.log('Deploying RoboTrust contract to Rinkarby');

    // deploy contract.
    /*
    const initialBalance = ethers.utils.parseEther("0.1");
    const contract = await RoboTrustContract.deploy(args[0], args[1], args[2], args[3], { value: initialBalance});
    */
    const contract = await RoboTrustDeployerContract.deploy(args[0], { gasLimit: 5000000000});
    await contract.deployed();
    
    // success!
    console.log(`RoboTrustDeployer contract is deployed to ${contract.address} on Rinkarby`);
    //await run_keeper(contract.address);
  }
  
  main()
