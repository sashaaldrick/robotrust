import { ethers } from 'ethers';
import RoboTrustDeployer from '../artifacts/contracts/RoboTrustDeployer.sol/RoboTrustDeployer.json'; 
import RoboTrust from '../artifacts/contracts/RoboTrust.sol/RoboTrust.json';

import { trustFromContractData, Trust, BeneficiaryTrust, trustFromContractBeneficiary } from './trust';


const deployerABI = RoboTrustDeployer.abi;
const trustABI = RoboTrust.abi;

export const getGrantorTrustData = async () => {
    let provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum);

    if (!provider) {
      alert("Please install Metamask and set up an account to continue!");
    }

    await provider.send("eth_requestAccounts", []);
    let signer = await provider.getSigner();
    let signerAddress = await signer.getAddress();

    // address of test deployer contract on Rinkarby.
    const contractAddress = "0xb716885030FfD2157475457480f9638909FefF92";
    const deployerContract = new ethers.Contract(contractAddress, deployerABI, signer);

    let indices = await deployerContract.getOwnerTrusts(signerAddress);
    let trustList: Trust[] = [];

    for (const index of indices) {
        let trustAddress = (await deployerContract.trustList(index)).toString();
        console.log("Trust Address: " + trustAddress);
        // get individual Contract info
        const trustContract = new ethers.Contract(trustAddress, trustABI, signer);

        try {
            let trustDataTx = await trustContract.getTrustData();
            let trustData = trustFromContractData(trustDataTx);
            Object.assign(trustData, {'trustAddress': trustAddress});
            trustList.push(trustData);
        } catch(err) {
            console.log(err);
        }
    };

    console.log(`Trust List: ${trustList}`);
    return trustList;
}

export const getTrusteeTrustData = async () => {
    let provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum);

    if (!provider) {
      alert("Please install Metamask and set up an account to continue!");
    }

    await provider.send("eth_requestAccounts", []);
    let signer = await provider.getSigner();
    let signerAddress = await signer.getAddress();

    // address of test deployer contract on Rinkarby.
    const contractAddress = "0xb716885030FfD2157475457480f9638909FefF92";
    const deployerContract = new ethers.Contract(contractAddress, deployerABI, signer);

    let indices = await deployerContract.getTrusteeTrusts(signerAddress);
    let trustList: Trust[] = [];

    for (const index of indices) {
        let trustAddress = (await deployerContract.trustList(index)).toString();
        console.log("Trust Address: " + trustAddress);
        // get individual Contract info
        const trustContract = new ethers.Contract(trustAddress, trustABI, signer);

        try {
            let trustDataTx = await trustContract.getTrustData();
            let trustData = trustFromContractData(trustDataTx);
            Object.assign(trustData, {'trustAddress': trustAddress});
            trustList.push(trustData);
        } catch(err) {
            console.log(err);
        }
    };

    console.log(`Trust List: ${trustList}`);
    return trustList;
}

export const getBeneficiaryTrustData = async () => {
    let provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum);

    if (!provider) {
      alert("Please install Metamask and set up an account to continue!");
    }

    await provider.send("eth_requestAccounts", []);
    let signer = await provider.getSigner();
    let signerAddress = await signer.getAddress();

    // address of test deployer contract on Rinkarby.
    const contractAddress = "0xb716885030FfD2157475457480f9638909FefF92";
    const deployerContract = new ethers.Contract(contractAddress, deployerABI, signer);

    let indices = await deployerContract.getBeneficiaryTrusts(signerAddress);
    let trustList: BeneficiaryTrust[] = [];

    for (const index of indices) {
        let trustAddress = (await deployerContract.trustList(index)).toString();
        console.log("Trust Address: " + trustAddress);
        // get individual Contract info
        const trustContract = new ethers.Contract(trustAddress, trustABI, signer);

        try {
            let trustDataTx = await trustContract.getTrustDataBeneficiary();
            let trustData = trustFromContractBeneficiary(trustDataTx);
            Object.assign(trustData, {'trustAddress': trustAddress});
            trustList.push(trustData);
        } catch(err) {
            console.log(err);
        }
    };

    console.log(`Trust List: ${trustList}`);
    return trustList;
}