# Testing the Daily News NFT Project

This document provides detailed information about testing and interacting with the Daily News NFT project.

## Test Network

We are currently using the Sepolia testnet for testing and deploying the `DailyNewsNFT` smart contract. Sepolia is an Ethereum test network that allows developers to test their contracts and applications in a safe and controlled environment without using real Ether.

To interact with the contract on the Sepolia testnet, you need to have a Sepolia-compatible wallet (e.g., MetaMask) and some Sepolia Ether. You can obtain Sepolia Ether from faucets like https://faucet.sepolia.dev/ or https://sepoliafaucet.com/.

## Minting NFTs

To mint NFTs on the Sepolia testnet, use the `mint_nft_sepolia.js` script located in the `scripts` directory. This script allows you to mint new NFTs by providing the headline and article link.

To run the minting script, use the following command:

node scripts/mint_nft_sepolia.js

Make sure you have the required dependencies installed and the `.env` file properly configured with your MetaMask mnemonic phrase, Alchemy API URL, and the deployed contract address on the Sepolia testnet.

## Retrieving NFT Metadata

To retrieve the metadata of minted NFTs on the Sepolia testnet, use the `get_metadata_sepolia.js` script located in the `scripts` directory. This script allows you to fetch the metadata associated with a specific NFT by providing the token ID.

To run the metadata retrieval script, use the following command:

node scripts/get_metadata_sepolia.js <tokenId>


Replace `<tokenId>` with the actual token ID of the NFT you want to retrieve the metadata for.

The script will connect to the Sepolia testnet using the Alchemy API URL, retrieve the token URI for the specified token ID, fetch the metadata from the token URI, and display it in the console.

## Deployment

To deploy the `DailyNewsNFT` smart contract to the Sepolia testnet, follow these steps:

1. Make sure you have the required dependencies installed (`@truffle/hdwallet-provider` and `dotenv`).
2. Configure your `.env` file with your MetaMask mnemonic phrase and Alchemy API URL for the Sepolia testnet.
3. Open the `truffle-config.js` file and ensure that the Sepolia network configuration is properly set up.
4. Run the following command to deploy the contract:

truffle migrate --network sepolia

After successful deployment, you will see the contract address and other relevant information in the console output. Make note of the contract address, as you will need it to interact with the contract.

## Testing Considerations

When testing the Daily News NFT project, keep the following considerations in mind:

- Make sure you have sufficient Sepolia testnet Ether in your MetaMask wallet to cover the gas fees for minting and interacting with the contract.
- Be cautious when sharing your MetaMask mnemonic phrase or Alchemy API URL. Always keep them secure and avoid committing them to version control.
- Regularly check the Sepolia Etherscan (https://sepolia.etherscan.io/) for the status of your transactions and to verify the minted NFTs.
- If you encounter any issues or errors during testing, refer to the troubleshooting steps provided in the README or seek assistance from the project's maintainers or the community.

Happy testing!