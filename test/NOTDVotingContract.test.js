const NOTDVotingContract = artifacts.require("NOTDVotingContract");

contract("NOTDVotingContract", (accounts) => {
  let notdVotingContract;

  beforeEach(async () => {
    notdVotingContract = await NOTDVotingContract.new();
  });

  it("should add a headline", async () => {
    const date = 1234567890;
    const headline = "Test Headline";

    await notdVotingContract.addHeadline(date, headline);

    const headlineCount = await notdVotingContract.getHeadlineCount(date);
    console.log("headlineCount == ", headlineCount);



    assert.equal(headlineCount, 1, "Headline count should be 1");

    const addedHeadline = await notdVotingContract.headlines(date, 0);
    assert.equal(addedHeadline.text, headline, "Headline text should match");
    assert.equal(addedHeadline.voteCount, 0, "Vote count should be 0");
  });

  it("should allow a journalist to vote", async () => {
    const date = 1234567890;
    const headline1 = "Headline 1";
    const headline2 = "Headline 2";

    await notdVotingContract.addHeadline(date, headline1);
    await notdVotingContract.addHeadline(date, headline2);

    await notdVotingContract.vote(date, 0, { from: accounts[0] });

    const voteCount = await notdVotingContract.getVoteCount(date, 0);
    assert.equal(voteCount, 1, "Vote count should be 1");

    const hasVoted = await notdVotingContract.hasVoted(date, accounts[0]);
    assert.isTrue(hasVoted, "Journalist should have voted");
});

  it("should not allow a journalist to vote twice", async () => {
    const date = 1234567890;
    const headline = "Test Headline";

    await notdVotingContract.addHeadline(date, headline);
    await notdVotingContract.vote(date, 0, { from: accounts[0] });

    try {
      await notdVotingContract.vote(date, 0, { from: accounts[0] });
      assert.fail("Should have thrown an exception");
    } catch (error) {
      assert.include(error.message, "You have already voted for this date", "Error message should match");
    }
  });

  it("should determine the winning headline", async () => {
    const date = 1234567890;
    const headline1 = "Headline 1";
    const headline2 = "Headline 2";

    await notdVotingContract.addHeadline(date, headline1);
    await notdVotingContract.addHeadline(date, headline2);

    await notdVotingContract.vote(date, 0, { from: accounts[0] });
    await notdVotingContract.vote(date, 1, { from: accounts[1] });
    await notdVotingContract.vote(date, 1, { from: accounts[2] });

    await notdVotingContract.determineWinningHeadline(date);

    const winningHeadline = await notdVotingContract.getWinningHeadline(date);
    assert.equal(winningHeadline, headline2, "Winning headline should match");
  });

  it("should emit a VoteCast event", async () => {
    const date = 1234567890;
    const headline = "Test Headline";

    await notdVotingContract.addHeadline(date, headline);

    const tx = await notdVotingContract.vote(date, 0, { from: accounts[0] });

    assert.equal(tx.logs.length, 1, "Should have emitted one event");
    assert.equal(tx.logs[0].event, "VoteCast", "Event name should match");
    assert.equal(tx.logs[0].args.date, date, "Event date should match");
    assert.equal(tx.logs[0].args.voter, accounts[0], "Event voter should match");
    assert.equal(tx.logs[0].args.headlineIndex, 0, "Event headline index should match");
  });
});