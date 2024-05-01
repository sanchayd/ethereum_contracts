const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();

// Read the compiled contract's ABI from the JSON file
const contractJson = JSON.parse(fs.readFileSync('./build/contracts/DailyNewsNFT.json', 'utf8'));
const contractABI = contractJson.abi;

async function getMetadataByDate(date) {
  try {
    // Connect to the Sepolia testnet using the Alchemy API URL
    const web3 = new Web3(process.env.ALCHEMY_API_URL);

    // Create an instance of the DailyNewsNFT contract
    const dailyNewsNFT = new web3.eth.Contract(contractABI, "0x490DA38Fec1a841710A51Ff4FD83873d1Db92940");

    // Get the NewsNFTs for the specified date
    const newsNFTs = await dailyNewsNFT.methods.getNewsNFTsByDate(date).call();
    console.log(`NewsNFTs for date ${date}:`, newsNFTs);

    // Retrieve metadata for each NewsNFT
    for (const newsNFT of newsNFTs) {
      const tokenURI = await dailyNewsNFT.methods.tokenURI(newsNFT.tokenId).call();
      console.log(`Token URI for Token ID ${newsNFT.tokenId}:`, tokenURI);

      // Fetch the metadata from the token URI
      const response = await fetch(tokenURI);
      const metadata = await response.json();

      // Display the metadata
      console.log(`Metadata for Token ID ${newsNFT.tokenId}:`);
      console.log(metadata);
    }

    process.exit(0); // Exit the script with a success status
  } catch (error) {
    console.error('Error occurred:', error);
    process.exit(1); // Exit the script with an error status
  }
}

// Get the date from the command line argument
const date = process.argv[2];

if (!date) {
  console.error('Please provide a date as a command line argument.');
  process.exit(1);
}

getMetadataByDate(date).catch((error) => {
  console.error('Error in getMetadataByDate:', error);
  process.exit(1);
});