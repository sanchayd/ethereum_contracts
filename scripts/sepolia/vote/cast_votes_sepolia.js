const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();
const axios = require('axios');

const contractAddress = '0x76a8b007053434D093C0cA7c8838388A04263DC1';


async function castVotesSepolia(date) {
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

    const accounts = await web3.eth.getAccounts();

    const headlineCount = await votingContract.methods.getHeadlineCount(dateUint).call();
    console.log(`Number of headlines for date ${date} (${dateUint}): ${headlineCount}`);

    if (headlineCount >= 1) {
      await votingContract.methods.vote(dateUint, 0).send({ from: accounts[0] });
      console.log(`Account ${accounts[0]} voted for headline index 0`);
    }

    if (headlineCount >= 2) {
      await votingContract.methods.vote(dateUint, 1).send({ from: accounts[0] });
      console.log(`Account ${accounts[1]} voted for headline index 1`);
    }

    if (headlineCount >= 2) {
      await votingContract.methods.vote(dateUint, 1).send({ from: accounts[2] });
      console.log(`Account ${accounts[2]} voted for headline index 1`);
    }

    if (headlineCount >= 3) {
      await votingContract.methods.vote(dateUint, 2).send({ from: accounts[3] });
      console.log(`Account ${accounts[3]} voted for headline index 2`);
    }

    console.log("Vote counts for each headline:");
    for (let i = 0; i < headlineCount; i++) {
      const voteCount = await votingContract.methods.getVoteCount(dateUint, i).call();
      console.log(`Headline index ${i}: ${voteCount} votes`);
    }

    await votingContract.methods.determineWinningHeadline(dateUint).send({ from: accounts[0] });
    const winningHeadline = await votingContract.methods.getWinningHeadline(dateUint).call();
    console.log(`Winning headline for date ${date} (${dateUint}): ${winningHeadline}`);

    process.exit(0);
  } catch (error) {
    console.error("Error casting votes:", error);
    process.exit(1);
  }
}

// Function to convert dd/mm/yyyy format to uint256
function convertDateToUint(dateString) {
  const [day, month, year] = dateString.split("/");
  const dateUint = (parseInt(year) * 10000) + (parseInt(month) * 100) + parseInt(day);
  return dateUint;
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

// Get the date from command-line arguments
const date = process.argv[2];

if (!date) {
  console.error("Please provide a date in the format dd/mm/yyyy as a command-line argument.");
  process.exit(1);
}

castVotesSepolia(date).catch((error) => {
  console.error("Error in castVotesSepolia:", error);
  process.exit(1);
});