require("hardhat-gas-reporter");
require("@nomiclabs/hardhat-truffle5");
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
      accounts: ['cfb75b493523d14f532c9e084f469d8bb9cd7de0fff589797587c29e9ae12240']
    }
  }
}
