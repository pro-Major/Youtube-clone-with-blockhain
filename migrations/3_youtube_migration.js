var youtubeMigrations = artifacts.require('./YoutubeClone.sol')

module.exports = function (deployer) {
  deployer.deploy(youtubeMigrations)
}
