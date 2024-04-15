const DailyNewsNFT = artifacts.require("DailyNewsNFT");

contract("DailyNewsNFT", (accounts) => {
  let dailyNewsNFT;

  beforeEach(async () => {
    dailyNewsNFT = await DailyNewsNFT.new();
  });

  it("should mint a new NFT with the correct metadata", async () => {
    const headline = "Breaking News: Unit Test Passed!";
    const headlineLink = "https://example.com/news/unit-test-passed";

    const mintTx = await dailyNewsNFT.mintNewsNFT(headline, headlineLink, { from: accounts[0] });

    const tokenId = mintTx.logs[0].args.tokenId.toNumber();
    const owner = await dailyNewsNFT.ownerOf(tokenId);
    const tokenURI = await dailyNewsNFT.tokenURI(tokenId);

    assert.equal(owner, accounts[0], "NFT owner should be the minter");

    const decodedTokenURI = JSON.parse(Buffer.from(tokenURI.split(",")[1], "base64").toString());
    assert.equal(decodedTokenURI.headline, headline, "Headline should match the minted value");
    assert.equal(decodedTokenURI.headlineLink, headlineLink, "Headline link should match the minted value");
  });

  it("should not allow minting with an empty headline", async () => {
    try {
      await dailyNewsNFT.mintNewsNFT("", "https://example.com/news/empty-headline", { from: accounts[0] });
      assert.fail("Minting with an empty headline should have thrown an error");
    } catch (error) {
      assert.include(error.message, "Headline cannot be empty", "Error message should contain the expected reason");
    }
  });

  it("should not allow minting with an empty headline link", async () => {
    try {
      await dailyNewsNFT.mintNewsNFT("Breaking News: Empty Link", "", { from: accounts[0] });
      assert.fail("Minting with an empty headline link should have thrown an error");
    } catch (error) {
      assert.include(error.message, "Headline link cannot be empty", "Error message should contain the expected reason");
    }
  });
});