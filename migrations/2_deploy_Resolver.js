const NFTResolver = artifacts.require("NFTResolver");

module.exports = function (deployer) {
  deployer.deploy(NFTResolver);
};
