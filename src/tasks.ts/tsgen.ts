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

        if (element.stateMutability == "view") {
            genViewFunction(element, contractName);
        }





        // console.log(`------------------------------------------------------`);

        // const params = `${element.inputs.map((input: any) => input.type).join(", ")}`;

        // console.log(`${element.name}(\x1b[0m\x1b[36m${params}\x1b[0m)`)




        // console.log(`------------------------------------------------------`);


    });


};

// async view${element.name}(tokenId: BigNumber) {


const genViewFunction = async (element: any, contractName: string) => {


    const params = `${element.inputs.map((input: any) => `${input.type} ${input.name}`).join(", ")}`;


    const declaration = `
    async view_${element.name}(${params}) {
        return this.${lowercaseFirstLetter(contractName)}.${element.name}(${element.inputs.map((input: any) => input.name).join(", ")});
      }
    `

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