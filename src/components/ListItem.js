import React, { Component, Fragment } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import Button from '@material-ui/core/Button';

class MyListItem extends Component {
  render(){
    return (
      <Fragment>
        <ListItem dense={true}>
          <ListItemText
            primary={`EtOH: ${this.props.grams}g`}
            secondary={`ABV: ${this.props.drinkABV}%  Vol: ${this.props.drinkVol}oz`}
          />
          <Button onClick={this.props.deleteDrinkData} color="inherit">
            DELETE
          </Button>
        </ListItem>
        <Divider />
      </Fragment>
    )
  }
}

export default MyListItem;
