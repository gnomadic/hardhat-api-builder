# Hardhat API Builder plugin

This is a simple plugin to auto-generate an API for solidity files.  The plugin will log all public functions to the console with the `logapi` command, or it can generate typescript API bindings with the `tsgen` command.


## Installation

```bash
npm install hardhat-api-builder --save-dev
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


### Typescript bindings generation

Run the following command to generate the typescript bindings for the public methods on a Contract:

```bash
npx hardhat tsgen --contract MyContractName
```

This will log the following output:

```bash
------------------------------------------------------
Logging API for: MyContractName
------------------------------------------------------

    async DEFAULT_ADMIN_ROLE() {
        return this.bountyQuestion.DEFAULT_ADMIN_ROLE();
      }
    

    async MINTER_ROLE() {
        return this.bountyQuestion.MINTER_ROLE();
      }
    

    async approve(to: string , tokenId: BigNumber ) {
        return this.bountyQuestion.approve(to, tokenId);
      }
    

    async balanceOf(owner: string ) {
        return this.bountyQuestion.balanceOf(owner);
      }
    

    async burn(tokenId: BigNumber ) {
        return this.bountyQuestion.burn(tokenId);
      }
    

    async getApproved(tokenId: BigNumber ) {
        return this.bountyQuestion.getApproved(tokenId);
      }
    

    async getRoleAdmin(role: bytes32 ) {
        return this.bountyQuestion.getRoleAdmin(role);
      }
      


      ...

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


