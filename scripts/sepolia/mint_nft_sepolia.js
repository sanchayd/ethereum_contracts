const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();
const axios = require('axios');
const FormData = require('form-data');

// Read the compiled contract's ABI and address from the JSON file
const contractJson = JSON.parse(fs.readFileSync('./build/contracts/DailyNewsNFT.json', 'utf8'));
const contractABI = contractJson.abi;

async function mintNFTSepolia(headline, headlineLinks) {
  try {
    // Set up the HDWalletProvider with your MetaMask mnemonic and Alchemy API URL from .env file
    console.log("Trying to setup HDWalletProvider");
    const provider = new HDWalletProvider({
      mnemonic: {
        phrase: process.env.MNEMONIC,
      },
      providerOrUrl: process.env.ALCHEMY_API_URL,
      addressIndex: 0, // Use the first account derived from the mnemonic
    });

    const web3 = new Web3(provider);

    // Get the account to use for minting
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0]; // Use the first account from the derived accounts

    // Upload headline links to IPFS
    const ipfsHash = await storeHeadlineLinksOnIPFS(headlineLinks);

    // Get the deployed instance of the DailyNewsNFT contract
    const dailyNewsNFT = new web3.eth.Contract(contractABI, "0x7931EDEF2a2481f94a4FE847c61FcccA8412d18F");

    // Mint the NFT
    const result = await dailyNewsNFT.methods.mintNewsNFT(headline, ipfsHash).send({ from: account });

    console.log("NFT minted successfully!");
    console.log("Transaction hash:", result.transactionHash);
    console.log("Gas used:", result.gasUsed);

    const tokenId = result.events.Transfer.returnValues.tokenId;
    console.log("Minted token ID:", tokenId);

    // Get the owner of the minted NFT
    const owner = await dailyNewsNFT.methods.ownerOf(tokenId).call();
    console.log("NFT owner:", owner);

    process.exit(0); // Exit the script with a success status
  } catch (error) {
    console.error("Error minting NFT:", error);
    process.exit(1); // Exit the script with an error status
  }
}

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

// Get the headline and headlineLinks from command line arguments
const headline = process.argv[2];
const headlineLinks = process.argv.slice(3);

if (!headline || headlineLinks.length === 0) {
  console.error("Please provide a headline and at least one headline link as command line arguments.");
  process.exit(1);
}

mintNFTSepolia(headline, headlineLinks).catch((error) => {
  console.error("Error in mintNFTSepolia:", error);
  process.exit(1); // Exit the script with an error status
});