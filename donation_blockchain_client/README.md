# Donation App Blockchain Client

Donation App blockchain client for the donation smart contract running on [Arbitrum](https://arbitrum.io/) blockchain.

- [Donation contract](https://goerli.arbiscan.io/address/0xf09b9581491844bb39b5df9e485849874b5290d8)
- [Owner account](https://goerli.arbiscan.io/address/0xce58ddb29f94f6a0594f3f6594f6415096b66425)

## Setup

### Installation

1. Node.js
2. Docker

### Running the client (without Docker)

Install packages

```bash
npm install
```

Download `env.sh` and `firebase-service-account.json` files from Google Drive place them at the root directory.

Load the environment variables to your terminal with the following command.

```bash
source env.sh
```

Start client

```bash
npm start
```

### Running the client (with Docker)

Download `.env` file from Google Drive place them at the root directory.

Build docker image and start a container

```bash
source run.sh
```

## Smart Contract.

The smart contract is placed in the `contract` folder. [Remix IDE](https://remix.ethereum.org/) is used to develop and deploy the smart contract.
