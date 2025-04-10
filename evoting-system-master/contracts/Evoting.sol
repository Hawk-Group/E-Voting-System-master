// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Evoting {
    struct Voter {
        bool registered;
        bool voted;
        address delegate;
        uint vote;
    }

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    address public admin;
    mapping(address => Voter) public voters;
    mapping(uint => Candidate) public candidates;
    uint public candidatesCount;
    uint public totalVotes;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this.");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addCandidate(string memory _name) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    function registerVoter(address _voter) public onlyAdmin {
        require(!voters[_voter].registered, "Voter is already registered.");
        voters[_voter].registered = true;
    }

    function vote(uint _candidateId) public {
        Voter storage sender = voters[msg.sender];
        require(sender.registered, "You are not registered to vote.");
        require(!sender.voted, "You have already voted.");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID.");

        sender.voted = true;
        sender.vote = _candidateId;
        candidates[_candidateId].voteCount++;
        totalVotes++;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        Candidate[] memory _candidates = new Candidate[](candidatesCount);
        for (uint i = 1; i <= candidatesCount; i++) {
            _candidates[i - 1] = candidates[i];
        }
        return _candidates;
    }

    function getResults() public view returns (Candidate[] memory) {
        return getCandidates();
    }
}