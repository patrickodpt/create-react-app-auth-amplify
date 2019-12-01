import React, {Component, Fragment} from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = {
  Fab: {
    position: 'fixed',
    right: 20,
    bottom: 20,
  }
};

class NewUserForm extends Component {
  state = {
    newUser: { userName: "", password: "" },
    isOpen: false
  }

  handleTextInput = (e) => {
    let newUser = {...this.state.newUser}
    newUser[e.target.name] = e.target.value
    this.setState({ newUser: newUser })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addUser(this.state.newUser)
    this.setState({ isOpen: !this.state.isOpen })
  }

  //  handleChange = name => event => {
  //   setValues({ ...values, [name]: event.target.value });
  // };

  handleClick = () => {
    this.setState({ isOpen: !this.state.isOpen })
    // this.forceUpdate();
  }

  render() {
    return (
      <Fragment>
        <Dialog open={this.state.isOpen} onClose={this.handleClick}>
          <DialogTitle id="form-dialog-title">Sign Up:</DialogTitle>
          <DialogContent>
            <TextField
              name="userName" //importantly, matches name of key in this.state
              onChange={this.handleTextInput}
              id="outlined"
              label="Username"
              value={this.state.newUser.userName}
              type="text"
              margin="normal"
              variant="outlined"
              // helperText="Enter a username"
            />
            <TextField
              name="password"
              onChange={this.handleTextInput}
              value={this.state.newUser.password}
              type="password"
              margin="normal"
              id="outlined-number"
              variant="outlined"
              label="Password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClick} color="inherit" style={{backgroundColor: "#80e27e"}}>
              CANCEL
            </Button>
            <Button onClick={this.handleSubmit} color="inherit" style={{backgroundColor: "#80e27e"}}>
              SUBMIT
            </Button>
          </DialogActions>
        </Dialog>
        <Fab color="primary" aria-label="add" style={styles.Fab} onClick={this.handleClick}>
          <AddIcon />
        </Fab>
      </Fragment>
    )
  }
}

export default NewUserForm;
