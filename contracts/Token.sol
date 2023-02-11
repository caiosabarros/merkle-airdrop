// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/cryptography/MerkleProof.sol";

contract Token is ERC20 {
	
    bytes32 root;
    mapping(address => bool) claimed;

    constructor(bytes32 _root) ERC20("Token", "MKT") {
        root = _root;
    }

    function airdrop(bytes32[] calldata _proof, address _accountToSendTokensTo) external {
        bool isEligible = MerkleProof.verify(_proof, root, keccak256(abi.encodePacked(_accountToSendTokensTo)));
        require(isEligible, "not eligible");
        require(claimed[_accountToSendTokensTo] == false, "already claimed");
        claimed[_accountToSendTokensTo] = true;
        _mint(_accountToSendTokensTo, 1000 * 1e18);
    }


}


