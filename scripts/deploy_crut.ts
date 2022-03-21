require('dotenv').config();
import { ethers } from "ethers";
import hre from "hardhat";
import args from "./arguments_crut.js";

async function main() {
  
    // set up keys and provider.
    //const apiKey = process.env.INFURA_API_KEY;
    const apiKey = process.env.ALCHEMY_API_KEY;
    const privKey = process.env.DEVNET_PRIVKEY as string;
    const provider = new ethers.providers.AlchemyProvider("arbitrum-rinkeby", apiKey);
  
    // create wallet.
    let wallet = new ethers.Wallet(privKey, provider);
    console.log('Your wallet address:', wallet.address);
  
    // connect signer to contract object.
    /*
    const RoboTrustContract = await (
      await hre.ethers.getContractFactory("RoboTrust")
    ).connect(wallet);
    */
   const RoboTrustCRUTContract = await (
     await hre.ethers.getContractFactory("RoboTrustCRUT")
   ).connect(wallet);
   console.log('Deploying RoboTrust CRUT contract to Rinkarby');
   console.log('Balance: %s', await wallet.getBalance())

    // deploy contract.
    /*
    const initialBalance = ethers.utils.parseEther("0.1");
    const contract = await RoboTrustContract.deploy(args[0], args[1], args[2], args[3], { value: initialBalance});
    */
    const contract = await RoboTrustCRUTContract.deploy(wallet.address, args[1], args[2], args[3], args[4], args[5], args[6], { value: ethers.utils.parseEther('0.1')});
    await contract.deployed();
    
    // success!
    console.log(`RoboTrustCRUT contract is deployed to ${contract.address} on Rinkarby`);
    //await run_keeper(contract.address);
  }
  
  main()
