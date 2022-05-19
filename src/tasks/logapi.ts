import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task, types } from "hardhat/config";




/**
 * It will log out all public functions on a smart contract
 * @param {HardhatRuntimeEnvironment} hre - HardhatRuntimeEnvironment
 * @param {string} contractName - The name of the contract you want to sync.
 */
const logapi = async (hre: HardhatRuntimeEnvironment, contractName: string) => {
    console.log(`------------------------------------------------------`);
    console.log(`Logging API for: ${contractName}`);
    console.log(`------------------------------------------------------`);

    const artifact = await hre.artifacts.readArtifact(contractName);
    artifact.abi.forEach((element: any) => {
        if (element.name == undefined) {
            return;
        }
        const params = `${element.inputs.map((input: any) => input.type).join(", ")}`;

        console.log(`${element.name}(\x1b[0m\x1b[36m${params}\x1b[0m)`)

    });


};


task("logapi", "log your contract's public methods from all dependencies")
    .addParam("contract", "Contract name to sync")
    .setAction(async (taskArgs, hre) => {
        await hre.run("compile");

        const contractName = taskArgs.contract;
        await logapi(hre, contractName);


    });

export default logapi;