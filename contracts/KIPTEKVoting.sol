// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract KIPTEKVoting is Ownable, ReentrancyGuard {
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    struct Voter {
        bool hasCommitted;
        bool hasRevealed;
        bytes32 commitment;
        uint256 vote;
    }

    Candidate[] public candidates;
    mapping(address => Voter) public voters;
    bool public votingOpen;
    bool public revealPhase;
    uint256 public votingEndTime;
    uint256 public revealEndTime;

    event Committed(address indexed voter, bytes32 commitment);
    event Revealed(address indexed voter, uint256 candidateIndex);
    event Voted(address indexed voter, uint256 candidateIndex);
    event VotingStarted(uint256 endTime);
    event VotingEnded();

    constructor(string[] memory candidateNames, uint256 commitDuration, uint256 revealDuration) Ownable(msg.sender) {
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(candidateNames[i], 0));
        }
        votingEndTime = block.timestamp + commitDuration;
        revealEndTime = votingEndTime + revealDuration;
        votingOpen = true;
        revealPhase = false;
        emit VotingStarted(votingEndTime);
    }

    function commit(bytes32 commitment) external nonReentrant {
        require(votingOpen, "Commit phase closed");
        require(!voters[msg.sender].hasCommitted, "Already committed");

        voters[msg.sender] = Voter(true, false, commitment, 0);
        emit Committed(msg.sender, commitment);
    }

    function reveal(uint256 candidateIndex, uint256 salt) external nonReentrant {
        require(!votingOpen && revealPhase, "Reveal phase not active");
        require(voters[msg.sender].hasCommitted, "No commitment found");
        require(!voters[msg.sender].hasRevealed, "Already revealed");
        require(candidateIndex < candidates.length, "Invalid candidate");

        bytes32 expectedCommitment = keccak256(abi.encodePacked(candidateIndex, salt, msg.sender));
        require(expectedCommitment == voters[msg.sender].commitment, "Invalid reveal");

        voters[msg.sender].hasRevealed = true;
        voters[msg.sender].vote = candidateIndex;
        candidates[candidateIndex].voteCount++;
        emit Revealed(msg.sender, candidateIndex);
        emit Voted(msg.sender, candidateIndex);
    }

    function startRevealPhase() external onlyOwner {
        require(block.timestamp >= votingEndTime, "Commit phase not ended");
        require(!revealPhase, "Reveal already started");
        votingOpen = false;
        revealPhase = true;
    }

    function endVoting() external onlyOwner {
        require(block.timestamp >= revealEndTime, "Reveal phase not ended");
        revealPhase = false;
        emit VotingEnded();
    }

    function getWinner() external view returns (string memory winner, uint256 votes) {
        require(!revealPhase && !votingOpen, "Voting still active");
        uint256 maxVotes = 0;
        uint256 winnerIndex = 0;
        for (uint256 i = 0; i < candidates.length; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                winnerIndex = i;
            }
        }
        return (candidates[winnerIndex].name, maxVotes);
    }

    // Placeholder for ZK verification
    function verifyVote(bytes calldata proof) external pure returns (bool) {
        // In real implementation, verify ZK proof for privacy
        return true; // Placeholder
    }

    // Basic identity verification (hash check)
    function verifyIdentity(bytes32 identityHash) external view returns (bool) {
        // Placeholder: In real app, check against off-chain verified hash
        return identityHash != 0; // Simple check
    }
}