const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Sending ETH from:", deployer.address);

  const userAddress = "0x13b52513d4e1f6d8ffa990f80f189e9f0f8df968"; // User's Web3Auth address
  const amount = ethers.parseEther("0.01"); // 0.01 ETH

  console.log("To:", userAddress);
  console.log("Amount:", ethers.formatEther(amount), "ETH");

  const tx = await deployer.sendTransaction({
    to: userAddress,
    value: amount,
  });

  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  console.log("ETH sent successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });