const DailyNewsNFT = artifacts.require("DailyNewsNFT");

module.exports = async function(callback) {
  try {
    // Get the deployed instance of the DailyNewsNFT contract
    const dailyNewsNFT = await DailyNewsNFT.deployed();

    // Set the range of token IDs to retrieve metadata for
    const startTokenId = 1;
    const endTokenId = 5;

    // Iterate over the range of token IDs and retrieve their metadata
    for (let tokenId = startTokenId; tokenId <= endTokenId; tokenId++) {
      try {
        // Get the token metadata URI
        const tokenURI = await dailyNewsNFT.tokenURI(tokenId);
        console.log(`\nToken ID: ${tokenId}`);
        console.log(`Token URI: ${tokenURI}`);

        // Get the owner of the token
        const owner = await dailyNewsNFT.ownerOf(tokenId);
        console.log(`Token Owner: ${owner}`);

        // Get the token metadata
        const metadata = await dailyNewsNFT.newsNFTs(tokenId);
        console.log("Token Metadata:");
        console.log(`  Headline: ${metadata.headline}`);
        console.log(`  Headline Link: ${metadata.headlineLink}`);
        console.log(`  Timestamp: ${metadata.timestamp}`);
      } catch (error) {
        console.log(`Token ID ${tokenId} does not exist or has no metadata.`);
      }
    }

    callback();
  } catch (error) {
    console.error("Error retrieving token metadata:", error);
    callback(error);
  }
};