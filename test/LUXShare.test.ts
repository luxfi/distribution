import { expect } from "chai";
import { ethers } from "hardhat";
import { LUXShare } from "../typechain-types/LUXShare";

describe("LUXShare Token Contract", function () {
  let luxShare: LUXShare;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    const LUXShare = await ethers.getContractFactory("LUXShare");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the LUXShare contract
    luxShare = (await LUXShare.deploy("LUX Share", "LS")) as LUXShare;
    await luxShare.deployed();
  });

  it("Should allow owner to mint tokens", async function () {
    await luxShare.mint(owner.address, ethers.utils.parseEther("1000000"));
    const ownerBalance = await luxShare.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.utils.parseEther("1000000"));
  });

  it("Should allow tokens to be transferred between accounts", async function () {
    await luxShare.mint(owner.address, ethers.utils.parseEther("1000000"));

    // Transfer 500 tokens from owner to addr1
    await luxShare.transfer(addr1.address, ethers.utils.parseEther("500"));
    const addr1Balance = await luxShare.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.utils.parseEther("500"));

    // Transfer 200 tokens from addr1 to addr2
    await luxShare.connect(addr1).transfer(addr2.address, ethers.utils.parseEther("200"));
    const addr2Balance = await luxShare.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(ethers.utils.parseEther("200"));
  });

  it("Should fail when non-owner tries to mint tokens", async function () {
    await expect(
      luxShare.connect(addr1).mint(addr1.address, ethers.utils.parseEther("1000"))
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
