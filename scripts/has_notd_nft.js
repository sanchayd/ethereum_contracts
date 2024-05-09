const Web3 = require('web3');
const fs = require('fs');
require('dotenv').config();

// Read the compiled contract's ABI from the JSON file
const contractJson = JSON.parse(fs.readFileSync('./build/contracts/DailyNewsNFT.json', 'utf8'));
const contractABI = contractJson.abi;

async function hasDNFT(walletAddress) {
  try {
    // Connect to the Sepolia network using the Alchemy API URL from the .env file
    const web3 = new Web3(process.env.ALCHEMY_API_URL);

    // Create an instance of the DailyNewsNFT contract
    const dailyNewsNFT = new web3.eth.Contract(contractABI, "0x7931EDEF2a2481f94a4FE847c61FcccA8412d18F");

    // Call the balanceOf function to check the wallet's DNFT balance
    const balance = await dailyNewsNFT.methods.balanceOf(walletAddress).call();

    // Check if the balance is greater than zero
    return balance > 0;
  } catch (error) {
    console.error('Error checking DNFT balance:', error);
    return false;
  }
}

// Example usage
const walletAddress = '0x3eaaf428F6237572A589Bab13e844DA7982313F2'; // Replace with the actual wallet address
hasDNFT(walletAddress)
  .then((result) => {
    console.log('Has DNFT:', result);
  })
  .catch((error) => {
    console.error('Error:', error);
  });