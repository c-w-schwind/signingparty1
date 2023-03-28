// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";

contract SigningPartyGovernor is Governor, GovernorCountingSimple, GovernorVotes, GovernorVotesQuorumFraction {
    constructor(IVotes _token)
    Governor("signingpartyGovernor")
    GovernorVotes(_token)
    GovernorVotesQuorumFraction(4)
    {}

    //Delay since proposal is created until voting starts.
    function votingDelay() public pure override returns (uint256) {
        return 1; // 1 block: ETh ~12s
    }

    //Length of period during which people can cast their vote.
    function votingPeriod() public pure override returns (uint256) {
        return 50400; // 1 week
    }

    function proposalThreshold() public pure override returns (uint256) {
        return 1;
    }

    // The following functions are overrides required by Solidity.

    function quorum(uint256 blockNumber) public view override(IGovernor, GovernorVotesQuorumFraction) returns (uint256){
        return super.quorum(blockNumber);
    }
}