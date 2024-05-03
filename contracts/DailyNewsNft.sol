// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract DailyNewsNFT is ERC721, ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    event NewsMinted(uint256 indexed tokenId, string headline, uint256 timestamp);

    constructor() ERC721("DailyNewsNFT", "DNFT") {}

    function mintNewsNFT(string memory headline, string memory headlineListsIPFS) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(msg.sender, tokenId);

        string memory nftTokenURI = formatTokenURI(tokenId, headline, headlineListsIPFS);
        _setTokenURI(tokenId, nftTokenURI);

        emit NewsMinted(tokenId, headline, block.timestamp);
    }

    function formatTokenURI(uint256 tokenId, string memory headline, string memory headlineListsIPFS) internal pure returns (string memory) {
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        "Daily News NFT #",
                        Strings.toString(tokenId),
                        '", "description": "Daily news represented as an NFT", ',
                        '"headline": "',
                        headline,
                        '", "headlineListsIPFS": "',
                        headlineListsIPFS,
                        '"}'
                    )
                )
            )
        );

        string memory output = string(abi.encodePacked("data:application/json;base64,", json));
        return output;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}