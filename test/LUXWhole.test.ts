import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { 
  ERC20Mock, 
  WLUX, 
  LUXShare, 
  UniswapV3PoolMock, 
  LUXSale, 
  LUXSaleUtil 
} from "../types";
describe("LUX Distribution Contracts", function () {
  let erc20Mock: ERC20Mock;
  let wlux: WLUX;
  let luxShare: LUXShare;
  let uniswapV3PoolMock: UniswapV3PoolMock;
  let luxSale: LUXSale;
  let luxSaleUtil: LUXSaleUtil;
  let owner: SignerWithAddress;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();

    const ERC20Mock = await ethers.getContractFactory("ERC20Mock");
    erc20Mock = await ERC20Mock.deploy("MockToken", "MTK", ethers.parseEther("1000000"));

    const WLUX = await ethers.getContractFactory("WLUX");
    wlux = await WLUX.deploy(ethers.parseEther("1000000"));

    const LUXShare = await ethers.getContractFactory("LUXShare");
    luxShare = await LUXShare.deploy("LUXShare", "LUXS");

    const UniswapV3PoolMock = await ethers.getContractFactory("UniswapV3PoolMock");
    uniswapV3PoolMock = await UniswapV3PoolMock.deploy(await wlux.getAddress(), await luxShare.getAddress());

    const LUXSale = await ethers.getContractFactory("LUXSale");
    luxSale = await LUXSale.deploy(
      369,
      ethers.parseEther("1000000"),
      Math.floor(Date.now() / 1000),
      Math.floor(Date.now() / 1000) + 3600
    );

    await luxSale.initialize(await wlux.getAddress());
    await luxSale.setTokenWhitelist([await erc20Mock.getAddress()], [await uniswapV3PoolMock.getAddress()]);

    const LUXSaleUtil = await ethers.getContractFactory("LUXSaleUtil");
    luxSaleUtil = await LUXSaleUtil.deploy(await luxSale.getAddress());
  });

  describe("ERC20Mock", function () {
    it("Should have correct name and symbol", async function () {
      expect(await erc20Mock.name()).to.equal("MockToken");
      expect(await erc20Mock.symbol()).to.equal("MTK");
    });

    it("Should mint initial supply to owner", async function () {
      expect(await erc20Mock.balanceOf(owner.address)).to.equal(ethers.parseEther("1000000"));
    });
  });

  describe("WLUX", function () {
    it("Should have correct name and symbol", async function () {
      expect(await wlux.name()).to.equal("Wrapped LUX");
      expect(await wlux.symbol()).to.equal("WLUX");
    });

    it("Should allow minting and burning", async function () {
      await wlux.mint(addr1.address, 100);
      expect(await wlux.balanceOf(addr1.address)).to.equal(100);

      await wlux.burn(addr1.address, 50);
      expect(await wlux.balanceOf(addr1.address)).to.equal(50);
    });
  });

  describe("LUXShare", function () {
    it("Should have correct name and symbol", async function () {
      expect(await luxShare.name()).to.equal("LUXShare");
      expect(await luxShare.symbol()).to.equal("LUXS");
    });

    it("Should allow owner to mint", async function () {
      await luxShare.mint(addr1.address, 100);
      expect(await luxShare.balanceOf(addr1.address)).to.equal(100);
    });
  });

  describe("UniswapV3PoolMock", function () {
    it("Should set correct token addresses", async function () {
      expect(await uniswapV3PoolMock.token0()).to.equal(await wlux.getAddress());
      expect(await uniswapV3PoolMock.token1()).to.equal(await luxShare.getAddress());
    });

    it("Should allow setting and retrieving mock price", async function () {
      await uniswapV3PoolMock.setMockPrice(1000);
      const [tickCumulatives] = await uniswapV3PoolMock.observe([0]);
      expect(tickCumulatives[0]).to.equal(1000);
    });
  });

  describe("LUXSale", function () {
    it("Should initialize correctly", async function () {
      expect(await luxSale.WLUXToken()).to.equal(await wlux.getAddress());
      expect(await luxSale.totalWLUXForSale()).to.equal(ethers.parseEther("1000000"));
    });

    it("Should allow contributions", async function () {
      await erc20Mock.approve(await luxSale.getAddress(), ethers.parseEther("100"));
      await luxSale.contribute(0, await erc20Mock.getAddress(), ethers.parseEther("100"));
      expect(await luxSale.userTotalContributedUSD(owner.address)).to.be.gt(0);
    });
  });

  describe("LUXSaleUtil", function () {
    it("Should retrieve daily totals", async function () {
      const dailyTotals = await luxSaleUtil.dailyTotals();
      expect(dailyTotals.length).to.equal(369);
    });

    it("Should retrieve user buys", async function () {
      const userBuys = await luxSaleUtil.userBuys(owner.address);
      expect(userBuys.length).to.equal(369);
    });
  });
});
