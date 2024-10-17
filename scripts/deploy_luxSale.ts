import { ethers, run } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  // Deploy ERC20Mock
  const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
  const erc20Mock = await ERC20Mock.deploy("MockToken", "MTK", "1000000000");
  await erc20Mock.waitForDeployment();
  console.log("ERC20Mock deployed to:", await erc20Mock.getAddress());

  // Deploy WLUX
  const WLUX = await ethers.getContractFactory("WLUX");
  const wLUX = await WLUX.deploy(await erc20Mock.getAddress());
  await wLUX.waitForDeployment();
  console.log("WLUX deployed to:", await wLUX.getAddress());

  // Deploy LUXShare
  const LUXShare = await ethers.getContractFactory("LUXShare");
  const luxShare = await LUXShare.deploy("LUXShare", "LUXS");
  await luxShare.waitForDeployment();
  console.log("LUXShare deployed to:", await luxShare.getAddress());
  
  // Deploy UniswapV3PoolMock
  const LUniswapV3Pool = await ethers.getContractFactory("UniswapV3PoolMock");
  const lUniswapV3Pool = await LUniswapV3Pool.deploy(await wLUX.getAddress(), await luxShare.getAddress());
  await lUniswapV3Pool.waitForDeployment();
  console.log("LUniswapV3Pool deployed to:", await lUniswapV3Pool.getAddress());

  // Deploy LUXSale
  const LuxSale = await ethers.getContractFactory("LUXSale");
  const luxSale = await LuxSale.deploy(
    369,//number of days
    ethers.parseEther("1000000"),//TotalLUXForSale
    Math.floor(Date.now() / 1000), //openTime (current timestamp)
    Math.floor(Date.now() / 1000) + 3600, //closeTime (current timestamp + 1 hour from now)
  );
  await luxSale.waitForDeployment();
  console.log("LuxSale deployed to:", await luxSale.getAddress());

  // Initialize LUXSale with WLUX
  await luxSale.initialize(wLUX.getAddress());
  console.log("LUXSale initialized with WLUX");

  // Deploy LUXSaleUtil
  const LuxSaleUtil = await ethers.getContractFactory("LUXSaleUtil");
  const luxSaleUtil = await LuxSaleUtil.deploy(await luxSale.getAddress());
  await luxSaleUtil.waitForDeployment();
  console.log("LuxSaleUtil deployed to:", await luxSaleUtil.getAddress());

  // Set token whitelist in LUXSale
  await luxSale.setTokenWhitelist([erc20Mock.getAddress()], [lUniswapV3Pool.getAddress()]); 
  console.log("Token whitelist set in LUXSale");

  // Verify contracts
  console.log("Verifying contracts...");

  await run("verify:verify", {
    address: await erc20Mock.getAddress(),
    constructorArguments: ["MockToken", "MTK", "1000000000"],
  });

  await run("verify:verify", {
    address: await wLUX.getAddress(),
    constructorArguments: [await erc20Mock.getAddress()],
  });

  await run("verify:verify", {
    address: await luxShare.getAddress(),
    constructorArguments: ["LUXShare", "LUXS"],
  });

  await run("verify:verify", {
    address: await lUniswapV3Pool.getAddress(),
    constructorArguments: [await wLUX.getAddress(), await luxShare.getAddress()],
  });

  await run("verify:verify", {
    address: await luxSale.getAddress(),
    constructorArguments: [
      369,
      ethers.parseEther("1000000"),
      Math.floor(Date.now() / 1000),
      Math.floor(Date.now() / 1000) + 3600,
    ],
  });

  await run("verify:verify", {
    address: await luxSaleUtil.getAddress(),
    constructorArguments: [await luxSale.getAddress()],
  });

  console.log("All contracts deployed and verified successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
