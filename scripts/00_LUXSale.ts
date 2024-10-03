import hre, { ethers } from "hardhat";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const fs = require('fs');  // Import the File System module

async function main() {
    let deployer: SignerWithAddress;
    [deployer] = await ethers.getSigners();

    console.log(`Deploying contracts with the account: ${deployer.address}`);

    // Parameters for LUXSale deployment
    const numberOfDays = 369;
    const totalSupply = ethers.utils.parseUnits("1000000000000", 18); // 1 trillion tokens (1,000,000,000,000)
    const openTime = Math.floor(Date.now() / 1000); // current timestamp
    const startTime = openTime + 3600; // auction starts 1 hour after deployment
    const foundersAllocation = ethers.utils.parseUnits("200000000000", 18); // 200 billion tokens to founders
    const foundersKey = "founders-public-key"; // Public key for founders
    const basePrice = ethers.utils.parseUnits("0.00011", 18); // 0.00011 USD
    const priceIncreaseRate = 100; // 1% daily increase rate (100 basis points)

    // Deploy LUXSale contract
    const luxSaleFactory = await ethers.getContractFactory("LUXSale", deployer);
    const luxSale = await luxSaleFactory.deploy(
        numberOfDays,
        totalSupply,
        openTime,
        startTime,
        foundersAllocation,
        foundersKey,
        basePrice,
        priceIncreaseRate
    );
    await luxSale.deployed();
    console.log(`LUXSale deployed at: ${luxSale.address}`);

    // Verify the contract on Etherscan
    try {
        await hre.run("verify:verify", {
            address: luxSale.address,
            contract: "src/LUXSale.sol:LUXSale",
            constructorArguments: [
                numberOfDays,
                totalSupply,
                openTime,
                startTime,
                foundersAllocation,
                foundersKey,
                basePrice,
                priceIncreaseRate
            ],
        });
        console.log("Contract verified on Etherscan");
    } catch (error) {
        console.error("Etherscan verification failed:", error);
    }

    // Determine the folder based on the network
    const networkName = hre.network.name; // e.g., "lux" or "lux_testnet"
    const folder = networkName === "lux" ? "mainnet" : "testnet";

    // Load the ABI from the compiled contract artifacts
    const abiPath = './artifacts/src/LUXSale.sol/LUXSale.json';
    if (!fs.existsSync(abiPath)) {
        console.error("ABI file not found. Make sure the contract is compiled.");
        return;
    }

    const abi = JSON.parse(fs.readFileSync(abiPath, 'utf8')).abi;

    // Create the deployments directory if it doesn't exist
    const dir = `deployments/${folder}`;
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    // Write ABI and address to the corresponding folder
    const outputPath = `${dir}/LUXSale.json`;
    fs.writeFileSync(outputPath, JSON.stringify({
        address: luxSale.address,
        abi: abi,
    }, null, 2));

    console.log(`Contract ABI and address saved to ${outputPath}`);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error("Deployment failed:", error);
        process.exit(1);
    });
