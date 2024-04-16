const DailyNewsNFT = artifacts.require("DailyNewsNFT");

module.exports = function (deployer) {
  deployer.deploy(DailyNewsNFT);
};