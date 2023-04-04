const { MerkleTree } = require('merkletreejs');
const Merkle = artifacts.require("Merkle");
const accountss = require('../accounts.js');

contract("Merkle", function (accounts) {
	let deployer = accounts[0];
	console.log(deployer, "deployer")	
	let eligible = [...accountss]; // accounts indexes 0 to 9
	let eligibleLength = eligible.length;
	console.log(eligible, "second account")	
	console.log("eligible", eligible[0]);
	let nonEligible = accountss.slice(10, 19); // accounts indexes 10 to 19
	console.log("non-eligible", nonEligible[0]);
	let tree, merkle;

	_buildMerkleTree = () => {
		const leaves = eligible.map(leaf => web3.utils.keccak256(leaf));
		return new MerkleTree(leaves, web3.utils.keccak256, {sortPairs: true});
	}

	_deployToken = async () => {
		return await Merkle.new(tree.getHexRoot());
	}

	beforeEach(async () => {
		tree = _buildMerkleTree();
		merkle = await _deployToken();
	});

	it("prints the uri of the NFT airdropped", async function() {
		const uri = await merkle.uri(1);
		console.log(uri);
	});

	it("claims the airdrop to WallBee address 33 times", async function () {
		for (let index = 0; index < 33; index++) {
			// if(index < `${index}`) continue; uncomment this line if airdrop stops
			//at position `${index}`.
			const leaf = web3.utils.keccak256(eligible[0]);
			const proof = tree.getHexProof(leaf);
	
			await merkle.airdrop(proof, eligible[0], {from: deployer});
			const balance = await merkle.balanceOf(eligible[index], 1);
			console.log(balance.toString());

			console.log(`Airdrop done ${index+1} times out of 33 times`);
		}
	});

	// it("claims the airdrop to all eligible addresses", async function () {
	// 	for (let index = 0; index < eligibleLength; index++) {
	// 		// if(index < `${index}`) continue; uncomment this line if airdrop stops
	// 		//at position `${index}`.
	// 		const balan = await merkle.balanceOf(eligible[index], 1);
	// 		console.log("initial", balan.toString());
	// 		const leaf = web3.utils.keccak256(eligible[index]);
	// 		const proof = tree.getHexProof(leaf);
	
	// 		await merkle.airdrop(proof, eligible[index], {from: deployer});
	// 		const balance = await merkle.balanceOf(eligible[index], 1);
	// 		console.log(balance.toString());
	// 		assert.equal(balance, 1);

	// 		console.log(`Airdrop done for ${index+1} out of ${eligibleLength} accounts`);

	// 		//If the airdrop finishes at x out of 166 accounts, modify
	// 		//line 48 to variable index start at x+1 and run the project again.
	// 	}
	// });
});
