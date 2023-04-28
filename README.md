
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

# Errors and Mistakes

Well, the main mistake that was done is that I - the creator of the airdrop - have mistakenly just based my code on a code from another repository in order to use a different method for being gas efficient in the airdrop. Usually the airdrops out there use the for loop approach, where they'll have a for loop inside the airdrop smart contract. The thing is that this is very consuming when it concerns to the amount of gas spent in the airdrop. So, for the sake of saving gas, I had tested the following code in the Mumbai testnet and the savings were actually pretty impressive when compared with the for loop approach.

The thing that caused the error was assuming that the Mumbai gas spending would be aproximatelly the same for the Polygon mainnet. It turned out though that the gas consumption in the mainnet was largely bigger than the one I had previously approximated from the Mumbai testnet. This led to the zeroing of the wallet balance. Then, there came the error:

The `Token.sol` contract uses the `"@openzeppelin/contracts/utils/cryptography/MerkleProof.sol"` contract from the @openzeppelin/contracts library. The main mistake was that I didn't look in the documentation in the openzeppelin docs to find the aproppriate library to build thee merkle tree. So, I used the one I did the tests with, where I had no problem with the wallet running out of balance. So, I used the `const { MerkleTree } = require('merkletreejs');` which uses the `merkletreejs` library. The thing is once the wallet ran out of balance, I looked into the OpenZeppelin docs and found out that openzeppelin has a library to build a merkle tree.
The library is `import { StandardMerkleTree } from "@openzeppelin/merkle-tree";`. The thing is that the once the code was correctly updated with the correct library, the root hash for the merkle tree was different in each of the two different libraries used because the "@openzeppelin/merkle-tree" uses a double hashing function to build the tree, whereas the "merkletreejs" uses only one hashing function, which makes the hashes different, making it impossible to get access to the deployed contract and continue the airdrop from where it stopped once the wallet had more available balance.

# Errors to avoid:

1. Of course, do the best to make sure there is saving of gas in the solidity contract wherenever is possible! But do not assume that the testnet and mainnet will have the same gas spendings.
2. Make sure not only to get the code from some good github repository, but also make sure that, before any implementation, to check out the docs for the libraries used.
3. Test ALL possible scenarios in your tests of the smart contract.
