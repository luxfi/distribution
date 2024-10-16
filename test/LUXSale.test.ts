import { expect } from "chai";
import { ethers } from "hardhat";
import { LUXSale, WLUX, ERC20Mock } from "../typechain-types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";

// Mock contracts for testing
async function deployERC20Mock(name: string, symbol: string, initialSupply: string) {
  const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
  const erc20Mock = await ERC20Mock.deploy(name, symbol, ethers.utils.parseEther(initialSupply));
  await erc20Mock.deployed();
  return erc20Mock;
}

// Mock Uniswap V3 pool contract
async function deployMockUniswapV3Pool(tokenA: string, tokenB: string) {
  const UniswapV3PoolMock = await ethers.getContractFactory("UniswapV3PoolMock");
  const pool = await UniswapV3PoolMock.deploy(tokenA, tokenB);
  await pool.deployed();
  return pool;
}

describe("LUXSale Contract", function () {
  let luxSale: LUXSale;
  let wlux: WLUX;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  let tokenA: ERC20Mock;
  let tokenB: ERC20Mock;

  let poolA: any;
  let poolB: any;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy WLUX token
    const WLUX = await ethers.getContractFactory("WLUX");
    wlux = (await WLUX.deploy(ethers.utils.parseEther("1000000"))) as WLUX;
    await wlux.deployed();

    // Deploy LUXSale contract
    const LUXSale = await ethers.getContractFactory("LUXSale");
    luxSale = (await LUXSale.deploy(
      10, // numberOfDays
      ethers.utils.parseEther("500000"), // totalWLUXForSale
      (await ethers.provider.getBlock("latest")).timestamp, // openTime
      (await ethers.provider.getBlock("latest")).timestamp + 3600 // startTime
    )) as LUXSale;
    await luxSale.deployed();

    // Initialize LUXSale with WLUX token address
    await luxSale.initialize(wlux.address);

    // Transfer WLUX tokens to LUXSale contract
    await wlux.transfer(luxSale.address, ethers.utils.parseEther("500000"));

    // Deploy mock ERC20 tokens
    tokenA = (await deployERC20Mock("TokenA", "TKA", "1000000")) as ERC20Mock;
    tokenB = (await deployERC20Mock("TokenB", "TKB", "1000000")) as ERC20Mock;

    // Distribute tokens to addr1 and addr2
    await tokenA.transfer(addr1.address, ethers.utils.parseEther("10000"));
    await tokenB.transfer(addr2.address, ethers.utils.parseEther("10000"));

    // Deploy mock Uniswap V3 pools
    poolA = await deployMockUniswapV3Pool(tokenA.address, wlux.address);
    poolB = await deployMockUniswapV3Pool(tokenB.address, wlux.address);

    // Set token whitelist with their corresponding pools
    await luxSale.setTokenWhitelist(
      [tokenA.address, tokenB.address],
      [poolA.address, poolB.address]
    );
  });

  it("Should accept contributions in whitelisted tokens", async function () {
    // Approve token transfer to LUXSale contract
    await tokenA.connect(addr1).approve(luxSale.address, ethers.utils.parseEther("1000"));

    // Simulate contribution
    await luxSale.connect(addr1).contribute(
      1, // window
      tokenA.address,
      ethers.utils.parseEther("1000")
    );

    const userContribution = await luxSale.userContributionsUSD(1, addr1.address);
    expect(userContribution).to.be.gt(0);
  });

  it("Should reject contributions from non-whitelisted tokens", async function () {
    const tokenC = await deployERC20Mock("TokenC", "TKC", "1000000");

    await tokenC.transfer(addr1.address, ethers.utils.parseEther("1000"));
    await tokenC.connect(addr1).approve(luxSale.address, ethers.utils.parseEther("1000"));

    await expect(
      luxSale.connect(addr1).contribute(
        1,
        tokenC.address,
        ethers.utils.parseEther("1000")
      )
    ).to.be.revertedWith("Token not accepted");
  });

  it("Should correctly calculate USD value using mock TWAP", async function () {
    // Approve token transfer to LUXSale contract
    await tokenA.connect(addr1).approve(luxSale.address, ethers.utils.parseEther("1000"));

    // Set mock TWAP price in the pool
    await poolA.setMockPrice(ethers.utils.parseUnits("2", 18)); // 1 TKA = 2 USD

    // Simulate contribution
    await luxSale.connect(addr1).contribute(
      1,
      tokenA.address,
      ethers.utils.parseEther("1000")
    );

    const userContribution = await luxSale.userContributionsUSD(1, addr1.address);
    expect(userContribution).to.equal(ethers.utils.parseEther("2000"));
  });

  it("Should allow users to claim WLUX tokens after window closes", async function () {
    // Approve token transfer to LUXSale contract
    await tokenA.connect(addr1).approve(luxSale.address, ethers.utils.parseEther("1000"));

    // Set mock TWAP price in the pool
    await poolA.setMockPrice(ethers.utils.parseUnits("2", 18)); // 1 TKA = 2 USD

    // Simulate contribution
    await luxSale.connect(addr1).contribute(
      1,
      tokenA.address,
      ethers.utils.parseEther("1000")
    );

    // Fast forward time to after the window closes
    await ethers.provider.send("evm_increaseTime", [86400]); // 1 day
    await ethers.provider.send("evm_mine", []);

    // User claims WLUX tokens
    await luxSale.connect(addr1).claim(1);

    const wluxBalance = await wlux.balanceOf(addr1.address);
    expect(wluxBalance).to.equal(ethers.utils.parseEther("2000")); // Assuming totalWLUXForSale is 500,000
  });

  it("Should prevent claiming before window closes", async function () {
    // Approve token transfer to LUXSale contract
    await tokenA.connect(addr1).approve(luxSale.address, ethers.utils.parseEther("1000"));

    // Simulate contribution
    await luxSale.connect(addr1).contribute(
      1,
      tokenA.address,
      ethers.utils.parseEther("1000")
    );

    // Attempt to claim before window closes
    await expect(luxSale.connect(addr1).claim(1)).to.be.revertedWith("Claim period not started");
  });

  it("Should allow owner to add liquidity", async function () {
    await luxSale.addLiquidity(
      1,
      ethers.utils.parseEther("1000"),
      tokenA.address
    );

    const windowData = await luxSale.windowTotals(1);
    expect(windowData.unsoldWLUX).to.be.gt(0);
  });
});
