# Daily News NFT

The Daily News NFT project aims to create a decentralized platform for representing daily news as non-fungible tokens (NFTs) on the Ethereum blockchain. By leveraging the power of NFTs, we can provide a unique and immutable way to capture and preserve important news events.

## Project Overview

In this project, we are developing a smart contract called `DailyNewsNFT` that allows users to mint NFTs representing daily news headlines. Each NFT contains metadata such as the headline, a link to the full article, and a timestamp of when the NFT was minted.

The main goals of this project are:
- To create a decentralized and transparent system for recording and verifying news events.
- To provide a unique and collectible representation of news articles as NFTs.
- To explore the potential of NFTs in the realm of digital media and journalism.
- To implement a decentralized voting mechanism for selecting the "News of the Day" among onboarded journalists.


### News NFTs as Snapshots of History

The Daily News NFT project not only provides a unique and collectible representation of news articles but also serves as a powerful tool for capturing and preserving historical moments. Just like flipping through the pages of a history book, browsing through the collection of Daily News NFTs allows you to witness the major events that occurred at specific points in time.

Imagine being able to look back and see the NFTs representing the day a groundbreaking scientific discovery was announced, a pivotal political event unfolded, or a cultural phenomenon captured the world's attention. The Daily News NFTs create a chronological record of history, allowing future generations to explore and understand the key moments that defined our time.

By leveraging the power of blockchain technology, the Daily News NFT project ensures that these historical snapshots are permanently recorded and resistant to censorship or alteration. The decentralized nature of NFTs guarantees that the news events captured within them will endure, even if the original sources or articles become unavailable. In essence, the "News of the Day" becomes a "blockchain of news," creating an immutable and transparent record of history.


Through the Daily News NFT project, we aim to create a decentralized and immutable archive of history, one news event at a time. By collecting and preserving these NFTs, we are not only creating a valuable digital asset but also contributing to the conservation of our shared human experience.

### Why Own a Daily News NFT?

Owning a Daily News NFT is more than just possessing a unique digital asset; it's a chance to be part of history in the making. Here are some compelling reasons why you should consider adding a Daily News NFT to your collection:

1. **Own a Piece of History:** Each Daily News NFT represents a significant moment in time, capturing the most important news event of the day. By owning these NFTs, you become a custodian of history, preserving and celebrating the key milestones that shape our world.

2. **Unique and Valuable Collectibles:** Daily News NFTs are one-of-a-kind digital collectibles that cannot be replicated or duplicated. As the project gains traction and the collection grows, the rarity and value of these NFTs are likely to increase, making them a potential investment opportunity.

3. **Show Your Support for Decentralized Journalism:** By owning a Daily News NFT, you are supporting the vision of decentralized and transparent journalism. You are contributing to a project that aims to create an immutable and censorship-resistant record of news history, ensuring that the truth remains accessible to future generations.

4. **Engage with a Community of News Enthusiasts:** Owning a Daily News NFT grants you access to a vibrant community of news enthusiasts, journalists, and collectors who share your passion for staying informed and preserving history. Engage in discussions, share insights, and be part of a movement that values the importance of accurate and unbiased news reporting.

5. **Leave a Legacy:** By collecting Daily News NFTs, you are creating a personal legacy that can be passed down to future generations. Your collection will serve as a testament to the news events that mattered to you and the world during your lifetime, providing a unique and valuable inheritance for your descendants.


## Decentralized Voting

One of the key features of the Daily News NFT project is the implementation of a decentralized voting system among well-established and onboarded journalists. This voting mechanism allows journalists to collectively select the most significant news event of the day, which will be minted as an NFT.

The decentralized voting process ensures transparency and fairness in the selection of the "News of the Day." By leveraging blockchain technology, we can create a tamper-proof and auditable voting system where each journalist's vote is recorded on the blockchain. This eliminates the need for a central authority and provides a high level of trust and credibility in the selection process.

The benefits of decentralized voting in the Daily News NFT project include:

1. Transparency: All votes cast by journalists are recorded on the blockchain, making the voting process completely transparent and verifiable. Anyone can audit the votes and ensure the integrity of the selection process.

2. Immutability: Once a vote is recorded on the blockchain, it cannot be altered or deleted. This ensures that the voting results are permanent and resistant to tampering.

3. Fairness: Each onboarded journalist has an equal opportunity to participate in the voting process. No single entity can manipulate or control the outcome of the vote.

4. Decentralization: The decentralized nature of the voting system eliminates the need for a central authority to manage or oversee the voting process. This reduces the risk of corruption, censorship, or bias in the selection of the "News of the Day."

By implementing decentralized voting, the Daily News NFT project aims to create a trusted and transparent system for selecting and preserving significant news events as NFTs.

### Approaches to Decentralized Voting

To implement decentralized voting for selecting the "News of the Day," we are considering the following technical approaches:

1. Smart Contract-based Voting:
   - Develop a separate smart contract specifically for voting functionality.
   - Onboarded journalists will be assigned unique identities or tokens that grant them voting rights.
   - Journalists can cast their votes by interacting with the voting smart contract, specifying their preferred news event.
   - The smart contract will tally the votes and determine the winning news event based on the majority or a predefined voting threshold.
   - The winning news event will be communicated to the `DailyNewsNFT` contract for minting as an NFT.
   - The voting process and results will be transparently recorded on the blockchain, ensuring immutability and auditability.

2. Token-based Voting:
   - Create a custom ERC20 token specifically for voting purposes.
   - Distribute voting tokens to onboarded journalists based on their credentials and reputation.
   - Journalists can cast their votes by transferring their voting tokens to designated voting addresses or contracts corresponding to their preferred news events.
   - The news event with the highest number of voting tokens received will be considered the winner.
   - The winning news event will be communicated to the `DailyNewsNFT` contract for minting as an NFT.
   - The token transfers and voting results will be recorded on the blockchain, providing transparency and verifiability.

These are just a couple of potential approaches to implement decentralized voting in the Daily News NFT project. The actual implementation will involve additional considerations such as user authentication, vote verification, and security measures to prevent voter fraud or manipulation.

We will continue to research and evaluate the most suitable approach based on factors such as scalability, user experience, and the specific requirements of our project. The chosen approach will be designed to ensure a fair, transparent, and tamper-proof voting process for selecting the "News of the Day."

## Technical Details

The `DailyNewsNFT` smart contract is built using Solidity, the primary programming language for Ethereum smart contracts. We are using the OpenZeppelin library, a widely-used and audited framework for secure smart contract development, to leverage its implementations of the ERC721 token standard for NFTs.


## Decentralized Storage with IPFS

Instead of using a centralized storage system like DynamoDB.This project leverages the InterPlanetary File System (IPFS) to store and retrieve headline links in a decentralized manner. IPFS is a distributed file storage system that allows for efficient and resilient storage and sharing of data across a network of nodes.

**Why IPFS?**

We have chosen to integrate IPFS into our project for the following reasons:

Decentralization: IPFS provides a decentralized storage solution, ensuring that the headline links are not reliant on a single centralized server or point of failure. This enhances the availability and reliability of the data.
Immutability: Once data is stored on IPFS, it becomes content-addressed and immutable. This means that the headline links cannot be altered or tampered with, providing data integrity and trust.
Efficient Distribution: IPFS enables efficient distribution of data across the network. Nodes can retrieve data from the nearest available peer, reducing latency and bandwidth usage.
Resilience: IPFS is designed to be resilient against node failures and network disruptions. Even if some nodes go offline, the data remains accessible as long as at least one node hosting the data is available.

**How We Use IPFS**
In our project, we use IPFS to store and retrieve the headline links associated with our application. We have implemented two scripts to interact with IPFS:

`store_headline_links.js`: This script allows us to store headline links on IPFS. It takes an array of headline links as command-line arguments, prepares the data as a JSON file, and uploads it to IPFS using the Pinata API. Pinata is a pinning service that ensures the data remains accessible on IPFS by persistently storing it on their nodes. The script returns the IPFS hash (content identifier) of the uploaded file.
`get_metadata.js`: This script retrieves the headline links from IPFS using the IPFS hash obtained from the store_headline_links.js script. It fetches the file from IPFS using the Pinata gateway, parses the JSON data, and extracts the headline links. The script then logs the retrieved headline links to the console.

By utilizing IPFS and Pinata, we ensure that the headline links are stored in a decentralized and immutable manner, providing enhanced accessibility and data integrity.

**Pinata Integration**

To facilitate the storage and retrieval of data on IPFS, we have integrated Pinata, a popular IPFS pinning service. Pinata provides a reliable and easy-to-use API for interacting with IPFS.
We use Pinata for the following purposes:

Pinning: When we store headline links using the store_headline_links.js script, Pinata ensures that the data is persistently stored on IPFS by pinning it on their nodes. This guarantees that the data remains accessible even if the original node that uploaded it goes offline.
Gateways: Pinata provides a dedicated IPFS gateway (https://gateway.pinata.cloud/ipfs/{hash}) that allows us to retrieve the stored data using a simple HTTP request. In the get_metadata.js script, we use the Pinata gateway to fetch the file from IPFS.

To use Pinata, we have obtained an API key and stored it securely in a .env file. The scripts read the API key from the environment variables to authenticate with the Pinata API.

## Blockchain Cost Analysis:
By utilizing IPFS for storing headline links and only storing the IPFS hash reference on-chain, we can significantly reduce the storage costs associated with minting NFTs in the Daily News NFT project. Based on the assumptions mentioned earlier, using IPFS results in a daily cost of 0.000689 ETH ($2.41) compared to 0.003129 ETH ($10.95) when storing the links directly on-chain. This represents a daily cost reduction of 0.002440 ETH ($8.54), or approximately 78%.
On an annual basis, the cost savings are even more substantial. Storing the links on IPFS would cost 0.251485 ETH ($880.20) per year, while storing them directly on-chain would cost 1.142035 ETH ($3,997.12) per year. By leveraging IPFS, we can save 0.890550 ETH ($3,116.92) annually, providing significant cost efficiency for the project.

### Solidity Version

We are using Solidity version 0.8.13 for this project. The choice of this version is based on the following considerations:
- Compatibility with the latest stable version of the OpenZeppelin library (version 4.x).
- Improved security features and bug fixes compared to older versions.
- Consistency with the Truffle development framework's default Solidity compiler version.

### Smart Contract Functionality

The `DailyNewsNFT` smart contract provides the following key functionalities:
- `mintNewsNFT`: Allows users to mint a new NFT by providing a headline and a link to the full article. The function assigns a unique token ID to each minted NFT and stores the metadata associated with it.
- `getNewsNFTsByDate`: Retrieves all the NewsNFTs minted for a specific date.
- `tokenURI`: Retrieves the metadata URI for a given NFT token ID. The metadata includes the headline, article link, and timestamp of the minted NFT.
- `ownerOf`: Returns the owner address of a specific NFT token ID.
- `supportsInterface`: Checks if the contract implements a specific interface, following the ERC721 standard.

**NFT Metadata**

The token URI is stored as a base64-encoded string. This base64-encoded string contains the JSON metadata, including the headline and the IPFS hash of the headline lists.
When someone wants to retrieve the metadata of an NFT, they can fetch the token URI from the blockchain and decode the base64-encoded string to obtain the JSON metadata. They can then extract the relevant information, such as the headline and the IPFS hash of the headline lists, from the decoded JSON.
By storing the metadata as a base64-encoded string on the blockchain, it allows for efficient storage and retrieval of the token metadata without storing the full JSON object directly on the blockchain. The actual content, such as the headline lists, is stored off-chain on IPFS, and the IPFS hash is included in the token metadata to reference that off-chain data.

### Development Environment

We are using the Truffle development framework to compile, test, and deploy our smart contract. Truffle provides a convenient and structured way to manage the development lifecycle of Ethereum smart contracts.

The project also utilizes Ganache, a local Ethereum blockchain development environment, for testing and deploying the contract locally.

#### Package Management

We use npm (Node Package Manager) to manage the project's dependencies. The project includes two important files related to package management:

1. `package.json`: This file contains metadata about the project, such as the project name, version, description, and dependencies. It lists the project's runtime and development dependencies, along with their version ranges.

2. `package-lock.json`: This file is automatically generated by npm and contains a detailed record of the exact versions of each dependency installed in the project. It ensures reproducible builds across different environments. By committing this file to version control, we can ensure that all developers working on the project have consistent dependency versions.

When you clone the project repository and run `npm install`, npm will install the exact versions of the dependencies specified in the `package-lock.json` file, ensuring a consistent development environment.

#### Testing with MetaMask, Alchemy, and Sepolia

For testing and deployment purposes, we use the following combination of tools:

1. MetaMask: MetaMask is a popular browser extension that allows users to interact with Ethereum dapps. It provides a secure wallet for managing Ethereum accounts and signing transactions. We use MetaMask to connect to the Sepolia testnet and interact with our deployed smart contracts.

2. Alchemy: Alchemy is a blockchain development platform that provides enhanced APIs and tools for Ethereum developers. We use Alchemy's API service to connect to the Sepolia testnet, deploy our contracts, and interact with them. Alchemy provides reliable and scalable access to the Ethereum network.

3. Sepolia Testnet: Sepolia is an Ethereum testnet that allows developers to test their smart contracts and dapps in a safe and controlled environment without using real Ether. We deploy our contracts to the Sepolia testnet using Truffle and Alchemy, and we can interact with them using MetaMask.

To set up the testing environment, make sure you have MetaMask installed in your browser, an Alchemy account with an API key, and Sepolia testnet Ether in your MetaMask wallet. The project's Truffle configuration file (`truffle-config.js`) is set up to use the Sepolia testnet and connect to Alchemy's API.

### Deployment

The smart contract can be deployed to the Ethereum network using Truffle's migration scripts. The `truffle-config.js` file contains the necessary configuration settings for deploying to different networks, including local development networks like Ganache and public test networks like Ropsten or Rinkeby.

### Scripts

The project includes two additional scripts to facilitate NFT minting and metadata retrieval:

1. `mint_nft.js`: This script allows you to mint new NFTs by providing the date, headline and article link. It interacts with the deployed `DailyNewsNFT` contract and mints NFTs for specified accounts. You can customize the script to mint NFTs with different metadata and for different accounts as needed.

2. `get_metadata.js`: This script retrieves the metadata details of minted NFTs. It iterates over a range of token IDs and fetches the metadata associated with each token, including the headline, article link, timestamp, and token URI. The script provides a convenient way to verify and test the metadata stored in the smart contract.

These scripts can be executed using the Truffle CLI and provide a streamlined way to interact with the smart contract for minting NFTs and retrieving their metadata.

The scripts corresponding to sepolia network are mentioned in TESTING-sepolia.md

## Getting Started

To get started with the Daily News NFT project, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/daily-news-nft.git`
2. Install the required dependencies: `npm install`
3. Compile the smart contract: `truffle compile`
4. Run the unit tests: `truffle test`
5. Deploy the contract locally: `truffle migrate --network development`
6. Interact with the contract using the Truffle console: `truffle console --network development`
7. Mint NFTs using the `mint_nft.js` script: `truffle exec scripts/mint_nft.js --network development`
8. Retrieve NFT metadata using the `get_metadata.js` script: `truffle exec scripts/get_metadata.js --network development`
9. Deploy the contract to the Sepolia testnet: `truffle migrate --network sepolia`
10. Mint NFTs on Sepolia using the `mint_nft_sepolia.js` script: `node scripts/mint_nft_sepolia.js <date> <headline> <article_link>`
11. Retrieve NFT metadata on Sepolia using the `get_metadata_sepolia.js` script: `node scripts/get_metadata_sepolia.js <token_id>`
12. Retrieve all NFTs for a specific date on Sepolia using the `get_all_nft_for_date_sepolia.js` script: `node scripts/get_all_nft_for_date_sepolia.js <date>`



For more detailed instructions and examples, please refer to the documentation in the `docs` directory.

## Future Enhancements

We have plans to extend the functionality of the Daily News NFT project in the following ways:
- Implement a user-friendly web interface for minting and managing NFTs.
- Explore the integration of decentralized storage solutions like IPFS for storing NFT metadata off-chain.
- Investigate the possibility of creating a marketplace for trading and collecting daily news NFTs.
- Collaborate with news organizations and journalists to bring real-world adoption and value to the project.

We welcome contributions, suggestions, and feedback from the community to help shape the future of the Daily News NFT project.

## License

This project is released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.