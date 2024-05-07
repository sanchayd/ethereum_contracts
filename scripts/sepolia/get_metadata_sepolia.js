const Web3 = require('web3');
const fs = require('fs');
const axios = require('axios');
require('dotenv').config();

// Read the compiled contract's ABI from the JSON file
const contractJson = JSON.parse(fs.readFileSync('./build/contracts/DailyNewsNFT.json', 'utf8'));
const contractABI = contractJson.abi;

async function fetchMetadataSepolia(tokenId) {
  try {
    // Connect to the Sepolia network using the Alchemy API URL from the .env file
    const web3 = new Web3(process.env.ALCHEMY_API_URL);

    // Create an instance of the DailyNewsNFT contract
    const dailyNewsNFT = new web3.eth.Contract(contractABI, "0x7931EDEF2a2481f94a4FE847c61FcccA8412d18F");

    // Get the token URI for the specified token ID
    const tokenURI = await dailyNewsNFT.methods.tokenURI(tokenId).call();

    // Decode the Base64-encoded JSON metadata
    const encodedMetadata = tokenURI.replace('data:application/json;base64,', '');
    const decodedMetadata = JSON.parse(Buffer.from(encodedMetadata, 'base64').toString());

    console.log("encodedMetadata", encodedMetadata);
    console.log("decodedMetadata", decodedMetadata);

    console.log("Token Metadata:");
    console.log("Token ID:", tokenId);
    console.log("Headline:", decodedMetadata.headline);
    console.log("Headline Lists IPFS Hash:", decodedMetadata.headlineListsIPFS);

    // Fetch the headline lists from IPFS using the Pinata gateway
    const headlineListsIPFS = decodedMetadata.headlineListsIPFS;
    const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${headlineListsIPFS}`);

    // Parse the response data as JSON
    const headlineLists = response.data.headlineLinks;

    console.log("Headline Links:");
    headlineLists.forEach((link, index) => {
      console.log(`${index + 1}. ${link}`);
    });
  } catch (error) {
    console.error("Error fetching token metadata:", error);
    process.exit(1); // Exit the script with an error status
  }
}

// Get the token ID from the command-line argument
const tokenId = process.argv[2];

if (!tokenId) {
  console.error("Please provide a token ID as a command-line argument.");
  process.exit(1);
}

fetchMetadataSepolia(tokenId).catch((error) => {
  console.error("Error in fetchMetadataSepolia:", error);
  process.exit(1); // Exit the script with an error status
});