import { expect } from "chai";
import { ethers } from "hardhat";
import { WLUX } from "../typechain-types/WLUX";

describe("WLUX Token Contract", function () {
  let wlux: WLUX;
  let owner: any;
  let addr1: any;
  let addr2: any;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const WLUX = await ethers.getContractFactory("WLUX");
    [owner, addr1, addr2] = await ethers.getSigners();

    // Deploy the WLUX contract with an initial supply
    wlux = (await WLUX.deploy(ethers.utils.parseEther("1000000"))) as WLUX;
    await wlux.deployed();
  });

  it("Should assign the total supply of tokens to the owner", async function () {
    const ownerBalance = await wlux.balanceOf(owner.address);
    expect(await wlux.totalSupply()).to.equal(ownerBalance);
  });

  it("Should allow owner to mint tokens", async function () {
    await wlux.mint(addr1.address, ethers.utils.parseEther("1000"));
    const balance = await wlux.balanceOf(addr1.address);
    expect(balance).to.equal(ethers.utils.parseEther("1000"));
  });

  it("Should allow tokens to be transferred between accounts", async function () {
    // Transfer 500 tokens from owner to addr1
    await wlux.transfer(addr1.address, ethers.utils.parseEther("500"));
    const addr1Balance = await wlux.balanceOf(addr1.address);
    expect(addr1Balance).to.equal(ethers.utils.parseEther("500"));

    // Transfer 200 tokens from addr1 to addr2
    await wlux.connect(addr1).transfer(addr2.address, ethers.utils.parseEther("200"));
    const addr2Balance = await wlux.balanceOf(addr2.address);
    expect(addr2Balance).to.equal(ethers.utils.parseEther("200"));
  });

  it("Should allow owner to burn tokens", async function () {
    // Owner burns 1000 tokens from their balance
    await wlux.burn(owner.address, ethers.utils.parseEther("1000"));
    const ownerBalance = await wlux.balanceOf(owner.address);
    expect(ownerBalance).to.equal(ethers.utils.parseEther("999000"));

    const totalSupply = await wlux.totalSupply();
    expect(totalSupply).to.equal(ethers.utils.parseEther("999000"));
  });

  it("Should fail when non-owner tries to mint tokens", async function () {
    await expect(
      wlux.connect(addr1).mint(addr1.address, ethers.utils.parseEther("1000"))
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Should fail when non-owner tries to burn tokens", async function () {
    await expect(
      wlux.connect(addr1).burn(addr1.address, ethers.utils.parseEther("1000"))
    ).to.be.revertedWith("Ownable: caller is not the owner");
  });
});
