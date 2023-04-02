const NFTWarranty = artifacts.require("NFTWarranty");

module.exports = function (deployer) {
  deployer.deploy(NFTWarranty);
};
