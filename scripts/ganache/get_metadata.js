const DailyNewsNFT = artifacts.require("DailyNewsNFT");

module.exports = async function(callback) {
  try {
    // Get the deployed instance of the DailyNewsNFT contract
    const dailyNewsNFT = await DailyNewsNFT.deployed();

    // Set the range of token IDs to retrieve metadata for
    const startTokenId = 0;
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

        // Decode the Base64-encoded JSON metadata
        const encodedMetadata = tokenURI.replace('data:application/json;base64,', '');
        const decodedMetadata = JSON.parse(Buffer.from(encodedMetadata, 'base64').toString());

        console.log("Token Metadata:");
        console.log(` Headline: ${decodedMetadata.headline}`);
        console.log(` Headline Lists IPFS: ${decodedMetadata.headlineListsIPFS}`);

        // Fetch the headline lists from IPFS using Pinata gateway
        const headlineListsIPFS = decodedMetadata.headlineListsIPFS;
        const response = await axios.get(`https://gateway.pinata.cloud/ipfs/${headlineListsIPFS}`);

        // Parse the response data as JSON
        const headlineLists = response.data;

        console.log("Headline Lists:");
        console.log(headlineLists);

      } catch (error) {
        console.log(`Token ID ${tokenId} does not exist or has no metadata.`);
        console.log("error: ",error);
      }
    }

    callback();
  } catch (error) {
    console.error("Error retrieving token metadata:", error);
    callback(error);
  }
};