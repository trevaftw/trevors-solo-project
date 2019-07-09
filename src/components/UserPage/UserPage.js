import React, { Component } from 'react';
import { connect } from 'react-redux';

const mtgCardBack = require('../AddCards/Magic_the_gathering-card_back.jpg');

class UserPage extends Component {
  state = {
    cardName: '',
    image: mtgCardBack,
    alt: '',
  }

  componentDidMount() {
    this.handleFetchCards();
    // console.log('handleFetchCards')
  }

  handleFetchCards = () => {
    this.props.dispatch({ type: 'USER_OWNED_CARDS', payload: this.props.state.user.id })
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
      alt: `Name:, ${name}`
    })
    // console.log('this.state.image:', this.state.image)
  }

  render() {
    return (
      <>
        <div>
          <h1 id="welcome">
            Welcome {this.props.state.user.username}!
          </h1>
          <p>Your ID is: {this.props.state.user.id}</p>
          <h2>Your current collection:</h2>
          <table>
            <thead>
              <tr>
                <th>
                  Card Name
              </th>
                <th>
                  Card Set
              </th>
                <th>
                  Price Per Card
              </th>
                <th>
                  Number
              </th>
                <th>
                  Delete?
              </th>
              </tr>
            </thead>
            <tbody>
              {this.props.state.cards.userCards.map(card => {
                return (
                  <tr key={card.serial_id} onMouseOver={() => this.handleImage(card.image_uris, card.name)}>
                    <td>{card.name}</td>
                    <td>{card.set_name}</td>
                    <td>{card.price}</td>
                    <td>{card.number_owned}</td>
                    <td><button value={card.serial_id} onClick={this.handleDelete}>Delete</button></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
