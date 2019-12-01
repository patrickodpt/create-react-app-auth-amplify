import React, { Component } from 'react'
import MyListItem from './ListItem.js'
import Form from './Form.js'
import MySum from './Sum.js'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
const moment = require('moment')

let currentMoment = moment()

class MyList extends Component {
  state = {
    todaysSum: 0,
    drinks: [],
    weeklySum: 0
  }

  //this.props.currentUser: provides loggedin user.
  //can use this.props.currentUser._id for fetch.

  componentDidMount() {
    // this.calculateGramsAndSum()
    this.getTodayFromServer()
    this.getSummaryData()
  }

  handleNavButton = () => {

  }

  getSummaryData = () => {
    console.log('getSummaryData ran');
    fetch(`/user/userData/${this.props.currentUser._id}`) //need to learn how to access userID and todaysDate
      .then(res => res.json())
      .then(summaryData => summaryData.length > 0
        ? this.setState({ weeklySum: summaryData[0].weekSum })
        : this.setState({ weeklySum: 99999}))
      .catch(error => console.error(error))
  }

  getTodayFromServer = () => {
    console.log('getTodayFromServer ran');
    fetch(`/user/singleDayData/${this.props.currentUser._id}/${currentMoment.format().substring(0,10)}`)
      .then(res => {console.log(res); return res.json()} )
      .then(dailyData => dailyData.length < 1
        ? fetch(`/user/startDay/${this.props.currentUser._id}/${currentMoment.format().substring(0,10)}`,
            { method: 'POST'
            , headers: { 'Content-Type': 'application/json' }
            , body:  JSON.stringify(
              { "userID"     : `${this.props.currentUser._id}`,
                "todaysDate" : `${currentMoment.format().substring(0,10)}`,
                "todaySum"   : 0,
                "drinks"     : []
              })
            })
            .then( (res) => console.log(res))
        : this.setTodaysData(dailyData)
      )
      .catch(error => console.error(error))
  }

  setTodaysData = (dailyData) => {
    //sets state to data from DB and calculateGramsAndSum inital values
    this.setState({ drinks: dailyData[0].drinks}, () => this.calculateGramsAndSum() )
    //     CURRENTLY GETTIN AN ARRAY OF OBJECTS BACK FROM fetch.
    //      using index: 0 to get object then appropriately set state
  }

  calculateGramsAndSum = () => {
    let tempState = {...this.state} //copies current state

    //calcuates and sets grams value in drinks arr of objs
    tempState.drinks.map( ({volumeOz, abv}, i) =>
      tempState.drinks[i].grams = Math.floor(volumeOz * abv * 0.23)
    )

    tempState.todaysSum = tempState.drinks.reduce(
      (sumGrams, currentGrams) => { return sumGrams + currentGrams.grams }, 0
    )

    //set state to adjusted
    this.setState(
      { drinks: tempState.drinks, todaysSum: tempState.todaysSum },
      () => this.saveDrink(this.state.drinks) //send arr to DB after update
    )
  }

  /*Below is passed as prop into Form.
      takes data from form, converts to floats and int,
      adds to state, and updates state.
      finally, calls calculateGramsAndSum to update state */

  addNewDrink = (createdDrink) => {
    let stateForDrink = {...this.state}

    createdDrink.volumeOz = Number.parseFloat(createdDrink.volumeOz)
    createdDrink.abv = Number.parseFloat(createdDrink.abv)
    createdDrink.grams = Number.parseInt(createdDrink.grams)

           // BELOW IS WORKING OLD WAY TO USE STATE.
    //pushes new drink to drinks array in state object
    stateForDrink.drinks.push(createdDrink)

    this.setState(
      {drinks: stateForDrink.drinks},
      () => this.calculateGramsAndSum() //runs calc after drink added to arr
    )
  }

  //updates DB with entire this.state.drinks array after drink is added
  saveDrink = (newDrinksArray) =>
    fetch(`/user/updateSingleDay/${this.props.currentUser._id}/${JSON.stringify(new Date()).substring(1,11)}`,
      { method : 'PUT'
      , headers: { 'Content-Type': 'application/json' }
      , body: JSON.stringify(newDrinksArray)
      }
    )

  deleteDrinkData = (drinkID) =>
    fetch(`/deleteSingleDrink/${drinkID}`, { method : 'DELETE' })

  render(){
    return (
      <div>
        <MySum currentSum={this.state.todaysSum}/>
        <List component="nav">
          <ListItem dense={false}>
            <ListItemText
              primary={`Last Week's Total: ${this.state.weeklySum[this.state.weeklySum.length-1]}g`}
            />
          </ListItem>
          <Divider />
          {this.state.drinks.map(({volumeOz , abv, grams, _id}, i) => {
            return <MyListItem
              deleteDrinkData={this.deleteDrinkData}
              drinkVol={volumeOz}
              drinkABV={abv}
              grams={grams}
              id={_id}
              key={i}/>
          })}
        </List>
        <Form addDrink={this.addNewDrink}/>
      </div>
    )
  }
}

export default MyList;
