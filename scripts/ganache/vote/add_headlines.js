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

    // Set the headlines
    const headlines = [
      "Breaking News: Major Breakthrough in Science!",
      "World Leaders Gather for Climate Change Summit",
      "New Technology Revolutionizes Industry",
      "Controversial Law Sparks Nationwide Protests",
      "Celebrity Couple Announces Surprise Wedding"
    ];

    // Add headlines for the specified date
    for (const headline of headlines) {
      await votingContract.addHeadline(dateUint, headline);
      console.log(`Headline added: ${headline}`);
    }

    // Get the number of headlines for the specified date
    const headlineCount = await votingContract.getHeadlineCount(dateUint);
    console.log(`Number of headlines for date ${dateString} (${dateUint}): ${headlineCount}`);

    callback();
  } catch (error) {
    console.error("Error adding headlines:", error);
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