pragma solidity ^0.5.0;

import './Candidate.sol';

contract UpVoting {
	event Voted(address sender, bytes32 vote);
	mapping(bytes32 => Candidate) candidates;
	address owner;

	constructor() public {
		owner = msg.sender;
	}

	function vote(bytes32 name) public {
		if(address(candidates[name]) == address(0)) {
			candidates[name] = new Candidate(name);
		}
		candidates[name].vote(msg.sender);
		emit Voted(msg.sender, name);
	}
	function voteFor(bytes32 name, address voter) public {
		// require(msg.sender == owner, "Only contract owner could send delegate vote");
		if(address(candidates[name]) == address(0)) {
			candidates[name] = new Candidate(name);
		}
		candidates[name].vote(voter);
		emit Voted(voter, name);
	}
	function getCandidate(bytes32 name) public view returns(address) {
		return address(candidates[name]);
	}
	function getVotes(bytes32 name) public view returns(uint) {
		return candidates[name].getVoteCount();
	}
}