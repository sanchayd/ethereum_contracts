const { Alchemy, Network } = require('alchemy-sdk');
const { format, parseISO } = require('date-fns');
const axios = require('axios');
require('dotenv').config();

const contractAddress = '0x7931EDEF2a2481f94a4FE847c61FcccA8412d18F'; // Replace with your contract address
const alchemyApiKey = process.env.ALCHEMY_API_KEY;

const settings = {
  apiKey: alchemyApiKey,
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);

async function fetchAllNFTsByDate(date) {
  try {
    const nfts = await alchemy.nft.getNftsForContract(contractAddress);

    // Filter NFTs based on the minting date
    const filteredNFTs = nfts.nfts.filter(nft => {
      const mintingDate = parseISO(nft.mint.timestamp);
      return format(mintingDate, 'yyyy-MM-dd') === date;
    });

    console.log(`NFTs minted on ${date}:`);
    console.log(filteredNFTs);

    // Process the filtered NFT data and retrieve metadata details
    for (const nft of filteredNFTs) {
      const tokenId = nft.tokenId;
      const tokenURI = nft.raw.tokenUri;

      if (!tokenURI) {
        console.log(`\nToken ID: ${tokenId}`);
        console.log('Token URI not available.');
        continue;
      }

      console.log(`\nToken ID: ${tokenId}`);
      console.log(`Token URI: ${tokenURI}`);

      try {
        // Decode the Base64-encoded JSON metadata
        const encodedMetadata = tokenURI.replace('data:application/json;base64,', '');
        const decodedMetadata = JSON.parse(Buffer.from(encodedMetadata, 'base64').toString());

        console.log('Token Metadata:');
        console.log('Headline:', decodedMetadata.headline);
        console.log('Headline Lists IPFS Hash:', decodedMetadata.headlineListsIPFS);

        // Fetch the headline lists from IPFS using the Pinata gateway
        const headlineListsIPFS = decodedMetadata.headlineListsIPFS;
        const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${headlineListsIPFS}`);

        // Parse the response data as JSON
        const headlineLists = response.data.headlineLinks;

        console.log('Headline Links:');
        headlineLists.forEach((link, index) => {
          console.log(`${index + 1}. ${link}`);
        });
      } catch (error) {
        console.log('Error decoding metadata or fetching headline lists:', error.message);
      }
    }
  } catch (error) {
    console.error('Error fetching NFTs:', error);
  }
}

// Get the date from command line arguments
const date = process.argv[2];

if (!date) {
  console.error('Please provide a date as a command line argument (YYYY-MM-DD).');
  process.exit(1);
}

fetchAllNFTsByDate(date).catch((error) => {
  console.error("Error in fetchMetadataSepolia:", error);
  process.exit(1); // Exit the script with an error status
});

