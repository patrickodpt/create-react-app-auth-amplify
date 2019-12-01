import React, { Component, Fragment } from 'react';
import MyList from './List.js'
import MyHeader from './Header.js'
import NewUserForm from './NewUserForm.js'
import { Paper, Container } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const styles = {
  Paper: {
    padding: 20,
    margin: 20,
    marginTop: 10,
    // marginBottom: 20,
    height: 500,
    overflowY: "auto"
  },
  PaperLogin: {
    padding: 50,
    margin: 30,
    marginTop: 10,
    // marginBottom: 20,
    // justify: "center",
    height: 450,
  }
};

class LogInForm extends Component {
  state = {
    user: {userName: "", password: ""},
  }

  getUserByPassword = () => {
    console.log('getUserByPassword ran');
    fetch(`/user/password/${this.state.user.password}`) //need to learn how to access user with passord
      .then(res => res.json())
      .then(user => user[0].userName ? this.setCurrentUser(user) : console.log(`no user found`))
      //TODO:: temp disable to test what info is recieved back
      .then(() => this.props.loginHandler(this.state.user))
      .catch(error => console.error(error))
  }

  setCurrentUser = (user) => this.setState({ user: user[0]})

  handleTextInput = (e) => {
    let userLoggingIn = {...this.state.user}
    userLoggingIn[e.target.name] = e.target.value
    this.setState({ user: userLoggingIn })
  }

  addNewUser = (newUser) => {
    fetch('/user',
      { method : 'POST'
      , headers: { 'Content-Type': 'application/json' }
      , body: JSON.stringify(newUser)
      }
    )
    .then(res => res.json())
    .then(newUser => this.setState({user: newUser[0]}) )
    .then( () => {
      fetch(`/user/startDay/${this.state.user._id}/${JSON.stringify(new Date()).substring(1,11)}`, //Unable to get _id and use to post new day
        { method: 'POST'
        , headers: { 'Content-Type': 'application/json' }
        , body:  JSON.stringify(
          {
            "userID"     : `${this.state.user._id}`,
            "todaysDate" : `${JSON.stringify(new Date()).substring(1,11)}`,
            "todaySum"   : 0,
            "drinks"     : []
          }
        )
        }
      )
    })
  }

  render() {
    return (
      <Fragment>
        <TextField
          name="userName" //importantly, matches name of key in this.state
          onChange={this.handleTextInput}
          id="outlined-text"
          value={this.state.user.userName}
          type="text"
          margin="normal"
          variant="outlined"
          label="Username"
          // required={true}
        />
        <TextField
          name="password"
          onChange={this.handleTextInput}
          value={this.state.user.password}
          type="password"
          margin="normal"
          id="standard-password-input"
          variant="outlined"
          label="Password"
        />
        <Button onClick={this.getUserByPassword} color="#primary" style={{backgroundColor: "#80e27e"}}>
          SUBMIT
        </Button>
        <NewUserForm passUser={this.state.user} addUser={this.addNewUser}/>
      </Fragment>
    )
  }
}

class Home extends Component {
  state = {
    loggedIn: false,
    user: {}
  }

  //will convert loggedIn to true when clicked in LogInForm
  handleLoginSubmit = (loggedInUser) => {
    //need to check on submit if password matches a password in the database
    this.setState({ loggedIn: !this.state.loggedIn, user: loggedInUser })
  }

  render() {
    return (
      <Fragment>
        <MyHeader/>
        {this.state.loggedIn
          ? <Container maxWidth="sm">
              <Paper style={styles.Paper}> <MyList currentUser={this.state.user}/> </Paper>
              <Paper style={styles.Paper}>
                GRAPH GOES HERE
              </Paper>
            </Container>
          : <Paper style={styles.PaperLogin}>
              <LogInForm loginHandler={this.handleLoginSubmit}/>
            </Paper>
        }
      </Fragment>
    )
  }
}

export default Home;
