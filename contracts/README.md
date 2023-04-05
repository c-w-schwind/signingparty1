# signingparty

The signingparty DAO is based on customized openzeppelin's Governor and ERC721 token (which functions as the voting token for the Governor) contracts.
The token's primary function is to serve as a "membership access card" for participation within the governance system (proposing & voting).
It is not transferable (soulbound token) and grants equal voting rights to each member (one person one vote).

The contracts have been deployed on the Polygon network. 

This documentation provides an overview of these contracts, their custom functionality, and the reasons behind the changes.

## Contracts
### 1. SigningPartyGovernor

The SigningPartyGovernor contract is deployed at `0x7E6245d0c16925e25878FFDfC121547Ff538c45a`.

It serves as the base functionality for the signingparty DAO, providing proposal functionality (with attachable actions) and a simple voting mechanism.
The SigningPartyGovernor contract inherits from OpenZeppelin's Governor, GovernorCountingSimple, GovernorVotes, and GovernorVotesQuorumFraction contracts.

- The votingDelay function has been overridden to return a delay of 1 block before the voting starts.
- The votingPeriod function has been overridden to return a period of 302400 blocks (approximately 1 week on the Polygon chain; appr. 2s per block) during which people can cast their votes. One week was chosen as a time constraint to ensure that there is an adequate window for voting.
- The proposalThreshold function has been overridden to return a threshold of 1 vote, meaning that only holders of the SIGNR token can participate in a vote.
- The quorum function is overridden to satisfy Solidity requirements.

### 2. SIGNR

The SIGNR ERC721 token contract is deployed at `0x85F2CF59Acd3AE2F83c4886B9D969Dd71E1D8620`. 

It is conceptualized as a soulbound token allowing its owners to participate in the voting and proposing, meaning that it cannot be transferred from its owner.
The SIGNR token contract inherits from OpenZeppelin's ERC721, ERC721Burnable, Ownable, EIP712, and ERC721Votes contracts.
Custom functionality and changes:

- The safeMint function allows the contract owner to mint tokens to a specified address. The added customized requirement 
    `require(balanceOf(to) < 1, "Address already has a Token");`
    ensures that an address can have only one token.
- The burn function has been overridden to allow the owner of each token to burn their own token. The custom addition to its requirement `msg.sender == owner()` grants the owner of the token contract (signingparty official) burn rights as well. This is only temporary.
- The _transfer function has been overridden to prevent token transfers by setting the condition `true == false`. This effectively makes the token non-transferable and "soulbound". 
- The _afterTokenTransfer function has been overridden to satisfy Solidity requirements.



## Questions & feedback
If you have any questions or need further clarification, please feel free to reach out.
Your feedback is important to us and helps us improve.