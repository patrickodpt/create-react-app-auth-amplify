import React, { Component, Fragment } from 'react'
import { Paper, Typography, Container, Grid } from '@material-ui/core';

const styles = {
  Paper: {
    padding: 20,
    height: 60,
    width: 100,
    background: "#4caf50",
  }
};

class MySum extends Component {
  render() {
    return (
      <Grid container justify="center" align="center">
        <Paper style={
          {padding: 20,
          height: 60,
          width: 100,
          background: this.props.currentSum < 25
            ? "#4caf50"
            : this.props.currentSum < 30
              ? "#ffeb3b"
              : "#ef5350"
          }
         }>
          <Typography
            display="block"
            align="center"
            variant="h2"
            color="inherit"
            style={{marginTop: 5}}
            >
            {this.props.currentSum}
          </Typography>
        </Paper>
      </Grid>
    )
  }
}

export default MySum;
