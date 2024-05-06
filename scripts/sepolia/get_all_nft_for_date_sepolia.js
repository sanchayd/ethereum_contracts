const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();

// Read the compiled contract's ABI from the JSON file
const contractJson = JSON.parse(fs.readFileSync('./build/contracts/DailyNewsNFT.json', 'utf8'));
const contractABI = contractJson.abi;

async function getNewsNFTsByDate(date) {
  try {
    // Connect to the Sepolia testnet using the Alchemy API URL
    const web3 = new Web3(process.env.ALCHEMY_API_URL);

    // Create an instance of the DailyNewsNFT contract
    const dailyNewsNFT = new web3.eth.Contract(contractABI, "0x490DA38Fec1a841710A51Ff4FD83873d1Db92940");

    // Get the start and end timestamps for the specified date
    const startTimestamp = new Date(date).setUTCHours(0, 0, 0, 0) / 1000;
    const endTimestamp = new Date(date).setUTCHours(23, 59, 59, 999) / 1000;

    // Get the start and end block numbers for the specified date
    const startBlock = await web3.eth.getBlockNumber(startTimestamp);
    const endBlock = await web3.eth.getBlockNumber(endTimestamp);

    // Get the logs for the NewsMinted event emitted by the contract within the date range
    const logs = await web3.eth.getPastLogs({
      fromBlock: startBlock,
      toBlock: endBlock,
      address: "0x490DA38Fec1a841710A51Ff4FD83873d1Db92940",
      topics: [web3.utils.sha3('NewsMinted(uint256,string,uint256)')],
    });

    // Parse the logs and retrieve the token IDs and headlines
    const newsNFTs = logs.map((log) => {
      const decodedLog = web3.eth.abi.decodeLog(
        [{ type: 'uint256', name: 'tokenId' }, { type: 'string', name: 'headline' }, { type: 'uint256', name: 'timestamp' }],
        log.data,
        log.topics.slice(1)
      );
      return {
        tokenId: decodedLog.tokenId,
        headline: decodedLog.headline,
        timestamp: decodedLog.timestamp,
      };
    });

    console.log(`NewsNFTs for date ${date}:`, newsNFTs);

    // Retrieve metadata for each NewsNFT
    for (const newsNFT of newsNFTs) {
      const tokenURI = await dailyNewsNFT.methods.tokenURI(newsNFT.tokenId).call();
      console.log(`Token URI for Token ID ${newsNFT.tokenId}:`, tokenURI);

      // Decode the Base64-encoded JSON metadata
      const encodedMetadata = tokenURI.replace('data:application/json;base64,', '');
      const decodedMetadata = JSON.parse(Buffer.from(encodedMetadata, 'base64').toString());

      // Fetch the headline lists from IPFS (assuming the IPFS link is stored in the metadata)
      const headlineListsIPFS = decodedMetadata.headlineListsIPFS;
      const response = await fetch(`https://ipfs.io/ipfs/${headlineListsIPFS}`);
      const headlineLists = await response.json();

      // Display the metadata and headline lists
      console.log(`Metadata for Token ID ${newsNFT.tokenId}:`);
      console.log(decodedMetadata);
      console.log('Headline Lists:');
      console.log(headlineLists);
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

getNewsNFTsByDate(date).catch((error) => {
  console.error('Error in getNewsNFTsByDate:', error);
  process.exit(1);
});