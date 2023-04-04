
# Contract Tests

![commited](https://user-images.githubusercontent.com/79999985/223297094-428c181e-a33b-4e66-9cf3-d28de1319e78.png)

# ENV Variables:

There is the `TESTNET`, `PRIV_KEY` and `MAINNET` variables. To make the airdrop, you need to give the correct `PRIV_KEY` and `MAINNET`  variables.
The PRIV_KEY corresponds to the account which will make the airdrop. (Official WallBee Wallet).

The MAINNET variables follows the convention:
https://polygon-mainnet.g.alchemy.com/v2/<API-KEY-HERE>

To run the airdrop, run:
`npm install` && `npx hardhat test --network polygon` 

Comments were added in the test.js file in case the airdrop stops at some time. Duplicates accounts were already removed, so everything should run smoothly.

Do the airdrop in two parts:
1. Mint 33 times for the WallBee Official Wallet Address. 
2. Stop the process, comment the test: `claims the airdrop to WallBee address 33 times` and uncomment the test function: `claims the airdrop to all eligible addresses` and run the command `npx hardhat test --network polygon` again.
