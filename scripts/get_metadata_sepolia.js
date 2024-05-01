const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();

// Read the compiled contract's ABI from the JSON file
const contractJson = JSON.parse(fs.readFileSync('./build/contracts/DailyNewsNFT.json', 'utf8'));
const contractABI = contractJson.abi;

async function getMetadata(tokenId) {
  try {
    // Connect to the Sepolia testnet using the Alchemy API URL
    const web3 = new Web3(process.env.ALCHEMY_API_URL);

    // Create an instance of the DailyNewsNFT contract
    const dailyNewsNFT = new web3.eth.Contract(contractABI, "0x490DA38Fec1a841710A51Ff4FD83873d1Db92940");

    // Get the token URI for the specified token ID
    const tokenURI = await dailyNewsNFT.methods.tokenURI(tokenId).call();
    console.log(`Token URI for Token ID ${tokenId}:`, tokenURI);

    // Fetch the metadata from the token URI
    const response = await fetch(tokenURI);
    const metadata = await response.json();

    // Display the metadata
    console.log(`Metadata for Token ID ${tokenId}:`);
    console.log(metadata);

    process.exit(0); // Exit the script with a success status
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1); // Exit the script with an error status
  }
}

// Get the token ID from the command line argument
const tokenId = process.argv[2];

if (!tokenId) {
  console.error('Please provide a token ID as a command line argument.');
  process.exit(1);
}

getMetadata(tokenId).catch((error) => {
  console.error('Error in getMetadata:', error);
  process.exit(1);
});