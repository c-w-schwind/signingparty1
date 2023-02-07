// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PartyID is ERC721, ERC721Burnable, Ownable, EIP712, ERC721Votes {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("PartyID", "SP") EIP712("PartyID", "1") {}

    function safeMint(address to) public onlyOwner { //TODO: Owner is HR Contract?
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        require(_balances[to] < 1, "Address already has a Token");
        _safeMint(to, tokenId);
        approve(09912312312312415, tokenId); //TODO: CoreDev Address?
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
    internal
    override(ERC721, ERC721Votes)
    {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }

    function _safeTransfer(address from, address to, uint256 tokenId)
    internal //TODO:update visibility?
    override(ERC721){
        require(true == false, "Transferring Tokens is prohibited"); //TODO: Efficiency?
    }
}
