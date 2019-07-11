import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserTable from './UserTable';
import UserTotal from './UserTotal';

//Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

//styling
import './User.css';

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



  handleImage = (newImage, name) => {
    // console.log('mouse over')
    this.setState({
      ...this.state,
      image: newImage,
      alt: `Name:, ${name}`,
    })
    // console.log('this.state.image:', this.state.image)
  }





  render() {
    return (
      <>
        <Nav />
        <h1 id="welcome">
          Welcome {this.props.state.user.username}!
          </h1>
        <br />
        <UserTotal cardlist={this.props.state.cards.userCards} /><br />
        <section className="user-flex">
          <div>
            <table>
              <thead className="userTableHead">
                <tr>
                  <th>Card Name</th>
                  <th>Card Set</th>
                  <th className="table-number">Price Per Card</th>
                  <th className="table-number">Number Owned</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody className="userTableBody">
                {this.props.state.cards.userCards.map(card => {
                  return (
                    <tr key={card.serial_id} className="user-table-row" onMouseOver={() => this.handleImage(card.image_uris, card.name)} >
                      <UserTable name={card.name} set_name={card.set_name} price={card.price} number_owned={card.number_owned} serial_id={card.serial_id} />
                    </tr>
                  )
                })}
              </tbody>
            </table> <br />
          </div>
          <div>
            <img className="cardImageResults" src={this.state.image} alt={this.state.alt} />
          </div>
        </section>
        <Footer />
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
