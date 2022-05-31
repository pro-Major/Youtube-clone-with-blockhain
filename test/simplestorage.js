const SimpleStorage = artifacts.require('./SimpleStorage.sol')

contract('SimpleStorage', (accounts) => {
  it('...should store the value 89.', async () => {
    const simpleStorageInstance = await SimpleStorage.deployed()

    // Set value of 89
    await simpleStorageInstance.set(89, { from: accounts[0] })

    // Get stored value
    const storedData = await simpleStorageInstance.get.call()

    assert.equal(storedData, 89, 'The value 89 was not stored.')
  })
})

// Get the contract instance.
// const networkId = await web3.eth.net.getId()
// const deployedNetwork = SimpleStorageContract.networks[networkId]
// const instance = new web3.eth.Contract(
//   SimpleStorageContract.abi,
//   deployedNetwork && deployedNetwork.address,
// )

// Set web3, accounts, and contract to the state, and then proceed with an
// example of interacting with the contract's methods.
//this.setState({ web3, accounts, contract: instance }, this.runExample)
