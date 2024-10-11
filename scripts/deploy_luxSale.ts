const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy LUXSale
  const LUXSale = await hre.ethers.getContractFactory("LUXSale");
  
  // Set the constructor parameters
  const numberOfDays = 369;
  const totalSupply = hre.ethers.parseEther("1000000000000");
  const openTime = Math.floor(Date.now() / 1000);
  const startTime = openTime + 86400;
  const foundersAllocation = hre.ethers.parseEther("100000000000");
  const foundersKey = "0x9011E888251AB053B7bD1cdB598Db4f9DEd94714";
  const basePrice = hre.ethers.parseEther("0.00011");
  const priceIncreaseRate = 1;
  console.log("current time is: ", openTime)

  const luxSale = await LUXSale.deploy(
    numberOfDays,
    totalSupply,
    openTime,
    startTime,
    foundersAllocation,
    foundersKey,
    basePrice,
    priceIncreaseRate
  );

  await luxSale.waitForDeployment();
  const luxSaleAddress = await luxSale.getAddress();
  console.log("LUXSale deployed to:", luxSaleAddress);

  // Deploy LUXToken
  const LUXToken = await hre.ethers.getContractFactory("LUXToken");
  const luxToken = await LUXToken.deploy("LUX Token", "LUX");
  await luxToken.waitForDeployment();
  const luxTokenAddress = await luxToken.getAddress();

  console.log("LUXToken deployed to:", luxTokenAddress);

  // Transfer ownership of LUXToken to LUXSale
  await luxToken.transferOwnership(luxSaleAddress);
  
  // Initialize LUXSale with LUXToken
  await luxSale.initialize(luxTokenAddress);
  console.log("LUXSale initialized with LUXToken");

  // Deploy LUXSaleUtil
  const LUXSaleUtil = await hre.ethers.getContractFactory("LUXSaleUtil");
  const luxSaleUtil = await LUXSaleUtil.deploy(luxSaleAddress);
  await luxSaleUtil.waitForDeployment();
  const luxSaleUtilAddress = await luxSaleUtil.getAddress();
  console.log("LUXSaleUtil deployed to:", luxSaleUtilAddress);

  // Verify contracts on Luxscan
  console.log("Verifying contracts on Luxscan...");
  await hre.run("verify:verify", {
    address: luxSaleAddress,
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

  await hre.run("verify:verify", {
    address: luxTokenAddress,
    constructorArguments: [
      "LUX Token",
      "LUX"
    ],
  });

  await hre.run("verify:verify", {
    address: luxSaleUtilAddress,
    constructorArguments: [luxSaleAddress],
  });
}

main().then(() => process.exit(0))
  .catch((error) => {
  console.error(error);
  process.exit(1);
});
