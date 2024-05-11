const VotingContract = artifacts.require("NOTDVotingContract");

module.exports = async function(callback) {
  try {
    // Get the deployed instance of the VotingContract
    const votingContract = await VotingContract.deployed();

    // Get the date from command-line arguments
    const dateString = process.argv[4];

    // Validate the date format
    if (!isValidDateFormat(dateString)) {
      console.error("Invalid date format. Please provide a date in the format dd/mm/yyyy.");
      callback(new Error("Invalid date format"));
      return;
    }

    // Convert the date string to uint256
    const dateUint = convertDateToUint(dateString);
    console.log(`Converting date ${dateString} to uint256: ${dateUint}`);

    // Get the accounts
    const accounts = await web3.eth.getAccounts();

    // Get the number of headlines for the specified date
    const headlineCount = await votingContract.getHeadlineCount(dateUint);
    console.log(`Number of headlines for date ${dateString} (${dateUint}): ${headlineCount}`);

    // Cast votes for headlines
    if (headlineCount >= 1) {
      await votingContract.vote(dateUint, 0, { from: accounts[0] });
      console.log(`Account ${accounts[0]} voted for headline index 0`);
    }

    if (headlineCount >= 2) {
      await votingContract.vote(dateUint, 1, { from: accounts[1] });
      console.log(`Account ${accounts[1]} voted for headline index 1`);
    }

    if (headlineCount >= 2) {
      await votingContract.vote(dateUint, 1, { from: accounts[2] });
      console.log(`Account ${accounts[2]} voted for headline index 1`);
    }

    if (headlineCount >= 3) {
      await votingContract.vote(dateUint, 2, { from: accounts[3] });
      console.log(`Account ${accounts[3]} voted for headline index 2`);
    }

    // Get the vote counts for each headline
    console.log("Vote counts for each headline:");
    for (let i = 0; i < headlineCount; i++) {
      const voteCount = await votingContract.getVoteCount(dateUint, i);
      console.log(`Headline index ${i}: ${voteCount} votes`);
    }

    // Determine the winning headline
    await votingContract.determineWinningHeadline(dateUint);
    const winningHeadline = await votingContract.getWinningHeadline(dateUint);
    console.log(`Winning headline for date ${dateString} (${dateUint}): ${winningHeadline}`);

    callback();
  } catch (error) {
    console.error("Error casting votes:", error);
    callback(error);
  }
};

// Function to convert dd/mm/yyyy format to uint256
function convertDateToUint(dateString) {
  const [day, month, year] = dateString.split("/");
  const dateUint = (parseInt(year) * 10000) + (parseInt(month) * 100) + parseInt(day);
  return dateUint;
}

// Function to validate the date format
function isValidDateFormat(dateString) {
  const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  return dateRegex.test(dateString);
}