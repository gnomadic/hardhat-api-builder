# hardhat-api-builder

_Autogenerate your Typescript bindings so you can integrate your contracts with a dApp easily_

## What

This is a simple plugin to auto-generate an API for solidity files.  The plugin will log all public functions to the console with the `logapi` command, or it can generate typescript API bindings with the `tsgen` command.

## Installation

```bash
npm install hardhat-api-builder --save-dev
```

Import the plugin in your `hardhat.config.js`:

```js
require("hardhat-api-builder");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "hardhat-api-builder";
```

## Tasks

This plugin adds the following tasks to Hardhat:

### logapi

```bash
npx hardhat logapi --contract MyContractName
```

This will log all public and external functions and their parameters to the console, for example:


This will log the following output:

```bash
------------------------------------------------------
Logging API for: MyContractName
------------------------------------------------------
Transfer(address, address, uint256)
balanceOf(address)
burn(uint256)
getApproved(uint256)
getRoleAdmin(bytes32)
grantRole(bytes32, address)
hasRole(bytes32, address)
isApprovedForAll(address, address)
name()
ownerOf(uint256)
renounceRole(bytes32, address)
revokeRole(bytes32, address)
safeMint(address, string)
safeTransferFrom(address, address, uint256)

...

```

### tsgen

```bash
npx hardhat tsgen --contract MyContractName
```

This will autogenate a MyContractName.ts file which contains Typescript bindings for every public and external method in your contract, as well as a MyContractName_abi.json file.  With these two files you can simply copy and paste them into your dapp so you can interact with your smart contract.

The generated JSON file will contain the following:

```bash

import { BigNumber, ethers, providers } from "ethers";
import contract from "./BountyQuestion_abi.json";

const contractAddress = "<DEPLOYED_CONTRACT_ADDRESS_HERE>";
const abi = contract;

export default class BountyQuestion {
  bountyQuestion: any;

  constructor(provider: providers.Web3Provider) {
    this.bountyQuestion = new ethers.Contract(contractAddress, abi, provider);
  }

  async DEFAULT_ADMIN_ROLE() {
    return await this.bountyQuestion.DEFAULT_ADMIN_ROLE();
  }

  ...

```












## Plugin Devleopment

first install the depedencies:

```bash
npm install
```

check the the Hardhat [Plugin Development Guide](https://hardhat.org/advanced/building-plugins.html) to learn how to build a plugin.


to build, run:
```bash
npm run build
```


