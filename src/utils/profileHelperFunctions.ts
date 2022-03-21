import { ethers } from 'ethers';
import RoboTrustDeployer from '../artifacts/contracts/RoboTrustDeployer.sol/RoboTrustDeployer.json'; 
import RoboTrust from '../artifacts/contracts/RoboTrust.sol/RoboTrust.json';
import RoboTrustCRUT from '../artifacts/contracts/RoboTrustCRUT.sol/RoboTrustCRUT.json';

import { trustFromContractData, Trust, BeneficiaryTrust, trustFromContractBeneficiary, CRUT, crutFromContract } from './trust';

const deployerAddress = "0xdA261Fd451DD8917DB193c990681e8A93ee0732e";
const deployerABI = RoboTrustDeployer.abi;
const trustABI = RoboTrust.abi;
const crutABI = RoboTrustCRUT.abi;

export const getGrantorTrustData = async () => {
    let provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum);

    if (!provider) {
      alert("Please install Metamask and set up an account to continue!");
    }

    await provider.send("eth_requestAccounts", []);
    let signer = await provider.getSigner();
    let signerAddress = await signer.getAddress();

    // address of test deployer contract on Rinkarby.
    const contractAddress = deployerAddress;
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
    const contractAddress = deployerAddress;
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
    const contractAddress = deployerAddress;
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

export const getCRUTData = async () => {
    let provider: ethers.providers.Web3Provider = new ethers.providers.Web3Provider(window.ethereum);

    if (!provider) {
      alert("Please install Metamask and set up an account to continue!");
    }

    await provider.send("eth_requestAccounts", []);
    let signer = await provider.getSigner();
    let signerAddress = await signer.getAddress();

    // address of test deployer contract on Rinkarby.
    const contractAddress = deployerAddress;
    const deployerContract = new ethers.Contract(contractAddress, deployerABI, signer);

    let indices = await deployerContract.getAddressCRUT(signerAddress);
    let trustList: CRUT[] = [];

    for (const index of indices) {
        let trustAddress = (await deployerContract.crutList(index)).toString();
        console.log("Trust Address: " + trustAddress);
        // get individual Contract info
        const trustContract = new ethers.Contract(trustAddress, crutABI, signer);

        try {
            let trustDataTx = await trustContract.getTrustData();
            console.log('tx data: %s', trustDataTx);
            let trustData = crutFromContract(trustDataTx);
            Object.assign(trustData, {'contractAddress': trustAddress});
            trustList.push(trustData);
        } catch(err) {
            console.log(err);
        }
    };

    console.log(`Trust List: ${trustList}`);
    return trustList;
}