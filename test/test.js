const { MerkleTree } = require('merkletreejs');
const Token = artifacts.require("Token");

contract("Token", function (accounts) {
	let eligible = accounts.slice(0, 9); // accounts indexes 0 to 9
	console.log("eligible", eligible[0]);
	let nonEligible = accounts.slice(10, 19); // accounts indexes 10 to 19
	console.log("non-eligible", nonEligible[0]);
	let tree, token;

	_buildMerkleTree = () => {
		const leaves = eligible.map(leaf => web3.utils.keccak256(leaf));
		return new MerkleTree(leaves, web3.utils.keccak256, {sortPairs: true});
	}

	_deployToken = async () => {
		return await Token.new(tree.getHexRoot());
	}

	beforeEach(async () => {
		tree = _buildMerkleTree();
		token = await _deployToken();
	});

	it("claims the airdrop to an eligible address", async function () {
		const balan = await token.balanceOf(eligible[0]);
		console.log("initial", balan.toString());
		const leaf = web3.utils.keccak256(eligible[0]);
		const proof = tree.getHexProof(leaf);

		await token.airdrop(proof, {from: eligible[0]});
		const balance = await token.balanceOf(eligible[0]);
		console.log(balance.toString());
		assert.equal(balance, web3.utils.toWei("1000"));
	});

	it("fails to claim the airdrop to a non-eligible address", async function () {
		const leaf = web3.utils.keccak256(nonEligible[0]);
		const proof = tree.getHexProof(leaf);

		try {
			await token.airdrop(proof, {from: nonEligible[0]});
			assert.fail();
		} catch (e) {
			assert.equal(e.message, "VM Exception while processing transaction: reverted with reason string 'not eligible'");
		}
	});

	it("cannot claim multiple times", async function () {
		const leaf = web3.utils.keccak256(eligible[0]);
		const proof = tree.getHexProof(leaf);

		await token.airdrop(proof, {from: eligible[0]});

		try {
			await token.airdrop(proof, {from: eligible[0]});
			assert.fail();
		} catch (e) {
			assert.equal(e.message, "VM Exception while processing transaction: reverted with reason string 'already claimed'");
		}
	});
});
