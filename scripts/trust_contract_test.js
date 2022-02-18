require('dotenv').config();
const { ethers } = require("ethers");
require("./models/payment.js");
const { trustFromContract, trustFromContractBeneficiary } = require("./models/trust.js");

const RoboTrust = require('../src/artifacts/contracts/RoboTrust.sol/RoboTrust.json');

async function main() {
    // set up keys and provider.
    const apiKey = process.env.INFURA_API_KEY;
    const privKey = process.env.DEVNET_PRIVKEY_TEST;
    provider = new ethers.providers.InfuraProvider("arbitrum-rinkeby", apiKey);
    let wallet = new ethers.Wallet(privKey, provider);
    console.log('Your wallet address:', wallet.address);

    const trustContract = new ethers.Contract("0x9a437Da5Ced3623247dB2d19b2a5ae44B4620531", RoboTrust.abi, wallet);
    //const trustData = trustFromContract((await trustContract.getTrustData()));
    const trustData = trustFromContractBeneficiary((await trustContract.getTrustDataBeneficiary()));
    console.log("Trust Data: %s", trustData);
    /*
    const owner = (await trustContract.getOwnerAddress()).toString();
    
    const initialUSDValue = (await trustContract.getInitialValueData()).toString();
    const trustee = (await trustContract.getTrusteeAddress()).toString();
    const beneficiary = (await trustContract.getBeneficiaryAddress()).toString();
    console.log("Owner: %s\nTrustee: %s\nBeneficiary: %s\nInitial USD Value: %s", owner, trustee, beneficiary, initialUSDValue);
    const annuityPV = (await trustContract.getAnnuityPV()).toString();
    const gift = (await trustContract.getGift()).toString();
    console.log("Annuity Present Value: %s\nGift amount: %s", annuityPV, gift);
    const nextPayoutNo = parseInt((await trustContract.getPayoutCount()));
    console.log(nextPayoutNo);
    const maxPayouts = parseInt((await trustContract.getMaxPayouts()));
    console.log(maxPayouts);
    const nextPaymentAmount = paymentHelper.processPaymentData((await trustContract.getPaymentsMade()));
    nextPaymentAmount.forEach((x) => {
      console.log("Payout amount: %s", x.toString());
    });
    const status = (await trustContract.terminated()).toString();
    console.log("Terminated Status: %s", status);
  */
  
    async function checkUpkeep() {
        let currentBlockNumber = await provider.getBlockNumber();
        console.log("Current block number: " + currentBlockNumber);
        console.log("Checking if upkeep is needed.");
        let upkeepNeeded = await trustContract.checkUpkeep();
        if (upkeepNeeded === true) {
          console.log("Upkeep needed, executing performUpkeep().");
          await trustContract.performUpkeep({gasLimit: 10000000});
          console.log("performUpkeep() carried out successfully.");
          // const receipt = tx.wait();
        } else {
          console.log("Upkeep not needed.");
        }
      }
    
    checkUpkeep();
    

    //await trustContract.withdraw({gasLimit: 10000000});
   //await trustContract.liquidate({gasLimit: 10000000});
   //await trustContract.changeTrustee("0x964D1F946fA32dA8767c28C31Bf99920B01A2b10", {gasLimit: 10000000});
}

main()