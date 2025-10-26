const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const KIPTEKVoting = await ethers.getContractFactory("KIPTEKVoting");
  const candidates = ["Candidate A", "Candidate B"];
  const commitDuration = 3600; // 1 hour for commit
  const revealDuration = 1800; // 30 min for reveal
  const voting = await KIPTEKVoting.deploy(candidates, commitDuration, revealDuration);

  await voting.waitForDeployment();

  console.log("KIPTEKVoting deployed to:", await voting.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });