# Hardhat API Builder plugin

This is a simple plugin to auto-generate an API for solidity files.  The current version will log all public methods to the console, however future versions can auto-generate a Typescript file with all the boilerplate required to integreate your smart contract with a web3 dApp.


## Installation

```bash
npm install hardhat-gas-reporter --save-dev
```
And add the following to your hardhat.config.js:

```bash
require("hardhat-api-builder");
```

Or, if you are using TypeScript, add this to your hardhat.config.ts:

```bash
import "hardhat-api-builder";
```

## Using the plugin

### API Logger

Run the following command to log the public methods on a Contract:

```bash
npx hardhat logapi --contract MyContractName
```

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


