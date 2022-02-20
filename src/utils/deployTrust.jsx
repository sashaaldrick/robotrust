import { ethers } from 'ethers';
import RoboTrustDeployer from '../artifacts/contracts/RoboTrustDeployer.sol/RoboTrustDeployer.json';
import RoboTrust from '../artifacts/contracts/RoboTrust.sol/RoboTrust.json';


import { trustFromContractData, trustFromContractBeneficiary } from './trust';


const deployerABI = RoboTrustDeployer.abi;
const trustABI = RoboTrust.abi;

const disclaimer = "By signing the smart contract, you acknowledge that use of a digital mechanism for forming a trust may not be permissible under your state's jurisdiction, has not been approved by the Internal Revenue Service, and has not been recognized in any court of law. You represent that you have sought appropriate financial and legal advice, and that you are not reliant on any representations or suggestions of Robotrust.xyz. You hereby waive any right for yourself, your heirs, and assigns to hold Robotrust.xyz liable for (i) any indirect, incidental, special, consequential or punitive damages, or financial loss, whether incurred directly or indirectly or resulting from your access to or use or inability to access or use Robotrust.xyz; or (ii) any conduct of a third party, including any unauthorized access, use, or alteration of your transmissions. You agree that any dispute arising out of or relating to the use of Robotrust.xyz, including the termination of the scope or applicability of this agreement to arbitrate, will be determined by arbitration in the state of Texas or another mutually agreed upon location, before one neutral arbitrator.";

function getFirstPayment(retainedInterest, interestRate, gradingPercent, termInYears) {
  return ((interestRate - gradingPercent) * retainedInterest) / (1 - (((1 + gradingPercent)/(1 + interestRate))**termInYears))
};

function getPayments(firstPayment, termInYears, gradingPercent) {
  let payments = [];
  for(let x = 0; x < termInYears; x++) {
    payments.push(firstPayment * ((1 + gradingPercent)**x));
  }
  return payments;
};


const deployTrust = async (values) => {

   const { beneficiaryAddress,
            beneficiaryToggle,
            ethAmount,
            graduatedToggle,
            interestRate,
            retainedInterest,
            termInYears,
            trusteeAddress,
            graduatedPercentage,
            usdAmount } = values;
    console.log("graduatedPercentage: " + graduatedPercentage);
    console.log("BeneficiaryAddress: " + beneficiaryAddress);
    console.log("beneficiaryToggle: " + beneficiaryToggle);
    console.log("ethAmount: " + ethAmount);
    console.log("graduatedToggle: " + graduatedToggle);
    console.log("interestRate: " + interestRate);
    console.log("retainedInterest: " + retainedInterest);
    console.log("termInYears: " + termInYears);
    console.log("trusteeAddress: " + trusteeAddress);
    console.log("usdAmount: " + usdAmount);

    const { ethereum } = window;

    let provider;
    if (ethereum) {
      // use metamask as provider
      provider = new ethers.providers.Web3Provider(ethereum);
    } else {
      // 
      alert("Please install Metamask and set up an account to continue!");
    }

    await provider.send("eth_requestAccounts", []);
    let signer = await provider.getSigner();
    console.log("Accounts: ", await signer.getAddress());

    // address of test deployer contract on Rinkarby.
    const contractAddress = "0xb716885030FfD2157475457480f9638909FefF92";
    const deployerContract = new ethers.Contract(contractAddress, deployerABI, signer);

    let firstPayment = getFirstPayment(+retainedInterest, 0.017, 0, +termInYears);
    let payments = getPayments(+firstPayment, +termInYears, 0);


    const parsedPayments = payments.map(payment => ethers.utils.parseEther(payment.toString()));
    const initialBalance = ethers.utils.parseEther("0.01");
    const parsedRetainedInterest = ethers.utils.parseEther(retainedInterest.toString());

    // arguments to send: (uint256 _period, uint _numberOfYears, uint[] memory _paymentAmounts, uint _annuityPV, address _trustee, address _beneficiary, bool _showAccounting, string memory _disclaimer)

    try {
      let createTrustTx = await deployerContract.createTrust(60, +termInYears, parsedPayments, parsedRetainedInterest, trusteeAddress, beneficiaryAddress, false, disclaimer, { value: initialBalance});
      await createTrustTx.wait();
      console.log("Deployed Trust Contract!");
    } catch(err) {
      console.log(err);
    }

    const dev = "0x2D57E5E2bb5ea3BCd001668e3dEf98b6EE040E5E";
    let indices = await deployerContract.getOwnerTrusts(dev);

    let mostRecentIndex = indices[indices.length - 1].toNumber();
    let trustAddress = await deployerContract.trustList(mostRecentIndex);
    console.log("Trust Address: " + trustAddress);

    // get individual Contract info
    const trustContract = new ethers.Contract(contractAddress, trustABI, signer);

    try {
      let trustData = await trustContract.getTrustData();
      console.log(trustFromContractData(trustData));

    } catch(err) {
      console.log(err);
    }

}

export default deployTrust;