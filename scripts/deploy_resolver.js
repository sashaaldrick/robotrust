require('dotenv').config();
const { ethers } = require("ethers");
const hre = require("hardhat");

async function main() {
  
    // set up keys and provider.
    const apiKey = process.env.INFURA_API_KEY;
    const privKey = process.env.DEVNET_PRIVKEY;
    provider = new ethers.providers.InfuraProvider("rinkeby", apiKey);
    const RoboTrustAddress = "0xEa9a87800886CBD3244DFA617E1B644E16b01309";
  
    // create layer 1 wallet.
    let wallet = new ethers.Wallet(privKey, provider);
    console.log('Your wallet address:', wallet.address);
  
    // connect signer to contract object.
    const ResolverContract = await (
      await hre.ethers.getContractFactory("Resolver")
    ).connect(wallet);
    console.log('Deploying Resolver contract to Rinkeby');

    // deploy contract.
    const contract = await ResolverContract.deploy(RoboTrustAddress);
    await contract.deployed();
    
    // success!
    console.log(`Resolver contract is deployed to ${contract.address}`)
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
