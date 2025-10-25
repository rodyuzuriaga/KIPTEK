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
        bool hasVoted;
        uint256 vote; // 0 for abstain, 1 for candidate1, etc.
        bytes32 commitment; // For ZK privacy (placeholder)
    }

    Candidate[] public candidates;
    mapping(address => Voter) public voters;
    bool public votingOpen;
    uint256 public votingEndTime;

    event Voted(address indexed voter, uint256 candidateIndex);
    event VotingStarted(uint256 endTime);
    event VotingEnded();

    constructor(string[] memory candidateNames, uint256 duration) Ownable(msg.sender) {
        for (uint256 i = 0; i < candidateNames.length; i++) {
            candidates.push(Candidate(candidateNames[i], 0));
        }
        votingEndTime = block.timestamp + duration;
        votingOpen = true;
        emit VotingStarted(votingEndTime);
    }

    function vote(uint256 candidateIndex) external nonReentrant {
        require(votingOpen, "Voting is closed");
        require(!voters[msg.sender].hasVoted, "Already voted");
        require(candidateIndex < candidates.length, "Invalid candidate");

        voters[msg.sender] = Voter(true, candidateIndex, 0); // Placeholder for commitment
        candidates[candidateIndex].voteCount++;
        emit Voted(msg.sender, candidateIndex);
    }

    function endVoting() external onlyOwner {
        require(block.timestamp >= votingEndTime, "Voting not ended yet");
        votingOpen = false;
        emit VotingEnded();
    }

    function getWinner() external view returns (string memory winner, uint256 votes) {
        require(!votingOpen, "Voting still open");
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
}