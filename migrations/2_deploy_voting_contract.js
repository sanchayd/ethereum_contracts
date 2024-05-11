const VotingContract = artifacts.require("NOTDVotingContract");

module.exports = function (deployer) {
  deployer.deploy(VotingContract);
};