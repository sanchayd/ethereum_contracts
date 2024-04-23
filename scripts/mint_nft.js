const DailyNewsNFT = artifacts.require("DailyNewsNFT");

module.exports = async function(callback) {
  try {
    // Get the deployed instance of the DailyNewsNFT contract
    const dailyNewsNFT = await DailyNewsNFT.deployed();

    // Set the token metadata for account 1
    const headline1 = "Breaking News: Major Breakthrough in Science!";
    const headlineLink1 = "https://example.com/news/major-breakthrough";

    // Set the token metadata for account 2
    const headline2 = "World Leaders Gather for Climate Change Summit";
    const headlineLink2 = "https://example.com/news/climate-change-summit";

    // Get the account addresses from Ganache
    const accounts = await web3.eth.getAccounts();
    const account1 = accounts[0];
    const account2 = accounts[1];

    // Mint the NFT for account 1
    const result1 = await dailyNewsNFT.mintNewsNFT(headline1, headlineLink1, { from: account1 });
    console.log("NFT minted successfully for account 1!");
    console.log("Transaction hash:", result1.tx);
    console.log("Gas used:", result1.receipt.gasUsed);

    const tokenId1 = result1.logs[0].args.tokenId.toString();
    console.log("Minted token ID for account 1:", tokenId1);

    // Get the owner of the minted NFT for account 1
    const owner1 = await dailyNewsNFT.ownerOf(tokenId1);
    console.log("NFT owner for account 1:", owner1);

    // Mint the NFT for account 2
    const result2 = await dailyNewsNFT.mintNewsNFT(headline2, headlineLink2, { from: account2 });
    console.log("NFT minted successfully for account 2!");
    console.log("Transaction hash:", result2.tx);
    console.log("Gas used:", result2.receipt.gasUsed);

    const tokenId2 = result2.logs[0].args.tokenId.toString();
    console.log("Minted token ID for account 2:", tokenId2);

    // Get the owner of the minted NFT for account 2
    const owner2 = await dailyNewsNFT.ownerOf(tokenId2);
    console.log("NFT owner for account 2:", owner2);

    callback();
  } catch (error) {
    console.error("Error minting NFTs:", error);
    callback(error);
  }
};