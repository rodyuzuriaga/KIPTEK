const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Starting reveal phase from:", deployer.address);

  const contractAddress = "0x5F1e3b28fa9c9Cd4fc1e38e12f4f7A05F2103011";
  const contract = await ethers.getContractAt("KIPTEKVoting", contractAddress);

  const tx = await contract.startRevealPhase();
  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  console.log("Reveal phase started successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });