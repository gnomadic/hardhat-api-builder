import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task, types } from "hardhat/config";
import { inputFile } from "hardhat/internal/core/params/argumentTypes";
import fs from 'fs';


/**
 * It will log out all public functions on a smart contract
 * @param {HardhatRuntimeEnvironment} hre - HardhatRuntimeEnvironment
 * @param {string} contractName - The name of the contract you want to sync.
 */
const tsgen = async (hre: HardhatRuntimeEnvironment, contractName: string) => {
    console.log(`------------------------------------------------------`);
    console.log(`Logging API for: ${contractName}`);
    console.log(`------------------------------------------------------`);

    const artifact = await hre.artifacts.readArtifact(contractName);


    const header = `import { BigNumber, ethers, providers } from "ethers";
import contract from "./${contractName}_abi.json";

const contractAddress = "<DEPLOYED_CONTRACT_ADDRESS_HERE>";
const abi = contract;

export default class ${contractName} {
  ${lowercaseFirstLetter(contractName)}: any;

  constructor(provider: providers.Web3Provider) {
    this.${lowercaseFirstLetter(contractName)} = new ethers.Contract(contractAddress, abi, provider);
  }
`

    let content = header;

    artifact.abi.forEach((element: any) => {
        if (element.name == undefined) {
            return;
        }
        if (element.type !== 'function') {
            return;
        }

        content = content.concat(genFunction(element, contractName));


    });

    const footer = `}`

    content = content.concat(footer);


    fs.writeFileSync(`./${contractName}.ts`, content);
    fs.writeFileSync(`./${contractName}_abi.json`, JSON.stringify(artifact.abi));
    console.log("generated successfully!");


};



const genFunction = (element: any, contractName: string,): string => {

    let params = element.inputs;

    if (element.stateMutability == 'payable') {
        params.push({
            name: 'value',
            type: 'uint256'
        })
    }

    params.map((param: any) => {
        if (param.type == 'uint256') {
            param.type = `BigNumber`
        } else if (param.type == 'address') {
            param.type = `string`
        } else if (param.type.includes("bytes")) {
            param.type = `unknown`
        } else if (param.type.includes("bool")) {
            param.type = `boolean`
        } else {
            param.type = param.type
        }
    });

    const typeScriptParams = `${params.map((input: any) => `${input.name}: ${input.type}`).join(", ")}`;

    const ethersParams = `${element.inputs.map((input: any) => input.name).join(", ")}`
    if (element.stateMutability == 'payable') {
        ethersParams.concat(`, { value: value }`)
    }


    const declaration = `
  async ${element.name}(${typeScriptParams}) {
    return await this.${lowercaseFirstLetter(contractName)}.${element.name}(${ethersParams});
  }
  
`;
    // console.log(declaration);
    return declaration;
};



const lowercaseFirstLetter = (input: string) => {
    return input.charAt(0).toLowerCase() + input.slice(1);
}


task("tsgen", "generate a typescript api for a contract")
    .addParam("contract", "Contract name to generate")
    .setAction(async (taskArgs, hre) => {
        await hre.run("compile");

        const contractName = taskArgs.contract;
        await tsgen(hre, contractName);


    });

export default tsgen;