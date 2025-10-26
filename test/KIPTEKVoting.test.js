const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KIPTEKVoting", function () {
  let voting;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const KIPTEKVoting = await ethers.getContractFactory("KIPTEKVoting");
    const candidates = ["Candidate A", "Candidate B"];
    const commitDuration = 3600;
    const revealDuration = 1800;
    voting = await KIPTEKVoting.deploy(candidates, commitDuration, revealDuration);
    await voting.waitForDeployment();
  });

  it("Should allow committing", async function () {
    const commitment = ethers.keccak256(ethers.toUtf8Bytes("test"));
    await voting.connect(addr1).commit(commitment);
    const voter = await voting.voters(addr1.address);
    expect(voter.hasCommitted).to.be.true;
  });

  it("Should not allow double commit", async function () {
    const commitment = ethers.keccak256(ethers.toUtf8Bytes("test"));
    await voting.connect(addr1).commit(commitment);
    await expect(voting.connect(addr1).commit(commitment)).to.be.revertedWith("Already committed");
  });

  it("Should allow reveal after commit phase", async function () {
    const candidateIndex = 0;
    const salt = 12345;
    const commitment = ethers.keccak256(ethers.solidityPacked(["uint256", "uint256", "address"], [candidateIndex, salt, addr1.address]));
    await voting.connect(addr1).commit(commitment);

    // End commit phase
    await ethers.provider.send("evm_increaseTime", [3601]); // Past commit end
    await voting.startRevealPhase();

    await voting.connect(addr1).reveal(candidateIndex, salt);
    const voter = await voting.voters(addr1.address);
    expect(voter.hasRevealed).to.be.true;
    expect(voter.vote).to.equal(candidateIndex);
  });

  it("Should not allow invalid reveal", async function () {
    const commitment = ethers.keccak256(ethers.toUtf8Bytes("test"));
    await voting.connect(addr1).commit(commitment);
    await ethers.provider.send("evm_increaseTime", [3601]);
    await voting.startRevealPhase();
    await expect(voting.connect(addr1).reveal(0, 123)).to.be.revertedWith("Invalid reveal");
  });

  it("Should end voting after reveal", async function () {
    // Fast forward time
    await ethers.provider.send("evm_increaseTime", [5401]); // Past reveal end
    await voting.endVoting();
    expect(await voting.revealPhase()).to.be.false;
  });
});