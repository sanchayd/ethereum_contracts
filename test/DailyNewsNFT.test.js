const DailyNewsNFT = artifacts.require("DailyNewsNFT");

contract("DailyNewsNFT", (accounts) => {
  let dailyNewsNFT;

  beforeEach(async () => {
    dailyNewsNFT = await DailyNewsNFT.new();
  });

  it("should mint a new NFT with the correct metadata", async () => {
    const headline = "Breaking News: Major Discovery";
    const headlineListsIPFS = "QmabcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRST";

    const result = await dailyNewsNFT.mintNewsNFT(headline, headlineListsIPFS, { from: accounts[0] });
    const tokenId = result.logs[0].args.tokenId.toNumber();

    const tokenURI = await dailyNewsNFT.tokenURI(tokenId);
    const encodedMetadata = tokenURI.replace("data:application/json;base64,", "");
    const decodedMetadata = JSON.parse(Buffer.from(encodedMetadata, "base64").toString());

    assert.equal(decodedMetadata.name, `Daily News NFT #${tokenId}`);
    assert.equal(decodedMetadata.description, "Daily news represented as an NFT");
    assert.equal(decodedMetadata.headline, headline);
    assert.equal(decodedMetadata.headlineListsIPFS, headlineListsIPFS);
  });

  it("should emit the NewsMinted event when minting a new NFT", async () => {
    const headline = "Another Breaking News";
    const headlineListsIPFS = "QmzyxwvutsrqponmlkjihgfedcbaZYXWVUTSRQPONMLKJIH";

    const result = await dailyNewsNFT.mintNewsNFT(headline, headlineListsIPFS, { from: accounts[0] });
    const tokenId = result.logs[2].args.tokenId.toNumber();

    assert.equal(result.logs.length, 3);
    assert.equal(result.logs[2].event, "NewsMinted");
    assert.equal(result.logs[2].args.tokenId.toNumber(), tokenId);
    assert.equal(result.logs[2].args.headline, headline);
  });

});