pragma solidity ^0.5.0;

contract Candidate {
	address[] votes;
	bytes32 public id;
	constructor(bytes32 _id) public {
		id = _id;
	}
	function alreadyVoted(address v) internal view returns(uint) {
		uint found = 0;
		for(uint8 i=0; i<votes.length; i++) {
			if(votes[i] == v) {
				found = 1;
			}
		}
		return found;
	}
	function vote(address voter) public {
		if(alreadyVoted(voter) == 0) {
			votes.push(voter);
		}
	}
	function getVoteCount() public view returns(uint) {
		return votes.length;
	}
}