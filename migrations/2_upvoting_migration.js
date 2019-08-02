const UpVoting = artifacts.require("UpVoting");

module.exports = function(deployer) {
  deployer.deploy(UpVoting);
};
