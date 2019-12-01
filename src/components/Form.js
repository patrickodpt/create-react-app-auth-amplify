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

class NewDrinkForm extends Component {
  state = {
    newDrink: { volumeOz: 12, abv: 5, grams: 0 },
    isOpen: false
  }

  handleTextInput = (e) => {
    let newDrink = {...this.state.newDrink}
    newDrink[e.target.name] = e.target.value
    this.setState({ newDrink: newDrink })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.addDrink(this.state.newDrink)
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
        <Dialog open={this.state.isOpen} onClose={this.handleClick} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add A New Drink</DialogTitle>
          <DialogContent>
            <TextField
              name="abv" //importantly, matches name of key in this.state
              onChange={this.handleTextInput}
              id="outlined-number"
              label="ABV"
              value={this.state.newDrink.abv}
              type="number"
              margin="normal"
              variant="outlined"
              helperText="Number between 0.5-100"
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
            <TextField
              name="volumeOz"
              onChange={this.handleTextInput}
              value={this.state.newDrink.volumeOz}
              type="number"
              margin="normal"
              id="outlined-number"
              variant="outlined"
              label="Volume"
              InputProps={{
                endAdornment: <InputAdornment position="end">Oz</InputAdornment>,
                // inputProps: { min: 0, max: 10 }, ::::TODO: FIX INPUT CONTROLS
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClick} color="primary">
              CANCEL
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
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

export default NewDrinkForm;

//                         BELOW IS FORMER WORKING RENDER
// render() {
//   return (
//     <Fragment>
//       <form onSubmit={this.handleSubmit}>
//         <input
//           type="number"
//           step="0.05"
//           min="0.25"
//           max="1000"
//           name="volumeOz"
//           onChange={this.handleTextInput}
//           placeholder="Volume in Ounces"
//         />
//         <input
//           type="number"
//           step="0.1"
//           min="0.1"
//           max="100"
//           name="abv"
//           onChange={this.handleTextInput}
//           placeholder="A.B.V."
//         />
//         <input type="submit" value="SUBMIT" />
//       </form>
//       <Fab color="primary" aria-label="add" style={styles.Fab} onClick={handleClickOpen}>
//         <AddIcon />
//       </Fab>
//     </Fragment>
//   )
// }
