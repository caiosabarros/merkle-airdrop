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
      url: process.env.TESTNET,
      accounts: [process.env.PRIV_KEY]
    },
    polygon: {
      url: "",
      accounts: [process.env.PRIV_KEY]
    }
  },
    mocha: {
      timeout: 100000000
    },
}
