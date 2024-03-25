// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DailyNewsNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct NewsNFT {
        uint256 tokenId;
        string headline;
        string headlineLink;
        uint256 timestamp;
    }

    mapping(uint256 => NewsNFT) public newsNFTs;

    constructor() ERC721("DailyNewsNFT", "DNFT") {}

    function mintNewsNFT(string memory headline, string memory headlineLink) public {
        require(bytes(headline).length > 0, "Headline cannot be empty");
        require(bytes(headlineLink).length > 0, "Headline link cannot be empty");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        NewsNFT memory newNewsNFT = NewsNFT(
            tokenId,
            headline,
            headlineLink,
            block.timestamp
        );

        newsNFTs[tokenId] = newNewsNFT;

        string memory tokenURI = getTokenURI(tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");

        NewsNFT memory newsNFT = newsNFTs[tokenId];

        string memory json = string(abi.encodePacked(
            '{',
                '"name": "Daily News NFT #', toString(tokenId), '",',
                '"description": "Daily news represented as an NFT",',
                '"headline": "', newsNFT.headline, '",',
                '"headlineLink": "', newsNFT.headlineLink, '"',
            '}'
        ));

        return string(abi.encodePacked(
            "data:application/json;base64,",
            base64(bytes(json))
        ));
    }

    function toString(uint256 value) internal pure returns (string memory) {
        // Function to convert uint256 to string
        // ...
    }

    function base64(bytes memory data) internal pure returns (string memory) {
        // Function to encode bytes to base64 string
        // ...
    }

    // Override required functions from ERC721URIStorage
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }
}