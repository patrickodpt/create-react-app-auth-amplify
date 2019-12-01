import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  Title: {

    flexGrow: 1,
  }
};

//MAY WANT TO ADD "className" back to do CSS styling

class MyHeader extends Component {
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar style={{ textAlign:"center", align:"center" }}>
            <Typography variant="h4" style={styles.Title}>
              EtOHueristics
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default MyHeader;
