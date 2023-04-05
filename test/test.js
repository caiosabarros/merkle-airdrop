const { MerkleTree } = require('merkletreejs');
const Merkle = artifacts.require("Merkle");
const accountss = require('../accounts.js');
const MerkleABI = require('../artifacts/contracts/Merkle.sol/Merkle.json').abi
const Web3 = require('web3');

contract("Merkle", function (accounts) {

	const web3 = new Web3('https://polygon-mainnet.g.alchemy.com/v2/****');
	let deployer = accounts[0];
	console.log(deployer, "deployer")	
	let eligible = accountss.slice(44);
	let eligibleLength = eligible.length;
	let tree, merkle, address;

	_buildMerkleTree = () => {
		const leaves = eligible.map(leaf => web3.utils.keccak256(leaf));
		return new MerkleTree(leaves, web3.utils.keccak256, {sortPairs: true});
	}

	_getDeployedToken = async () => {
		address = "0x90f8DBdFE0447f84bF8C004e091513AC5D5273b3"
		const contract = new web3.eth.Contract(MerkleABI, address);
		return contract;
	}

	beforeEach(async () => {
		tree = _buildMerkleTree();
		console.log(tree, "tree");
		merkle = await _getDeployedToken();
	});

	it('calls uri function', async function() {
		const uri = await merkle.methods.uri(1).call();
	});

	it("claims the airdrop to all eligible addresses", async function () {
		for (let index = 0; index < eligibleLength; index++) {
			const balan = await merkle.methods.balanceOf(eligible[index], 1);
			const leaf = web3.utils.keccak256(eligible[index]);
			const proof = tree.getHexProof(leaf);
			const account = web3.eth.accounts.privateKeyToAccount("****");
	
			const merkleMethod = merkle.methods.airdrop(proof, eligible[index]);
			const estimatedGas = await merkleMethod.estimateGas({ from: account.address });
			const gasLimit = Math.min(estimatedGas * 2, 15000000);
			console.log(estimatedGas, "estimated");
			const gasPrice = await web3.eth.getGasPrice();
			const nonce = await web3.eth.getTransactionCount(account.address);


			web3.eth.defaultAccount = account.address;

			const txParams = {
				from: account.address,
				to: merkle.address,
				gasPrice: gasPrice,
				gasLimit: gasLimit,
				nonce: nonce,
				data: merkle.methods.airdrop(proof, eligible[index]).encodeABI()
			  };

			const signedTx = await account.signTransaction(txParams);
			const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

			await merkle.methods.airdrop(proof, eligible[index]);
			const balance = await merkle.methods.balanceOf(eligible[index], 1);
			console.log(balance.toString());
			assert.equal(balance, 1);

			console.log(`Airdrop done for ${index+1} out of ${eligibleLength} accounts`);

			//If the airdrop finishes at x out of 166 accounts, modify
			//line 48 to variable index start at x+1 and run the project again.
		}
	});
});
