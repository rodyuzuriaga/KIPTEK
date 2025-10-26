const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x5F1e3b28fa9c9Cd4fc1e38e12f4f7A05F2103011";
  const contract = await ethers.getContractAt("KIPTEKVoting", contractAddress);

  console.log("Contract address:", contractAddress);

  const votingOpen = await contract.votingOpen();
  const revealPhase = await contract.revealPhase();
  const owner = await contract.owner();

  console.log("Voting open:", votingOpen);
  console.log("Reveal phase:", revealPhase);
  console.log("Owner:", owner);

  const candidateA = await contract.candidates(0);
  const candidateB = await contract.candidates(1);

  console.log("Candidate A:", candidateA);
  console.log("Candidate B:", candidateB);

  const userAddress = "0x13b52513d4e1f6d8ffa990f80f189e9f0f8df968";

  const hasCommitted = await contract.hasCommitted(userAddress);
  const hasRevealed = await contract.hasRevealed(userAddress);
  const balance = await contract.balanceOf(userAddress);

  console.log("User address:", userAddress);
  console.log("Has committed:", hasCommitted);
  console.log("Has revealed:", hasRevealed);
  console.log("Balance:", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });