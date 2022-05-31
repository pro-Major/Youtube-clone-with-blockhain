import React, { Component } from 'react'
import { Button, Input, Stack, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'

export default class Yvideos extends Component {
    render() {
        console.log(this.props.videos)
        return (
            <div className="container m-4">
                <div className="row">
                    <div className="col-md-8">
                        {
                            (this.props.currentHash === '' && this.props.currentTitle === '') ?
                                <h1>No data</h1> :
                                <>

                                    <div className="w-100">

                                        {/* <video
                                            src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                                            controls

                                        >
                                        </video> */}
                                        <iframe src={`https://ipfs.infura.io/ipfs/${this.props.currentHash}`}
                                            frameBorder="0" allowFullScreen className="video"></iframe>
                                    </div>
                                    <h3><b><i>{this.props.currentTitle}</i></b></h3>
                                </>

                        }
                    </div>

                    <div className="col-md-4">
                        <Typography variant="subtitle1" color="initial">
                            File Upload
                        </Typography>
                        <form
                            onSubmit={(event) => {
                                event.preventDefault()
                                const title = this.videoTitle.value
                                this.props.uploadVideo(title)
                            }}
                        >
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <label htmlFor="contained-button-file">
                                    <Input
                                        className="mt-3"
                                        accept=".mp4 .mkv .ogg .wmv"
                                        id="contained-button-file"
                                        type="file"
                                        onChange={this.props.captureFile}
                                    />
                                </label>
                            </Stack>
                            <input
                                type="text"
                                className="mt-3"
                                id="videoTitle"
                                label="Video Tile"
                                ref={(input) => {
                                    this.videoTitle = input
                                }}

                            />
                            <button type="submit" className="btn btn-primary mt-3">
                                Upload
                            </button>
                        </form>


                        {this.props.videos.length < 1 ? <h1>No Videos</h1> : this.props.videos.map((video, key) => {
                            return (
                                <div className="card mb-4 text-center bg-secondary mx-auto" style={{ width: '175px' }} key={key} >
                                    <div className="card-title bg-dark">
                                        <small className="text-white"><b>{video.title}</b></small>
                                    </div>
                                    <div>
                                        <p onClick={() => this.props.changeVideo(video.hash, video.title)}>
                                            <iframe src={`https://ipfs.infura.io/ipfs/${video.hash}`}
                                                frameBorder="0" allowFullScreen className="video"></iframe>
                                        </p>
                                    </div>
                                </div>
                            )
                        })}


                    </div>
                </div>
            </div>
        )
    }
}
