require('dotenv').config();
const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {
    const period = 10;
  
    // set up keys and provider.
    const apiKey = process.env.INFURA_API_KEY;
    const privKey = process.env.DEVNET_PRIVKEY;
    provider = new ethers.providers.InfuraProvider("rinkeby", apiKey);
  
    // create layer 1 wallet.
    let wallet = new ethers.Wallet(privKey, provider);
    console.log('Your wallet address:', wallet.address);
  
    // deploy contract from L2Wallet.
    const RoboTrustContract = await (
      await hre.ethers.getContractFactory("RoboTrust")
    ).connect(wallet);
    console.log('Deploying RoboTrust contract to Rinkeby');


    const initialBalance = ethers.utils.parseEther("0.1");
    const contract = await RoboTrustContract.deploy({ value: initialBalance});
    await contract.deployed();
    
    // success!
    console.log(`RoboTrust contract is deployed to ${contract.address}`)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
