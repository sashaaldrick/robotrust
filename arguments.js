//need to save constructor arguments passed on deployment to this file in order to verify with hardhat-etherscan
const { ethers } = require("ethers");
module.exports = [
    60,
    3,
    [ethers.utils.parseUnits("200", 18), ethers.utils.parseUnits("50", 18), ethers.utils.parseUnits("350", 18)],
    "0x5f0423B1a6935dc5596e7A24d98532b67A0AeFd8", //Arbitrum Rinkeby ETH/USD Price Feed (Chainlink)
]