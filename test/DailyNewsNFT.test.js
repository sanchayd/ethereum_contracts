const DailyNewsNFT = artifacts.require("DailyNewsNFT");

contract("DailyNewsNFT", (accounts) => {
  let dailyNewsNFT;

  beforeEach(async () => {
    dailyNewsNFT = await DailyNewsNFT.new();
  });

  it("should mint a new NFT with the correct metadata", async () => {
    const date = 20230601;
    const headline = "Breaking News: Unit Test Passed!";
    const headlineLink = "https://example.com/news/unit-test-passed";

    const mintTx = await dailyNewsNFT.mintNewsNFT(date, headline, headlineLink, { from: accounts[0] });

    const tokenId = mintTx.logs[0].args.tokenId.toNumber();
    const owner = await dailyNewsNFT.ownerOf(tokenId);
    const tokenURI = await dailyNewsNFT.tokenURI(tokenId);

    assert.equal(owner, accounts[0], "NFT owner should be the minter");

    const decodedTokenURI = JSON.parse(Buffer.from(tokenURI.split(",")[1], "base64").toString());
    assert.equal(decodedTokenURI.headline, headline, "Headline should match the minted value");
    assert.equal(decodedTokenURI.headlineLink, headlineLink, "Headline link should match the minted value");

    const newsNFTs = await dailyNewsNFT.getNewsNFTsByDate(date);
    assert.equal(newsNFTs.length, 1, "There should be one NewsNFT for the minted date");
    assert.equal(newsNFTs[0].tokenId, tokenId, "The minted token ID should match the NewsNFT token ID");
  });

  it("should not allow minting with an empty headline", async () => {
    const date = 20230601;
    try {
      await dailyNewsNFT.mintNewsNFT(date, "", "https://example.com/news/empty-headline", { from: accounts[0] });
      assert.fail("Minting with an empty headline should have thrown an error");
    } catch (error) {
      assert.include(error.message, "Headline cannot be empty", "Error message should contain the expected reason");
    }
  });

  it("should not allow minting with an empty headline link", async () => {
    const date = 20230601;
    try {
      await dailyNewsNFT.mintNewsNFT(date, "Breaking News: Empty Link", "", { from: accounts[0] });
      assert.fail("Minting with an empty headline link should have thrown an error");
    } catch (error) {
      assert.include(error.message, "Headline link cannot be empty", "Error message should contain the expected reason");
    }
  });

  it("should allow minting multiple NFTs for a specific date", async () => {
    const date = 20230601;
    const headline1 = "Breaking News: First NFT";
    const headlineLink1 = "https://example.com/news/first-nft";
    const headline2 = "Breaking News: Second NFT";
    const headlineLink2 = "https://example.com/news/second-nft";

    await dailyNewsNFT.mintNewsNFT(date, headline1, headlineLink1, { from: accounts[0] });
    await dailyNewsNFT.mintNewsNFT(date, headline2, headlineLink2, { from: accounts[0] });

    const newsNFTs = await dailyNewsNFT.getNewsNFTsByDate(date);
    assert.equal(newsNFTs.length, 2, "There should be two NewsNFTs for the minted date");

    const tokenURI1 = await dailyNewsNFT.tokenURI(newsNFTs[0].tokenId);
    const decodedTokenURI1 = JSON.parse(Buffer.from(tokenURI1.split(",")[1], "base64").toString());
    assert.equal(decodedTokenURI1.headline, headline1, "Headline of the first NFT should match the minted value");
    assert.equal(decodedTokenURI1.headlineLink, headlineLink1, "Headline link of the first NFT should match the minted value");

    const tokenURI2 = await dailyNewsNFT.tokenURI(newsNFTs[1].tokenId);
    const decodedTokenURI2 = JSON.parse(Buffer.from(tokenURI2.split(",")[1], "base64").toString());
    assert.equal(decodedTokenURI2.headline, headline2, "Headline of the second NFT should match the minted value");
    assert.equal(decodedTokenURI2.headlineLink, headlineLink2, "Headline link of the second NFT should match the minted value");
  });
});