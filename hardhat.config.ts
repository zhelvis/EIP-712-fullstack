import '@nomicfoundation/hardhat-toolbox';

import './tasks/deploy';

import { DEPLOYER_PRIVATE_KEY, BSC_BE_API_KEY } from './environment';

const config = {
    solidity: {
        version: '0.8.18',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
    },
    networks: {
        local: {
            url: 'http://localhost:8545',
            accounts: [DEPLOYER_PRIVATE_KEY],
        },
        bsc: {
            url: 'https://bsc-dataseed.binance.org/',
            chainId: 56,
            accounts: [DEPLOYER_PRIVATE_KEY],
        },
        bscTestnet: {
            url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
            chainId: 97,
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
