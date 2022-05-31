import React, { Component } from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import getWeb3 from './getWeb3'
import NavBarComponent from './components/NavBarComponent'
import Typography from '@mui/material/Typography'
import Youtube from './contracts/YoutubeClone.json'
import Yvideos from './components/Yvideos'

import { create } from 'ipfs-http-client'

const client = create('https://ipfs.infura.io:5001/api/v0')

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    buffer: null,
    youtubeInfo: null,
    videos: [],
    loading: true,
    currentHash: null,
    currentTitle: null,
    videosCount: 0,
  }

  componentDidMount = async () => {
    try {
      const web3 = await getWeb3() //Get the inject web3 information (Metamask)
      const accounts = await web3.eth.getAccounts()  //Get account number
      this.setState({ accounts: accounts[0] }) //Update the account number 

      // Load the contract if the network is running properly
      const networkId = await web3.eth.net.getId()
      console.log(`network ID is `,networkId)
      const deployedNetwork = Youtube.networks[networkId]
      console.log(`deployed newtowrk `,deployedNetwork)
      if (deployedNetwork) {
        const youtubeInfo = new web3.eth.Contract(
          Youtube.abi,
          deployedNetwork.address,
        )
        console.log('Youtube Info', youtubeInfo)
        this.setState({ youtubeInfo })
        // Total no of videos
        const videosCount = await youtubeInfo.methods.videoCount().call()  //use call when read.
        this.setState({ videosCount })
        console.log('Videosc', videosCount)

        // Videos
        for (var i = videosCount; i >= 1; i--) {
          const video = await youtubeInfo.methods.videos(i).call()
          this.setState({
            videos: [...this.state.videos, video],
          })
        }

        const latest = await youtubeInfo.methods.videos(videosCount).call()
        this.setState({
          currentHash: latest.hash,
          currentTitle: latest.title,
        })
        this.setState({ loading: false })
      } else {
        alert('Your contract is not deployed to detected network')
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      )
      console.error(error)
    }
  }

  //Get Videos
  captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    console.log('Reader', reader)

    reader.onloadend = () => {
      this.setState({ buffer: Buffer.from(reader.result) })
      console.log('buffer', this.state.buffer)
    }
  }

  // Upload Videos

  uploadVideo = async (title) => {
    // file to the blockchain
    //ipfs.add(file,callback)
    try {
      console.log('Uploading ....', title)
      const added = await client.add(this.state.buffer)
      console.log('Added', added)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      console.log('URL', url)

      this.setState({ loading: true })
      this.state.youtubeInfo.methods
        .UploadVideos(added.path, title)
        .send({ from: this.state.accounts })
        .on('transactionHash', (hash) => {
          this.setState({ loading: false })
        })
    } catch (err) {
      console.log('Error', err)
    }
  }

  //Change Videos
  changeVideo = (hash, title) => {
    this.setState({ currentHash: hash })
    this.setState({ currentTitle: title })
  }

  render() {
    // if (!this.state.web3) {
    //   return <div>Loading Web3, accounts, and contract...</div>
    // }
    return (
      <>
        <NavBarComponent accounts={this.state.accounts} />

        {this.state.loading ? (
          <Typography variant="subtitle1" color="initial">
            Please Wait
          </Typography>
        ) : (
          <Yvideos
            videos={this.state.videos}
            uploadVideo={this.uploadVideo}
            captureFile={this.captureFile}
            changeVideo={this.changeVideo}
            currentHash={this.state.currentHash}
            currentTitle={this.state.currentTitle}
          />
        )}
      </>
    )
  }
}

export default App
