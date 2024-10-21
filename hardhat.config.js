require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.18",
  networks: {
    baseSepolia: {
    url: 'https://sepolia.base.org',
      accounts: [`0x$495f8ce0cec433ba12459445a2eb5c8653459621d8d1a2aca86993aeb155de22`],
    },
  },
};