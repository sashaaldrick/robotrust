require('dotenv').config();
const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {
  
    // set up keys and provider.
    const apiKey = process.env.INFURA_API_KEY;
    const privKey = process.env.DEVNET_PRIVKEY;
    provider = new ethers.providers.InfuraProvider("arbitrum-rinkeby", apiKey);
  
    // create layer 1 wallet.
    let wallet = new ethers.Wallet(privKey, provider);
    console.log('Your wallet address:', wallet.address);
  
    // connect signer to contract object.
    const RoboTrustContract = await (
      await hre.ethers.getContractFactory("RoboTrust")
    ).connect(wallet);
    console.log('Deploying RoboTrust contract to Rinkeby');

    // deploy contract.
    const initialBalance = ethers.utils.parseEther("0.1");
    const contract = await RoboTrustContract.deploy(60, 2, { value: initialBalance});
    await contract.deployed();
    
    // success!
    console.log(`RoboTrust contract is deployed to ${contract.address} on Rinkarby`);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });