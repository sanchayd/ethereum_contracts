const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
// The artifacts object is provided by the Truffle framework when running scripts using truffle exec,
// but it is not available when running the script directly with Node.js. To resolve this issue,
// modified the script to load the contract's ABI and address manually
//const DailyNewsNFT = artifacts.require("DailyNewsNFT");
const fs = require('fs');
require('dotenv').config();

// Read the compiled contract's ABI and address from the JSON file
const contractJson = JSON.parse(fs.readFileSync('./build/contracts/DailyNewsNFT.json', 'utf8'));
const contractABI = contractJson.abi;

async function mintNFTSepolia(date, headline, headlineLink) {
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

    // Get the deployed instance of the DailyNewsNFT contract
    const dailyNewsNFT = new web3.eth.Contract(contractABI, "0x490DA38Fec1a841710A51Ff4FD83873d1Db92940");

    // Mint the NFT
    const result = await dailyNewsNFT.methods.mintNewsNFT(date, headline, headlineLink).send({ from: account });
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
};

// Get the date, headline, and headlineLink from command line arguments
const date = process.argv[2];
const headline = process.argv[3];
const headlineLink = process.argv[4];

if (!date || !headline || !headlineLink) {
  console.error("Please provide a date, headline, and headline link as command line arguments.");
  process.exit(1);
}

mintNFTSepolia(date, headline, headlineLink).catch((error) => {
    console.error("Error in mintNFTSepolia:", error);
    process.exit(1); // Exit the script with an error status
  });