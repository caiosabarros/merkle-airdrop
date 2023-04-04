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
      url: "https://polygon-mumbai.g.alchemy.com/v2/LmSVvaZo03Kerk4tqmwsHHwp4IwPT6IW",
      accounts: [process.env.PRIV_KEY]
    }
  },
    mocha: {
      timeout: 100000000
    },
}
