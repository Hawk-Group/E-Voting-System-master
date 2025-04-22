// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Evoting {
    address public admin;
    uint public candidateCount;
    uint public totalVotes;

    struct Candidate {
        uint id;
        string name;
        string party;
        string constituency;
        uint voteCount;
        bool isActive;
    }

    struct Voter {
        bool registered;
        bool voted;
        address delegate;
        uint vote;
    }

    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this.");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(voters[msg.sender].registered, "You are not a registered voter.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerVoter(address _voter) public onlyAdmin {
        require(!voters[_voter].registered, "Voter already registered.");
        voters[_voter].registered = true;
    }

    function addCandidate(string memory _name, string memory _party, string memory _constituency) public onlyAdmin {
        candidates[candidateCount] = Candidate(candidateCount, _name, _party, _constituency, 0, true);
        candidateCount++;
    }

    function removeCandidate(uint _candidateId) public onlyAdmin {
        require(_candidateId < candidateCount, "Invalid candidate ID");
        require(candidates[_candidateId].isActive, "Candidate already removed.");
        candidates[_candidateId].isActive = false;
    }

    function vote(uint _candidateId) public onlyRegisteredVoter {
        Voter storage sender = voters[msg.sender];

        require(!sender.voted, "You have already voted.");
        require(_candidateId < candidateCount, "Invalid candidate ID.");
        require(candidates[_candidateId].isActive, "Candidate not active.");

        sender.voted = true;
        sender.vote = _candidateId;

        candidates[_candidateId].voteCount++;
        totalVotes++;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory temp = new Candidate[](candidateCount);
        uint counter = 0;
        for (uint i = 0; i < candidateCount; i++) {
            if (candidates[i].isActive) {
                temp[counter] = candidates[i];
                counter++;
            }
        }
        // Create exact size array
        Candidate[] memory activeCandidates = new Candidate[](counter);
        for (uint j = 0; j < counter; j++) {
            activeCandidates[j] = temp[j];
        }
        return activeCandidates;
    }

    function getAllCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory allCandidates = new Candidate[](candidateCount);
        for (uint i = 0; i < candidateCount; i++) {
            allCandidates[i] = candidates[i];
        }
        return allCandidates;
    }

    function getResults() public view returns (Candidate[] memory) {
        return getCandidates();
    }

    function isRegistered(address _voter) public view returns (bool) {
        return voters[_voter].registered;
    }

    function hasVoted(address _voter) public view returns (bool) {
        return voters[_voter].voted;
    }
}
