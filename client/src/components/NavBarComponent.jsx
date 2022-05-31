import React, { Component } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Identicon from 'identicon.js'

export default class NavBarComponent extends Component {
    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary">
                    <Toolbar disableGutters >
                        <Typography
                            variant="subtitle1"
                            component="div"
                        >
                            Video Uploader
                        </Typography>

                        <Typography
                            variant="h6"
                            component="div"
                            aria-haspopup="true"
                            style={{ marginLeft: 775 }}
                        >
                            {!this.props.accounts ?
                                <Typography variant="subtitle2" color="initial">Please connect the wallet</Typography> :
                                <div>
                                    <img
                                        width={30}
                                        height={30}
                                        src={`data:image/png;base64,${new Identicon(this.props.accounts, 30).toString()}`}
                                        alt="Loading ...."
                                    />
                                    <Typography variant="subtitle2" color="initial">
                                        {this.props.accounts}
                                    </Typography>
                                </div>
                            }

                        </Typography>

                    </Toolbar>

                </AppBar>
            </Box>

        )
    }
}
