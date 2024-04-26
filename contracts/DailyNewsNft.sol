// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract DailyNewsNFT is ERC721, ERC721URIStorage {
    uint256 internal _nextTokenId;

    struct NewsNFT {
        uint256 tokenId;
        string headline;
        string headlineLink;
        uint256 timestamp;
    }

    // TODO: Review the storage of metadata using the newsNFTs mapping.
    // On-chain metadata storage: By storing the metadata directly in the smart contract
    // using the newsNFTs mapping, you ensure that the metadata is immutable and tamper-proof.
    // Once the metadata is set for a token ID, it cannot be modified or deleted, providing
    // a permanent record of the token's metadata on the blockchain.
    //
    // Consider the trade-offs between on-chain and off-chain storage, gas costs,
    // and flexibility in metadata management. Evaluate alternative approaches,
    // such as storing only essential metadata on-chain and referencing off-chain
    // storage for additional details. Update the contract accordingly based on
    // the project's requirements and scalability needs.
    mapping(uint256 => NewsNFT) public newsNFTs;

    constructor() ERC721("DailyNewsNFT", "DNFT") {
        _nextTokenId = 1;
    }

    function mintNewsNFT(string memory headline, string memory headlineLink) public {
        require(bytes(headline).length > 0, "Headline cannot be empty");
        require(bytes(headlineLink).length > 0, "Headline link cannot be empty");
        
        uint256 tokenId = _nextTokenId;
        _nextTokenId++;
        _safeMint(msg.sender, tokenId);

        // Create a new NewsNFT struct and store it in the newsNFTs mapping
        // TODO: Explore storing metadata off-chain using decentralized storage (e.g., IPFS)
        NewsNFT memory newNewsNFT = NewsNFT(
            tokenId,
            headline,
            headlineLink,
            block.timestamp
        );

        newsNFTs[tokenId] = newNewsNFT;

        string memory newsTokenURI = getTokenURI(tokenId);
        _setTokenURI(tokenId, newsTokenURI);
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Token does not exist");

        // Retrieve the NewsNFT struct from the newsNFTs mapping
        // TODO: Retrieve metadata from decentralized storage instead of on-chain
        NewsNFT memory newsNFT = newsNFTs[tokenId];

        string memory json = string(abi.encodePacked(
            '{',
                '"name": "Daily News NFT #', Strings.toString(tokenId), '",',
                '"description": "Daily news represented as an NFT",',
                '"headline": "', newsNFT.headline, '",',
                '"headlineLink": "', newsNFT.headlineLink, '"',
            '}'
        ));

        return string(abi.encodePacked(
            "data:application/json;base64,",
            Base64.encode(bytes(json))
        ));
    }

    
    // Override the _burn function
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

}