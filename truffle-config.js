const path = require("path");
require('dotenv').config();
const key = process.env.MNEMONIC;
const HDWalletProvider = require("@truffle/hdwallet-provider");
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545,
      network_id: "1337"
    },
    ropsten: {
      networkCheckTimeout: 10000,
      provider: () => new HDWalletProvider(`${key}`,`https://ropsten.infura.io/v3/1d5fb752e905416ea938459ac8872368`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
   
    matic:{
      networkCheckTimeout: 10000,
      provider: () => new HDWalletProvider(`${key}`,`wss://polygon-mumbai.g.alchemy.com/v2/BNLEUK85VPivtGDAWmqdZWFILkGQbv5h`),
      network_id:  80001,     
      //gas: 20000000,
      gasPrice:100000000000,        
      confirmations: 1,    
      timeoutBlocks: 200, 
      skipDryRun: true     

    }
  },
  compilers: {
    solc: {
    version: "^0.8.1"
    }
},
plugins: [
  'truffle-plugin-verify'
],
api_keys: {
  etherscan:'VE8G8TQAA495N1M7R32RP5RT46KVCMSMRA',
  polygonscan: 'YARQS2K6QJMV21FTY3Q8MSS6T7DSP8ACHH'
}
};