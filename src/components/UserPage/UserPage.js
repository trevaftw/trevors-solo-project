import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserTable from './UserTable';

//styling
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'

const mtgCardBack = require('../AddCards/Magic_the_gathering-card_back.jpg');

class UserPage extends Component {
  state = {
    cardName: '',
    image: mtgCardBack,
    alt: '',
    totalValue: 0,
  }

  componentDidMount() {
    this.handleFetchCards();
    // console.log('handleFetchCards')
  }

  handleFetchCards = () => {
    this.props.dispatch({ type: 'USER_OWNED_CARDS', payload: this.props.state.user.id });
    this.handleSumValues();
  }

  handleDelete = (event) => {
    console.log('event.target.value', event.target.value)
    // console.log('event.target.id', event.target.id)
    const confirmBox = window.confirm('Click to OK to delete. Click Cancel to keep watching the card');
    if (confirmBox === true) {
      this.props.dispatch({ type: 'DELETE_CARD', payload: event.target.value })
    }
  }

  handleImage = (newImage, name) => {
    // console.log('mouse over')
    this.setState({
      ...this.state,
      image: newImage,
      alt: `Name:, ${name}`,
    })
    // console.log('this.state.image:', this.state.image)
  }

  handleSumValues = () => {
    let newTotal;
    this.props.state.cards.userCards.forEach(card => {
      newTotal = Number(newTotal) + (Number(card.number_owned) * Number(card.price))
      console.log('newTotal:', newTotal)
      return Number(newTotal)
    }
    )
    // return this.setState({ totalValue: newTotal })
  }




  render() {
    return (
      <>
        <div>
          <h1 id="welcome">
            Welcome {this.props.state.user.username}!
          </h1>
          <br />
          <h2>Your current collection:</h2>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Card Name</TableCell>
                <TableCell>Card Set</TableCell>
                <TableCell>Price Per Card</TableCell>
                <TableCell>Number Owned</TableCell>
                <TableCell>Edit / Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.state.cards.userCards.map(card => {
                return (
                  <TableRow key={card.serial_id} onMouseOver={() => this.handleImage(card.image_uris, card.name)} >
                    <UserTable name={card.name} set_name={card.set_name} price={card.price} number_owned={card.number_owned} serial_id={card.serial_id}/>
                    {/* <TableCell  >{card.name}</TableCell>
                    <TableCell>{card.set_name}</TableCell>
                    <TableCell>{card.price}</TableCell>
                    <TableCell>{this.state.editable ?
                      <><input placeholder={card.number_owned}></input><button onClick={this.handleEdit}>Save</button></>
                      :
                      <>{card.number_owned} <button onClick={this.handleEdit}>Edit</button></>
                    }
                    </TableCell>
                    <TableCell><button value={card.serial_id} onClick={this.handleDelete}>Delete</button></TableCell> */}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table> <br />
          <h2>Total Value: {this.state.totalValue}</h2>
          <pre>
            {JSON.stringify(this.state, null, 2)}
          </pre>
          <img className="cardImageResults" src={this.state.image} alt={this.state.alt} />
        </div>
      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  state: state,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(UserPage);
