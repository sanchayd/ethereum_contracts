# NOTD Voting System
The NOTD Voting System is a decentralized voting mechanism built on the Ethereum blockchain. It allows journalists to vote for the most significant news event of the day, which will be minted as an NFT. The system ensures transparency, immutability, and fairness in the voting process.
Smart Contract
The voting functionality is implemented in the NOTDVotingContract smart contract. The contract is written in Solidity and includes the following key components:

Headline struct: Represents a headline with its text and vote count.
headlines mapping: Stores the headlines for each date.
hasVoted mapping: Tracks whether a journalist has already voted for a specific date.
winningHeadlines mapping: Stores the winning headline for each date.
addHeadline function: Allows adding a new headline for a specific date.
vote function: Enables journalists to vote for a headline on a specific date.
determineWinningHeadline function: Determines the winning headline for a specific date based on the vote counts.
getWinningHeadline function: Retrieves the winning headline for a specific date.

The contract ensures that journalists can only vote once per date and validates the headline index before allowing a vote. The `VoteCast` event is emitted whenever a vote is cast, providing transparency and auditability.

The `determineWinningHeadline` function is called externally once to determine the winning headline index for a specific date. It iterates over the headlines, finds the one with the highest vote count, and stores the winning index in the `winningHeadlines` mapping. This function is separate from the `getWinningHeadline` function to optimize gas costs and allow for flexibility in determining the winning headline.


## Ganache Testing
The VotingContract can be tested locally using Ganache, a personal Ethereum blockchain for development and testing purposes. Follow these steps to set up and test the contract:

Install Ganache and create a new workspace.
Configure Truffle to connect to the Ganache network by updating the development network settings in truffle-config.js.
Compile the VotingContract by running truffle compile.
Deploy the contract to the Ganache network by running truffle migrate.
Interact with the contract using the Truffle console or by running the provided test scripts.

### Test Scripts
The following test scripts are provided to interact with the VotingContract on the Ganache network:

add_headlines.js: Adds headlines for a specific date.

Command: truffle exec scripts/ganache/vote/add_headlines.js <date>
Example: truffle exec scripts/ganache/vote/add_headlines.js "22/05/2023"


cast_votes.js: Casts votes for headlines on a specific date.

Command: truffle exec scripts/ganache/vote/cast_votes.js <date>
Example: truffle exec scripts/ganache/vote/cast_votes.js "22/05/2023"


get_winning_headline.js: Retrieves the winning headline for a specific date.

Command: truffle exec scripts/ganache/vote/get_winning_headline.js <date>
Example: truffle exec scripts/ganache/vote/get_winning_headline.js "22/05/2023"



Make sure to replace <date> with the actual date in the format "DD/MM/YYYY".

### Sepolia Testnet Deployment
The VotingContract can also be deployed and tested on the Sepolia testnet. Follow these steps:

Configure the sepolia network settings in truffle-config.js with your Infura project ID and Ethereum account mnemonic.
Deploy the contract to Sepolia by running truffle migrate --network sepolia.
Update the contract address in the test scripts located in the scripts/sepolia directory.
Run the test scripts with the appropriate commands and parameters.

Please refer to the TESTING-sepolia.md file for detailed instructions on deploying and testing the VotingContract on the Sepolia testnet.

## Frontend

The frontend of the Daily News NFT Voting System is built using HTML, CSS, and JavaScript. The key components of the frontend include:

- Wallet connection: Users can connect their web3 wallet (e.g., MetaMask) to interact with the voting system.
- Headlines display: The frontend retrieves the headlines for the current date from the smart contract and displays them as a list of clickable headlines.
- Voting functionality: When a user clicks on a headline, the frontend captures the selected headline and its index. It then interacts with the smart contract to cast the vote using the user's wallet.
- Vote confirmation: After a successful vote, the frontend displays a confirmation message and updates the UI to reflect the user's vote.
- Winning headline display: The frontend periodically calls the `getWinningHeadline` function of the smart contract to retrieve the winning headline for the current date and displays it prominently.

The frontend interacts with the smart contract using web3.js library, allowing users to seamlessly connect their wallets, sign transactions, and participate in the voting process.


### Future Enhancements

Implement a user-friendly web interface for journalists to cast votes and view results.
Integrate with the NOTD NFT minting process to automatically mint the winning headline as an NFT.
Explore the use of decentralized storage solutions like IPFS for storing headline metadata.
Enhance the security and scalability of the voting system.
Conduct thorough audits and testing to ensure the integrity and reliability of the voting process.