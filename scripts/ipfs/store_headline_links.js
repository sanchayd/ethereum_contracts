const axios = require('axios');
const FormData = require('form-data');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

async function storeHeadlineLinksOnIPFS(headlineLinks) {
  try {
    // Prepare the JSON data containing the headline links
    const data = {
      headlineLinks: headlineLinks
    };

    // Convert the JSON data to a string
    const jsonString = JSON.stringify(data);

    // Create a FormData instance
    const formData = new FormData();

    // Append the JSON data as a file to the FormData
    formData.append('file', jsonString, 'headline_links.json');

    // Set the Pinata metadata
    const pinataMetadata = JSON.stringify({
      name: 'Headline Links'
    });
    formData.append('pinataMetadata', pinataMetadata);

    // Set the Pinata options
    const pinataOptions = JSON.stringify({
      cidVersion: 0
    });
    formData.append('pinataOptions', pinataOptions);

    // Send the request to the Pinata API
    const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
      maxBodyLength: 'Infinity',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
        'Authorization': `Bearer ${process.env.PINATA_API_KEY}`
      }
    });

    // Get the IPFS hash of the uploaded data
    const ipfsHash = response.data.IpfsHash;

    console.log('Headline links stored on IPFS successfully.');
    console.log('IPFS Hash:', ipfsHash);

    return ipfsHash;
  } catch (error) {
    console.error('Error storing headline links on IPFS:', error);
    throw error;
  }
}

// Get the headline links from command-line arguments
const headlineLinks = process.argv.slice(2);

if (headlineLinks.length === 0) {
  console.error('Please provide headline links as command-line arguments.');
  process.exit(1);
}

console.log('Starting to store headline links on IPFS...');
storeHeadlineLinksOnIPFS(headlineLinks)
  .then((ipfsHash) => {
    console.log('IPFS Hash:', ipfsHash);
    console.log('Finished storing headline links on IPFS.');
  })
  .catch((error) => {
    console.error('Error:', error);
  });