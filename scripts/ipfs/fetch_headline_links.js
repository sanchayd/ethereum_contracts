const axios = require('axios');

async function getHeadlineLinksFromIPFS(ipfsHash) {
  try {
    // Get the file from IPFS using the Pinata gateway
    const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}`);

    // Parse the response data as JSON
    const data = response.data;

    // Extract the headline links from the data
    const headlineLinks = data.headlineLinks;

    console.log('Headline Links:');
    headlineLinks.forEach((link, index) => {
      console.log(`${index + 1}. ${link}`);
    });
  } catch (error) {
    console.error('Error retrieving headline links from IPFS:', error);
    throw error;
  }
}

// Get the IPFS hash from command-line arguments
const ipfsHash = process.argv[2];

if (!ipfsHash) {
  console.error('Please provide the IPFS hash as a command-line argument.');
  process.exit(1);
}

console.log('Retrieving headline links from IPFS...');
getHeadlineLinksFromIPFS(ipfsHash)
  .then(() => {
    console.log('Finished retrieving headline links from IPFS.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });