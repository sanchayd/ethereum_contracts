const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();
const axios = require('axios');

const contractAddress = '0x76a8b007053434D093C0cA7c8838388A04263DC1';

async function getWinningHeadlineSepolia(date) {
  try {
    const provider = new HDWalletProvider({
      mnemonic: {
        phrase: process.env.MNEMONIC,
      },
      providerOrUrl: process.env.ALCHEMY_API_URL,
      addressIndex: 0,
    });

    const web3 = new Web3(provider);
    const contractABI = await fetchContractABI();
    const votingContract = new web3.eth.Contract(contractABI, contractAddress);

    const dateUint = convertDateToUint(date);

    console.log("Determining winning headline for: ", dateUint);

    const accounts = await web3.eth.getAccounts();
    await votingContract.methods.determineWinningHeadline(dateUint).send({ from: accounts[0] });

    const winningHeadline = await votingContract.methods.getWinningHeadline(dateUint).call();
    console.log(`Winning headline for date ${date} (${dateUint}): ${winningHeadline}`);
    
    // Get the winning headline index
    const winningHeadlineIndex = await votingContract.methods.winningHeadlines(dateUint).call();

    // Get the vote count of the winning headline
    const voteCount = await votingContract.methods.getVoteCount(dateUint, winningHeadlineIndex).call();
    console.log(`Vote count for the winning headline: ${voteCount}`);


    process.exit(0);
  } catch (error) {
    console.error("Error retrieving winning headline:", error);
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

// Get the date from command-line arguments
const date = process.argv[2];

if (!date) {
  console.error("Please provide a date in the format dd/mm/yyyy as a command-line argument.");
  process.exit(1);
}

getWinningHeadlineSepolia(date).catch((error) => {
  console.error("Error in getWinningHeadlineSepolia:", error);
  process.exit(1);
});