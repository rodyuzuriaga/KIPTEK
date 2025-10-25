const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("KIPTEKVoting", function () {
  let voting;
  let owner, addr1, addr2;

  beforeEach(async function () {
    [owner, addr1, addr2] = await ethers.getSigners();
    const KIPTEKVoting = await ethers.getContractFactory("KIPTEKVoting");
    const candidates = ["Candidate A", "Candidate B"];
    const duration = 3600;
    voting = await KIPTEKVoting.deploy(candidates, duration);
    await voting.waitForDeployment();
  });

  it("Should allow voting", async function () {
    await voting.connect(addr1).vote(0);
    const voter = await voting.voters(addr1.address);
    expect(voter.hasVoted).to.be.true;
    expect(voter.vote).to.equal(0);
  });

  it("Should not allow double voting", async function () {
    await voting.connect(addr1).vote(0);
    await expect(voting.connect(addr1).vote(1)).to.be.revertedWith("Already voted");
  });

  it("Should end voting after time", async function () {
    // Fast forward time
    await ethers.provider.send("evm_increaseTime", [3601]);
    await voting.endVoting();
    expect(await voting.votingOpen()).to.be.false;
  });
});