import { expect } from "chai";
import { ethers } from "hardhat";
import { SignerWithAddress } from "@nomicfoundation/hardhat-ethers/signers";
import { time } from "@nomicfoundation/hardhat-network-helpers";
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

  const DAYS = 369;
  const TOTAL_SUPPLY = ethers.parseEther("1000000");

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

    await uniswapV3PoolMock.setMockPrice(ethers.parseEther("1")); // 1 USD per token

    const currentTime = await time.latest();
    const openTime = BigInt(currentTime) + BigInt(3600); // 1 hour from now
    const startTime = openTime + BigInt(86400); // 24 hours after open time
    const LUXSale = await ethers.getContractFactory("LUXSale");
    luxSale = await LUXSale.deploy(
      await wlux.getAddress(),
      await uniswapV3PoolMock.getAddress(), // Need to deploy/mock router first
      DAYS,
      ethers.parseEther("1000000"),
      openTime,
      startTime
    );

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

  describe("LUXSale Advanced Tests", function () {
    beforeEach(async function () {
      // Transfer WLUX to LUXSale contract for distribution
      await wlux.mint(await luxSale.getAddress(), TOTAL_SUPPLY);
      // Set mock price in Uniswap pool
      await uniswapV3PoolMock.setMockPrice(ethers.parseEther("1")); // 1 USD per token
    });

    describe("Contribution Period", function () {
      it("Should not allow contributions before sale opens", async function () {
        await expect(
          luxSale.contribute(0, await erc20Mock.getAddress(), ethers.parseEther("100"))
        ).to.be.revertedWith("Sale not open");
      });

      it("Should allow contributions during window", async function () {
        await time.increase(3600); // Move past openTime
        await erc20Mock.approve(await luxSale.getAddress(), ethers.parseEther("100"));

        await luxSale.contribute(0, await erc20Mock.getAddress(), ethers.parseEther("100"));

        const window = await luxSale.getCurrentWindow();
        expect(await luxSale.userBuys(window, owner.address)).to.be.gt(0);
      });

      it("Should track multiple user contributions correctly", async function () {
        await time.increase(3600);
        const amount = ethers.parseEther("100");

        // Setup users
        await erc20Mock.transfer(addr1.address, amount);
        await erc20Mock.transfer(addr2.address, amount);
        await erc20Mock.connect(addr1).approve(await luxSale.getAddress(), amount);
        await erc20Mock.connect(addr2).approve(await luxSale.getAddress(), amount);

        // Make contributions
        await luxSale.connect(addr1).contribute(0, await erc20Mock.getAddress(), amount / BigInt(2));
        await luxSale.connect(addr2).contribute(0, await erc20Mock.getAddress(), amount);

        const window = await luxSale.getCurrentWindow();
        expect(await luxSale.getWindowTotalUSD(window)).to.equal(
          (await luxSale.userBuys(window, addr1.address)) + (await luxSale.userBuys(window, addr2.address))
        );
      });
      describe("Claiming", function () {
        beforeEach(async function () {
          await time.increase(3600); // Move to sale open
          const amount = ethers.parseEther("100");
          await erc20Mock.approve(await luxSale.getAddress(), amount);
          await luxSale.contribute(0, await erc20Mock.getAddress(), amount);
        });

        it("Should not allow claims before window ends", async function () {
          await expect(
            luxSale.claim(0)
          ).to.be.revertedWith("Claim not started");
        });

        it("Should allow claims after window ends", async function () {
          await time.increase(86400); // Move past window end
          const initialBalance = await wlux.balanceOf(owner.address);

          await luxSale.claim(0);

          expect(await wlux.balanceOf(owner.address)).to.be.gt(initialBalance);
        });

        it("Should distribute WLUX proportionally to contributions", async function () {
          await time.increase(3600);
          const amount = ethers.parseEther("100");

          // Setup two users with different contribution amounts
          await erc20Mock.transfer(addr1.address, amount * BigInt(2));
          await erc20Mock.connect(addr1).approve(await luxSale.getAddress(), amount * BigInt(2));
          await luxSale.connect(addr1).contribute(0, await erc20Mock.getAddress(), amount * BigInt(2));

          await time.increase(86400);

          await luxSale.claim(0);
          await luxSale.connect(addr1).claim(0);

          const user1Balance = await wlux.balanceOf(owner.address);
          const user2Balance = await wlux.balanceOf(addr1.address);
          expect(user2Balance).to.be.gt(user1Balance);
          expect(user2Balance / user1Balance).to.equal(2);

        });
      });

      describe("Liquidity Management", function () {
        it("Should add liquidity successfully", async function () {
          const token0Amount = ethers.parseEther("1000");
          const token1Amount = ethers.parseEther("1000");

          await wlux.mint(owner.address, token0Amount);
          await luxShare.mint(owner.address, token1Amount);

          await wlux.approve(await luxSale.getAddress(), token0Amount);
          await luxShare.approve(await luxSale.getAddress(), token1Amount);

          await luxSale.addLiquidityFullRange(
            await wlux.getAddress(),
            await luxShare.getAddress(),
            3000, // 0.3% fee tier
            token0Amount,
            token1Amount
          );
        });
      });
    });

    describe("LUXSaleUtil Advanced Tests", function () {
      it("Should calculate correct daily totals", async function () {
        await time.increase(3600);
        const amount = ethers.parseEther("100");

        // Make contributions across multiple days
        for (let i = 0; i < 3; i++) {
          await erc20Mock.approve(await luxSale.getAddress(), amount);
          await luxSale.contribute(i, await erc20Mock.getAddress(), amount);
          await time.increase(86400);
        }

        const dailyTotals = await luxSaleUtil.dailyTotals();
        expect(dailyTotals[0]).to.be.gt(0);
        expect(dailyTotals[1]).to.be.gt(0);
        expect(dailyTotals[2]).to.be.gt(0);
      });

      it("Should track user participation correctly", async function () {
        await time.increase(3600);
        const amount = ethers.parseEther("100");

        // Make contributions
        await erc20Mock.approve(await luxSale.getAddress(), amount);
        await luxSale.contribute(0, await erc20Mock.getAddress(), amount);

        const userBuys = await luxSaleUtil.userBuys(owner.address);
        expect(userBuys[0]).to.be.gt(0);
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
  })
})
