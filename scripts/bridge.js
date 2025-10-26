const ethers = require("ethers");

async function main() {
  const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia.publicnode.com"); // Sepolia RPC
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const l1GatewayRouter = "0x73a79fab691548bdbda3d0275b3ea89d4e8a4a3b"; // L1 Gateway Router on Sepolia
  const to = "0xe8D437d2fE3FDe5934377E819b5e176FD6FB2967"; // Same address on L2
  const amount = ethers.parseEther("0.01"); // Bridge 0.01 ETH

  const contract = new ethers.Contract(l1GatewayRouter, [
    "function depositETH(address to, uint256 amount, uint256 gasLimit) payable"
  ], wallet);

  console.log("Bridging ETH from Sepolia to Scroll Sepolia...");
  const tx = await contract.depositETH(to, amount, 200000, { value: amount, gasLimit: 300000 });
  console.log("Transaction hash:", tx.hash);
  await tx.wait();
  console.log("Bridge complete! ETH should arrive in Scroll Sepolia soon.");
}

main().catch(console.error);