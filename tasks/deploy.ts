import { task } from "hardhat/config";

task("deploy_token", "Deploy TEST token").setAction(async (_, { ethers }) => {
  const Token = await ethers.getContractFactory("Token");
  const token = await Token.deploy();
  await token.deployed();
});
