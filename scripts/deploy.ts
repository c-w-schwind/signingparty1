import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployer address: ", deployer.address)
  console.log("Account Balance: ", (await deployer.getBalance()).toString());

  const PartyID = await ethers.getContractFactory("PartyID");
  const partyID = await PartyID.deploy();
  await partyID.deployed();

  console.log(`ERC721 deployed to ${partyID.address}`);


  const SigningPartyGovernor = await ethers.getContractFactory("SigningPartyGovernor");
  const signingPartyGovernor = await SigningPartyGovernor.deploy(partyID.address);
  await signingPartyGovernor.deployed();

  console.log(`Governor deployed to ${signingPartyGovernor.address}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
