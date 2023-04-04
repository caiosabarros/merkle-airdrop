// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Merkle is ERC1155 {
	
    string public name = "Wallbee Founder";

    bytes32 root;
    mapping(address => bool) claimed;

    constructor(bytes32 _root) ERC1155("https://gateway.pinata.cloud/ipfs/Qmb8xAZQGTZSmTz8S9uM61uwogSyhJm3tsG53KW6CeWaiG/{id}.json") {
        root = _root;
    }

    function airdrop(bytes32[] calldata _proof, address _accountToSendTokensTo) external {
        bool isEligible = MerkleProof.verify(_proof, root, keccak256(abi.encodePacked(_accountToSendTokensTo)));
        require(isEligible, "not eligible");
        // require(claimed[_accountToSendTokensTo] == false, "already claimed");
        claimed[_accountToSendTokensTo] = true;
        _mint(_accountToSendTokensTo, 1, 1, "");
    }
}

