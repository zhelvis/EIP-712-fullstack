import "@nomicfoundation/hardhat-toolbox";

import "./tasks/deploy";

import { DEPLOYER_PRIVATE_KEY, BSC_BE_API_KEY } from "./environment";

const config = {
  solidity: "0.8.9",
  networks: {
    local: {
      url: "http://localhost:8545",
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
    bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      accounts: [DEPLOYER_PRIVATE_KEY],
    },
  },
  gasReporter: {
    enabled: true,
  },
  etherscan: {
    apiKey: {
      bsc: BSC_BE_API_KEY,
    },
  },
};

export default config;
