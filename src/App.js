import React, { Component } from 'react';
import './App.css';
import { withAuthenticator } from 'aws-amplify-react'
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
import Home from './components/Home.js'
const moment = require('moment')

Amplify.configure(aws_exports);



//gets todays day as string in "YYYY-MM-DD"
const comboVar = JSON.stringify(new Date()).substring(1,11)
const currentMoment = moment()


class App extends Component {

  componentDidMount() {
    console.log(`Current Date String is: ${comboVar}`);
    console.log(`Current moment() is: ${currentMoment}`);
    console.log(`Current moment().format().substring(0,10) is: ${currentMoment.format().substring(0,10)}`);

  }

  render() {
    return (
      <div>
        <Home />
      </div>
    )
  }
}

export default withAuthenticator(App, true);
