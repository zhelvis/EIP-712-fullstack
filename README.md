# EIP-712-fullstack

This project implements off-chain typed data signing and on-chain signature verification based on EIP 712 standard (https://eips.ethereum.org/EIPS/eip-712).

The "Crypto Messenger" application allows users to send messages through a smart contract. Users create and sign messages off-chain and register it in blockchain. Relayers can send messages, created by another Users, but can't modify it. App protocol requires message creator signature to prevent message forgery by the relayer.

On-chain signature verification is implemented in `contract/Messenger.sol`.

This contract extends [EIP 712 domain separator implementation](https://docs.openzeppelin.com/contracts/3.x/api/drafts#EIP712) and use [ECDSA library](https://docs.openzeppelin.com/contracts/3.x/api/cryptography#ECDSA) created by [Openzeppelin](https://docs.openzeppelin.com) team.

Off-chain signature creation is implemented in `app/dataSigner.ts`. It's helper for web3 [ethers.js](https://docs.ethers.io/v5/) library.

Use-cases described in `test/Messenger.ts` file.

## Usage

This project required installed [NodeJS](https://nodejs.org/en/) and defined environment variables in ` .env` file (see `.env.example`).

```
// install 
npm install

// compile contracts
npx hardhat compile

// run tests
npx hardhat test

// run local node
npx hardhat node

// deploy contract in specified network (see: hardhat.config.ts)
npx hardhat deploy --network <network>

```
