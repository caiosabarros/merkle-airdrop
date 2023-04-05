require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-truffle5");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "mumbai",
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    hardhat: {
    },
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/*****",
      accounts: ["/*****"]
    },
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/407CFOkuZeDUWahye5xZLiU73r-E9abK",
      accounts: ["/*****"],
      gasPrice: 20000000000, // Increase the gas price
      gas: 8000000, // Increase the gas limit
      defaultAccount: 0
    }
  },
    mocha: {
      timeout: 100000000
    },
}
