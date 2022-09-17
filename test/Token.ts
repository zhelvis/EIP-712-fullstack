import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("Token", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshopt in every test.
  async function deployTokenFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("Token");
    const token = await Token.deploy();

    return { token, owner };
  }

  describe("Deployment", function () {
    it("Should mint tokens to deployer address", async function () {
      const { token, owner } = await loadFixture(deployTokenFixture);

      expect(await token.balanceOf(owner.address)).to.equal(
        await token.totalSupply()
      );
    });
  });
});
