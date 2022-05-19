import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task, types } from "hardhat/config";
import { inputFile } from "hardhat/internal/core/params/argumentTypes";




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
    artifact.abi.forEach((element: any) => {
        if (element.name == undefined) {
            return;
        }
        if (element.type !== 'function') {
            return;
        }

        genFunction(element, contractName);;







    });


};



const genFunction = async (element: any, contractName: string) => {

    let params = element.inputs;

    // if (element.stateMutability == 'payable') {
    //     params.push({
    //         name: 'value',
    //         type: 'uint256'
    //     })
    // }

    params.map((param: any) => {
        if (param.type == 'uint256') {
            param.type = `BigNumber`
        } else if (param.type == 'address') {
            param.type = `string`
        } else {
            param.type = param.type
        }
    });

    const typeScriptParams = `${params.map((input: any) => `${input.name}: ${input.type} `).join(", ")}`;

    const ethersParams = `${element.inputs.map((input: any) => input.name).join(", ")}`
    // if (element.stateMutability == 'payable') {
    //     ethersParams.concat(`, {value: value}`)
    // }


    const declaration = `
    async ${element.name}(${typeScriptParams}) {
        return this.${lowercaseFirstLetter(contractName)}.${element.name}(${ethersParams});
      }
    `;
    console.log(declaration);
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