require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("dotenv").config();

const ETHERSCAN_API_KEY_RINKEBY = process.env.ETHERSCAN_API_KEY_RINKEBY;
const ETHERSCAN_API_KEY_RINKARBY = process.env.ETHERSCAN_API_KEY_RINKARBY;

const INFURA_API_KEY = process.env.INFURA_API_KEY;
const RINKEBY_URL = process.env.RINKEBY_URL;

module.exports = {
  solidity: "0.8.11",
  paths: {
    artifacts: './src/artifacts', // for React's sake...
  },
  networks: {
    hardhat: {
      chainId: 1337 // localhost chain.
    },
    rinkarby: {
      url: 'https://rinkeby.arbitrum.io/rpc',
      chainId: 421611, // RinkArby chain ID.
    },
    rinkeby: {
      url: RINKEBY_URL,
      chainId: 4, //rinkeby chain ID.
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.DEVNET_PRIVKEY] //
    },
  },
  etherscan: {
    apiKey: {
      rinkeby: ETHERSCAN_API_KEY_RINKEBY,
      arbitrumTestnet: ETHERSCAN_API_KEY_RINKARBY,
    }, 
  },
};
