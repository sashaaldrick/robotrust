import { ethers } from 'ethers';
import { useRecoilState } from 'recoil';
import { accountState, createTrustFormState } from '../state/atoms';
import RoboTrustDeployer from '../artifacts/contracts/RoboTrustDeployer.sol/RoboTrustDeployer.json'; 
import RoboTrust from '../artifacts/contracts/RoboTrust.sol/RoboTrust.json';

import { getFirstPayment, getPayments } from './formHelperFunctions';
import { trustFromContractData } from './trust';
import { CreateFormData, CreateCRUTData } from './createFormData';
import { RiContactsBookLine } from 'react-icons/ri';


const deployerABI = RoboTrustDeployer.abi;
const deployerAddress = "0xdA261Fd451DD8917DB193c990681e8A93ee0732e";
const trustABI = RoboTrust.abi;

const disclaimer = "By signing the smart contract, you acknowledge that use of a digital mechanism for forming a trust may not be permissible under your state's jurisdiction, has not been approved by the Internal Revenue Service, and has not been recognized in any court of law. You represent that you have sought appropriate financial and legal advice, and that you are not reliant on any representations or suggestions of Robotrust.xyz. You hereby waive any right for yourself, your heirs, and assigns to hold Robotrust.xyz liable for (i) any indirect, incidental, special, consequential or punitive damages, or financial loss, whether incurred directly or indirectly or resulting from your access to or use or inability to access or use Robotrust.xyz; or (ii) any conduct of a third party, including any unauthorized access, use, or alteration of your transmissions. You agree that any dispute arising out of or relating to the use of Robotrust.xyz, including the termination of the scope or applicability of this agreement to arbitrate, will be determined by arbitration in the state of Texas or another mutually agreed upon location, before one neutral arbitrator.";

/*
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
*/

export const deployTrust = async (createTrustData: CreateFormData) => {
  
  /*
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
    console.log("graduatedPercentage: " + createTrustData.graduatedPercentage);
    console.log("BeneficiaryAddress: " + createTrustData.beneficiaryAddress);
    console.log("beneficiaryToggle: " + createTrustData.showBeneficiaryAccount);
    console.log("ethAmount: " + createTrustData.ethAmount);
    console.log("interestRate: " + createTrustData.interestRate);
    console.log("retainedInterest: " + createTrustData.retainedInterest);
    console.log("termInYears: " + createTrustData.termInYears);
    console.log("trusteeAddress: " + createTrustData.trusteeAddress);
    console.log("usdAmount: " + createTrustData.usdValue);
*/
    let provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum);

    if (!provider) {
      alert("Please install Metamask and set up an account to continue!");
    }

    await provider.send("eth_requestAccounts", []);
    let signer = await provider.getSigner();
    let signerAddress = await signer.getAddress()

    // address of test deployer contract on Rinkarby.
    const contractAddress = deployerAddress;
    const deployerContract = new ethers.Contract(contractAddress, deployerABI, signer);

    let firstPayment = getFirstPayment(+createTrustData.retainedInterest, createTrustData.interestRate, +createTrustData.graduatedPercentage/100, +createTrustData.termInYears);
    let payments = getPayments(+firstPayment, +createTrustData.termInYears, +createTrustData.graduatedPercentage/100);


    const parsedPayments = payments.map(payment => ethers.utils.parseEther(payment.toString()));
    const initialBalance = ethers.utils.parseEther(createTrustData.ethAmount.toString());
    const parsedRetainedInterest = ethers.utils.parseEther(createTrustData.retainedInterest.toString());

    // arguments to send: (uint256 _period, uint _numberOfYears, uint[] memory _paymentAmounts, uint _annuityPV, address _trustee, address _beneficiary, bool _showAccounting, string memory _disclaimer)
    console.log(`
    Deploying trust with following values:
    Initial Balance ${initialBalance} (${createTrustData.ethAmount})
    Estimated USD Value: ${createTrustData.usdValue}
    Grantor Address: ${signerAddress}
    Trustee Address: ${createTrustData.trusteeAddress}
    Beneficiary Address: ${createTrustData.beneficiaryAddress}
    Period: 60 seconds (hardcoded)
    Number of Years: ${createTrustData.termInYears}
    Payment Amounts: ${parsedPayments}
    Annuity PV (Retained Interest): ${parsedRetainedInterest} (${createTrustData.retainedInterest})
    Show Beneficiary Accounting: ${createTrustData.showBeneficiaryAccount ? "Yes" : "No"}
    `);
    
    try {
      let createTrustTx = await deployerContract.createTrust(60, +createTrustData.termInYears, parsedPayments, parsedRetainedInterest, createTrustData.trusteeAddress, createTrustData.beneficiaryAddress, createTrustData.showBeneficiaryAccount, disclaimer, { value: initialBalance});
      await createTrustTx.wait();
      console.log("Deployed Trust Contract!");
    } catch(err) {
      console.log(err);
    }

    let indices = await deployerContract.getOwnerTrusts(signerAddress);

    let mostRecentIndex = indices[indices.length - 1].toNumber();
    let trustAddress = await deployerContract.trustList(mostRecentIndex);
    console.log("Trust Address: " + trustAddress);
}

export const deployCRUT = async (data: CreateCRUTData) => {
  let provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum);

  if (!provider) {
    alert("Please install Metamask and set up an account to continue!");
  }

  await provider.send("eth_requestAccounts", []);
  let signer = await provider.getSigner();
  let signerAddress = await signer.getAddress()

  // address of test deployer contract on Rinkarby.
  const contractAddress = deployerAddress;
  const deployerContract = new ethers.Contract(contractAddress, deployerABI, signer);
  console.log(data.toString());

  try {
    //createCRUT(address _annuant, address _trustee, address _beneficiary, uint16 _numberOfYears, uint16 _paymentPercent, string memory _disclaimer)
    let createTrustTx = await deployerContract.createCRUT(data.annuant, data.trusteeAddress, data.charityAddress, data.termInYears, data.percent * 10, disclaimer, { value: ethers.utils.parseEther(data.ethAmount.toString())});
    await createTrustTx.wait();
    console.log("Deployed Trust Contract!");
  } catch(err) {
    console.log(err);
  }
}