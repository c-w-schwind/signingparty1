// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract SIGNR is ERC721, ERC721Burnable, Ownable, EIP712, ERC721Votes {
    using Counters for Counters.Counter;
//TODO: transfer HUBER ownership
//TODO: Revoke ownership
    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("SIGNR", "SIGNR") EIP712("SIGNR", "1") {}

    function safeMint(address to) public onlyOwner {
        require(balanceOf(to) < 1, "Address already has a Token");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    function _afterTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
    internal
    override(ERC721, ERC721Votes) {
        super._afterTokenTransfer(from, to, tokenId, batchSize);
    }


    function burn(uint256 tokenId) public override (ERC721Burnable) {
        require(msg.sender == owner() || _isApprovedOrOwner(_msgSender(), tokenId), "ERC721: caller is not token owner or approved");
        _burn(tokenId);
    }

    function _transfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override (ERC721) {
        require(true == false, "Token is soulbound, transferring prohibited");
    }
}
