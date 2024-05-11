const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();
const axios = require('axios');

const contractAddress = '0x76a8b007053434D093C0cA7c8838388A04263DC1';

async function getWinningHeadlineSepolia(date) {
  try {
    const web3 = new Web3(process.env.ALCHEMY_API_URL);
    const contractABI = await fetchContractABI();
    const votingContract = new web3.eth.Contract(contractABI, contractAddress);

    const dateUint = convertDateToUint(date);

    const winningHeadline = await votingContract.methods.getWinningHeadline(dateUint).call();
    console.log(`Winning headline for date ${date} (${dateUint}): ${winningHeadline}`);
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