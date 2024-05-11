// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract NOTDVotingContract {
    // Struct to represent a headline
    struct Headline {
        string text; // Assuming an average headline length of 10 words with 10 characters each
        uint256 voteCount;
    }

    // Mapping to store the headlines for each date
    mapping(uint256 => Headline[]) public headlines; // Gas cost: 20,000 for storing a new entry

    // Mapping to track whether a journalist has already voted for a specific date
    mapping(uint256 => mapping(address => bool)) public hasVoted; // Gas cost: 20,000 for storing a new entry

    // Mapping to store the winning headline for each date
    mapping(uint256 => uint256) public winningHeadlines; // Gas cost: 20,000 for storing a new entry

    // Event to emit when a vote is cast
    event VoteCast(uint256 indexed date, address indexed voter, uint256 headlineIndex); // Gas cost: 1,500 for emitting an event

    // Function to add a headline for a specific date
    function addHeadline(uint256 _date, string memory _text) external {
        headlines[_date].push(Headline(_text, 0)); // Gas cost: 20,000 for storing a new entry + 5,000 for string storage
    }

    // Function to allow a journalist to vote for a headline on a specific date
    function vote(uint256 _date, uint256 _headlineIndex) external {
        require(!hasVoted[_date][msg.sender], "You have already voted for this date"); // Gas cost: 200 for reading from storage
        require(_headlineIndex < headlines[_date].length, "Invalid headline index"); // Gas cost: 200 for reading from storage

        headlines[_date][_headlineIndex].voteCount++; // Gas cost: 5,000 for reading and writing to storage
        hasVoted[_date][msg.sender] = true; // Gas cost: 5,000 for writing to storage

        emit VoteCast(_date, msg.sender, _headlineIndex); // Gas cost: 1,500 for emitting an event
    }

    // Function to determine the winning headline for a specific date
    function determineWinningHeadline(uint256 _date) external {
        uint256 winningVoteCount = 0;
        uint256 winningIndex = 0;

        for (uint256 i = 0; i < headlines[_date].length; i++) { // Gas cost: 200 for reading from storage + 2 for each iteration
            if (headlines[_date][i].voteCount > winningVoteCount) { // Gas cost: 200 for reading from storage
                winningVoteCount = headlines[_date][i].voteCount; // Gas cost: 200 for reading from storage
                winningIndex = i;
            }
        }

        winningHeadlines[_date] = winningIndex; // Gas cost: 5,000 for writing to storage
    }

    // Function to get the number of headlines for a specific date
    function getHeadlineCount(uint256 _date) external view returns (uint256) {
        return headlines[_date].length;
    }

    // Function to get the vote count for a specific headline on a given date
    function getVoteCount(uint256 _date, uint256 _headlineIndex) external view returns (uint256) {
        return headlines[_date][_headlineIndex].voteCount;
    }

    // Function to retrieve the winning headline for a specific date
    function getWinningHeadline(uint256 _date) external view returns (string memory) {
        uint256 winningIndex = winningHeadlines[_date]; // Gas cost: 200 for reading from storage
        return headlines[_date][winningIndex].text; // Gas cost: 200 for reading from storage
    }
}