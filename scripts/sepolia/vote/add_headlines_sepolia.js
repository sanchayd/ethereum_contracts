const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();
const axios = require('axios');

const contractAddress = '0x76a8b007053434D093C0cA7c8838388A04263DC1';

async function addHeadlinesSepolia(date, headlines) {
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

    const accounts = await web3.eth.getAccounts();
    const account = accounts[0]; // Use the first account from the derived accounts

    const contractABI = await fetchContractABI();

    const votingContract = new web3.eth.Contract(contractABI, contractAddress);

    const dateUint = convertDateToUint(date);

    for (const headline of headlines) {
      await votingContract.methods.addHeadline(dateUint, headline).send({ from: account });
      console.log(`Headline added: ${headline}`);
    }

    const headlineCount = await votingContract.methods.getHeadlineCount(dateUint).call();
    console.log(`Number of headlines for date ${date} (${dateUint}): ${headlineCount}`);

    process.exit(0);
  } catch (error) {
    console.error("Error adding headlines:", error);
    process.exit(1);
  }
}

async function fetchContractABI() {
    try {
      // Contract needs to be verified
      const url = `https://api-sepolia.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}&apikey=${process.env.ETHERSCAN_API_KEY}`;
      const response = await axios.get(url);
  
      if (response.data.status === '1') {
        const contractABI = JSON.parse(response.data.result);
        return contractABI;
      } else {
        throw new Error('Failed to fetch contract ABI from Etherscan');
      }
    } catch (error) {
      console.error('Error fetching contract ABI:', error);
      throw error;
    }
  }

// Function to convert dd/mm/yyyy format to uint256
function convertDateToUint(dateString) {
  const [day, month, year] = dateString.split("/");
  const dateUint = (parseInt(year) * 10000) + (parseInt(month) * 100) + parseInt(day);
  return dateUint;
}

// Get the date and headlines from command-line arguments
const date = process.argv[2];
const headlines = process.argv.slice(3);

if (!date || headlines.length === 0) {
  console.error("Please provide a date in the format dd/mm/yyyy and at least one headline as command-line arguments.");
  process.exit(1);
}

addHeadlinesSepolia(date, headlines).catch((error) => {
  console.error("Error in addHeadlinesSepolia:", error);
  process.exit(1);
});