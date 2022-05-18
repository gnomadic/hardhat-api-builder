import { HardhatRuntimeEnvironment } from "hardhat/types";
import { task, types } from "hardhat/config";


/**
 * It will log out all public functions on a smart contract
 * @param {HardhatRuntimeEnvironment} hre - HardhatRuntimeEnvironment
 * @param {string} contract - The name of the contract you want to sync.
 */
// const laikaSync = async (hre: HardhatRuntimeEnvironment, contract: string, contractAddress: string) => {
//   const { abi } = await hre.artifacts.readArtifact(contract);
//   console.log(`Syncing the ABI of ${contract} contract...`);

//   const { default: fetch } = await import("node-fetch");
//   const response = await fetch(
//     `${endpointUrls.services}/abi-storages`,
//     {
//       method: "POST",
//       body: JSON.stringify({ abi, contractAddress }),
//       headers: { "Content-Type": "application/json" },
//     }
//   );

//   const publicUrl = await response.text();
//   const endpoint = `${endpointUrls.interface}/evm/collections/import/${
//     publicUrl.split("/")[4].split(".")[0]
//   }`;

//   console.log(`Check out your request at ${endpoint}`);
//   open(endpoint);
// };

/**
 * It will log out all public functions on a smart contract
 * @param {HardhatRuntimeEnvironment} hre - HardhatRuntimeEnvironment
 * @param {string} contractName - The name of the contract you want to sync.
 */
const logapi = async (hre: HardhatRuntimeEnvironment, contractName: string) => {
    console.log(contractName);

    const artifact = await hre.artifacts.readArtifact(contractName);
    artifact.abi.forEach((element: any) => {
      const readable = `${element.name}(${element.inputs.map((input: any) => input.type).join(", ")})`;
      console.log(readable);
    });
};


// task("laika-sync", "Sync your ABIs with Laika")
//   .addParam("contract", "Contract name to sync")
//   .addOptionalParam(
//     "address",
//     "Address of that specific contract",
//     "",
//     types.string
//   )
//   .setAction(async (taskArgs, hre) => {
//     const { contract, address: contractAddress } = taskArgs;
//     await laikaSync(hre, contract, contractAddress);
//   });

  task("logapi", "log  your api")
  .addParam("contract", "Contract name to sync") // add contract parameters
  .setAction(async (taskArgs, hre) => {
    await hre.run("compile");

    const contractName = taskArgs.contract;
    await logapi(hre, contractName);


  });

export default logapi;