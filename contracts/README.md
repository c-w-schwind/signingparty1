# signingparty

The signingparty DAO utilizes customized versions of OpenZeppelin's Governor and ERC721 token contracts, with the latter operating as the voting token for the Governor.
This token principally acts as a "membership access card," enabling participation within the governance framework (proposal & voting). 
It is non-transferable (soulbound token), guaranteeing equal voting rights to each member in a one person, one vote system.

The contracts have been deployed on the Polygon network. 

This documentation provides an overview of these contracts, their custom functionality, and the reasons behind the changes.

## Contracts
### 1. SigningPartyGovernor

The SigningPartyGovernor contract is deployed at `0xD75c4ad933FB9BcDc3818F8512F04559D7767102`.

This contract forms the foundational framework for the signingparty DAO, offering proposal functionality (with attachable actions) and a basic voting system.
It extends OpenZeppelin's Governor, GovernorCountingSimple, GovernorVotes, and GovernorVotesQuorumFraction contracts.

Custom functionality and changes:

- The votingDelay function has been overridden to return a delay of 1 block before the voting starts.
- The votingPeriod function has been overridden to return a period of 302400 blocks (approximately 1 week on the Polygon chain; appr. 2s per block) during which people can cast their votes. One week was chosen as a time constraint to ensure that there is an adequate window for voting.
- The proposalThreshold function has been overridden to return a threshold of 1 vote, meaning that only holders of the SIGNR token can participate in a vote.
- The quorum function is overridden to satisfy Solidity requirements.

### 2. SIGNR

The SIGNR ERC721 token contract is deployed at `0xE05df9E27d68Fa7B6300E626604DbfFCf9576ce4`. 

Designed as a soulbound token, SIGNR enables its holders to vote and propose. 
The token cannot be transferred from its holder. 
It derives from OpenZeppelin's ERC721, ERC721Burnable, Ownable, EIP712, and ERC721Votes contracts. 

Custom functionality and changes:

- The safeMint function allows the contract owner to mint tokens to a specified address. A custom requirement,
  `require(balanceOf(to) < 1, "Address already has a Token");
  ensures a single token per address.
- The burn function has been overridden to allow the owner of each token to burn their own token. The custom condition `msg.sender == owner() also gives the token contract owner (signingparty official) burning rights. This is a temporary measure.
- The _transfer function has been overridden to prevent token transfers by setting the condition `true == false`. This effectively makes the token non-transferable and "soulbound". 
- The _afterTokenTransfer function has been overridden to satisfy Solidity requirements.
- A _tokenURI state variable and a setTokenURI function have been added to provide and alter the URI for the governance token image.
- The tokenURI function has been overridden to return the _tokenURI variable for all SBTs (since they are governance tokens, not individual NFTs).



## Questions & feedback
Should you have any questions or require further clarification, do not hesitate to reach out.
Your feedback is invaluable to us and aids in our continual improvement.