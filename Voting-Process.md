# NOTD Voting System

The NOTD Voting System is a decentralized voting mechanism built on the Ethereum blockchain. It allows journalists to vote for the most significant news event of the day, which will be minted as an NFT. The system ensures transparency, immutability, and fairness in the voting process.

## Smart Contract

The voting functionality is implemented in the `NOTDVotingContract` smart contract. The contract is written in Solidity and includes the following key components:

- `Headline` struct: Represents a headline with its text and vote count.
- `headlines` mapping: Stores the headlines for each date.
- `hasVoted` mapping: Tracks whether a journalist has already voted for a specific date.
- `winningHeadlines` mapping: Stores the winning headline for each date.
- `addHeadline` function: Allows adding a new headline for a specific date.
- `vote` function: Enables journalists to vote for a headline on a specific date.
- `determineWinningHeadline` function: Determines the winning headline for a specific date based on the vote counts.
- `getWinningHeadline` function: Retrieves the winning headline for a specific date.

The contract ensures that journalists can only vote once per date and validates the headline index before allowing a vote. The `VoteCast` event is emitted whenever a vote is cast, providing transparency and auditability.

## Headline Storage and Indexing

To ensure consistency between the headline indices in the smart contract and the order in which they are stored in the backend (DynamoDB), the following approach is used:

1. When storing headlines in DynamoDB, a consistent order is maintained based on the desired indexing. The headlines are stored in an array or a list within the DynamoDB item, ensuring that the first headline is at index 0, the second headline at index 1, and so on.

2. In the Lambda function that handles storing headlines (`storeHeadlines`), the headlines are stored in the desired order. The `headlines` object is converted into an array of objects using `Object.entries()` and `map()`. Each object in the array represents a headline and its corresponding links. The order of the headlines in the array determines their indices.

3. When fetching headlines from DynamoDB in the `fetchHeadlines` Lambda function, the headlines are retrieved in the same order as they were stored. After retrieving the headlines, the `reduce()` function is used to create an object where each headline is a key, and the corresponding value is an object containing the `links` and the `index` of the headline. The `index` is determined by the order of the headlines in the retrieved array.

4. In the frontend code, when calling the `vote` function of the smart contract, the `index` associated with the selected headline is passed. The `index` is retrieved from the `Headlines` object returned by the `fetchHeadlines` API.

By following this approach, the headline indices are consistent between the smart contract and the DynamoDB storage. The order in which the headlines are stored in DynamoDB determines their indices, and these indices are used when calling the `vote` function in the smart contract.

## Frontend Integration

The NOTD Voting System is integrated with a user-friendly frontend interface that allows journalists to view the headlines, cast their votes, and view the winning headline.

The frontend interacts with the smart contract using web3.js library, enabling users to connect their wallets, sign transactions, and participate in the voting process seamlessly.

The key components of the frontend integration include:

- Wallet connection: Users can connect their web3 wallet (e.g., MetaMask) to interact with the voting system.
- Headlines display: The frontend retrieves the headlines for the current date from the API backend and displays them as a list of clickable headlines.
- Voting functionality: When a user clicks on a headline, the frontend captures the selected headline and its index. It then interacts with the smart contract to cast the vote using the user's wallet.
- Vote confirmation: After a successful vote, the frontend displays a confirmation message and updates the UI to reflect the user's vote.
- Winning headline display: The frontend periodically calls the `getWinningHeadline` function of the smart contract to retrieve the winning headline for the current date and displays it prominently.

## API Backend

The NOTD Voting System relies on an API backend to store and retrieve the headlines and their corresponding links. The API backend is implemented using AWS Lambda functions and API Gateway.

The key components of the API backend include:

- `storeHeadlines` Lambda function: Handles storing the headlines and their links in DynamoDB. It ensures that the headlines are stored in the desired order, maintaining consistency with the indexing in the smart contract.
- `fetchHeadlines` Lambda function: Retrieves the headlines and their links from DynamoDB for a specific date. It returns the headlines along with their indices, which are determined by the order in which they are stored.
- API Gateway: Provides the necessary endpoints for the frontend to interact with the Lambda functions, allowing storing and fetching of headlines.

The API backend ensures efficient and reliable storage and retrieval of headlines, enabling seamless integration with the frontend and the smart contract.

## Error Handling and User Experience

The NOTD Voting System incorporates robust error handling and provides a user-friendly experience:

- API Error Handling: If there is an error while fetching headlines from the API backend (e.g., invalid date format or server errors), a generic error message is displayed on the UI, informing the user about the issue and that the development team is working on resolving it.
- Transaction Error Handling: If a voting transaction fails due to any reason (e.g., the user has already voted for the date), an appropriate error message is displayed on the UI, along with the Etherscan URL for the failed transaction. This allows users to view the transaction details and understand the reason for the failure.
- Loading State: While fetching headlines from the API backend, a loading state is displayed to indicate that the data is being retrieved. This enhances the user experience and provides visual feedback.
- Unauthorized State: If a user does not have a NOTD NFT, the voting functionality is disabled, and a message is displayed indicating that they need to acquire a NOTD NFT to participate in the voting process.


## SMART CONTRACT API CALLS

# NOTD Voting System - Backend

This README provides an overview of the backend components of the NOTD Voting System, including the `castVote` API/Lambda and `addHeadlineToContract` Lambda.

## castVote API/Lambda

The `castVote` API/Lambda is responsible for handling the voting process when a user casts a vote for a headline.

### Functionality

1. The API receives a POST request with the following data:
   - `transactionHash`: The hash of the voting transaction.
   - `date`: The date of the voting event.

2. The Lambda function retrieves the transaction receipt using the provided `transactionHash` and checks the transaction status.

3. If the transaction is not found or the status is not successful, appropriate error messages are returned.

4. If the transaction is successful, the Lambda function interacts with the voting contract to determine the winning headline for the given date.

5. The winning headline, winning headline index, and vote count are retrieved from the voting contract.

6. The API returns a success response with the winning headline and vote count.

### Error Handling

- If the required data (`transactionHash` and `date`) is missing, a 400 status code is returned with an appropriate error message.
- If the transaction is not found, a 404 status code is returned with an error message indicating that the transaction was not found and suggesting to retry after a certain time.
- If the transaction status is not successful, the exact error message is retrieved from the transaction receipt and returned with a 400 status code.
- If any other error occurs during the process, a 500 status code is returned with a generic error message.

### CORS Configuration

The API Gateway is configured to allow cross-origin resource sharing (CORS) for the `castVote` API. The necessary CORS headers are set in the API Gateway's integration response and method response for the relevant HTTP status codes (200, 400, 500).

## addHeadlineToContract Lambda

The `addHeadlineToContract` Lambda is responsible for adding headlines to the voting contract based on the provided date and headline data.

### Functionality

1. The Lambda function receives an event with the following data:
   - `date`: The date of the headlines.
   - `headlines`: An object containing the headlines and their corresponding data (links and index).

2. The function validates the maximum number of headlines allowed (currently set to 5). If the headline count exceeds the limit, an error response is returned.

3. The function connects to the Ethereum network using the provided `HDWalletProvider` and `Web3` instances.

4. It creates an instance of the voting contract using the contract ABI and address.

5. The function converts the provided date to a `uint256` value using the `convertDateToUint` utility function.

6. It logs the existing headline count for the given date by calling the `getHeadlineCount` function of the voting contract.

7. The function converts the `headlines` object to an array and sorts it based on the index of each headline.

8. It iterates over the sorted headlines array and adds each headline to the voting contract using the `addHeadline` function.

9. If all headlines are added successfully, a success response with a 200 status code is returned.

### Error Handling

- If the headline count exceeds the maximum limit, a 400 status code is returned with an appropriate error message.
- If any error occurs during the process of adding headlines, a 500 status code is returned with a generic error message.

### Logging

The Lambda function includes extensive logging statements to provide visibility into the received data, converted values, existing headline count, sorted headlines, and the progress of adding each headline to the contract.

## Deployment and Configuration

- The `castVote` API/Lambda and `addHeadlineToContract` Lambda are deployed using the AWS Lambda service.
- The necessary environment variables (`MNEMONIC`, `PROVIDER_URL`, `ADMIN_ADDRESS`) should be properly configured in the Lambda function's settings.
- The required dependencies (`web3`, `@truffle/hdwallet-provider`) should be included in the Lambda function's deployment package.

Please refer to the code comments and logging statements for more detailed information on the implementation and flow of each component.


## Future Enhancements

- Implement a leaderboard to showcase the journalists with the most winning headlines.
- Integrate a notification system to alert journalists when a new voting period begins or when the winning headline is determined.
- Explore the use of decentralized storage solutions like IPFS for storing headline metadata.
- Enhance the security and scalability of the voting system.
- Conduct thorough audits and testing to ensure the integrity and reliability of the voting process.

