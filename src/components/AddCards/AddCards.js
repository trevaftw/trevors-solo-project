import React, { Component } from 'react';
import { connect } from 'react-redux';

//Components
import Nav from '../Nav/Nav';

//map results
import SearchResult from '../SearchResult/SearchResult';

//sweetAlert
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const mtgCardBack = require('./Magic_the_gathering-card_back.jpg');

class AddCards extends Component {
  state = {
    cardName: '',
    image: mtgCardBack,
    alt: 'The backside of a Magic: The Gathering Card',
    newCards: null
  }

  handleChange = (event) => {
    this.setState({
      cardName: event.target.value
    })
  }

  handleClick = () => {
    const card = this.state.cardName
    console.log('this.state.cardName:', card)
    if (card.length < 3) {
      MySwal.fire({
        title: 'Uh-Oh',
        text: 'Search must be at least 3 characters',
        type: 'error',
        confirmButtonText: 'Sorry'
      })
    } else {
      this.setState({
        cardName: ''
      })
      this.props.dispatch({ type: 'CARD_SEARCH_RESULTS', payload: card })
    }
  }

  handleImage = (newImage, name, type_line, oracle_text) => {
    // console.log('mouse over')
    this.setState({
      ...this.state,
      image: newImage,
      alt: `Name:, ${name}, Type:, ${type_line}, Oracle text:, ${oracle_text}`
    })
    // console.log('this.state.image:', this.state.image)
  }

  handleNumber = (scryfall_id) => (event) => {
    // console.log('event.target.value:', event.target.value)
    // console.log('event.target.title:', event.target.title)
    // console.log('event.target.lang:', event.target.lang)
    this.setState({
      newCards: {
        name: event.target.name,
        card_set: event.target.title,
        scryfall_id: scryfall_id,
        number: event.target.value,
        user_id: this.props.reduxState.user.id,
        price: event.target.id,
        image: event.target.lang
      }
    })
  }

  render() {
    return (
      <>
        <Nav />
        <center>
          <h1>Card Search</h1>
          <br />
          <input placeholder="Type a card name" onChange={this.handleChange} value={this.state.cardName} />
          <button className="ADE-button" onClick={this.handleClick}>Search</button><br />
        </center><br />
        {this.props.reduxState.cards.length >= 100 &&
          <h3>Search returned over 100 results. Please narrow search.</h3>}
        {this.props.reduxState.cards === [] &&
          <h3>Search returned over 0 results. Please check your spelling.</h3>}
        {/* <pre>
            {JSON.stringify(this.state, null, 2)}
          </pre> */}
        <div id="add-card-flex">
          <table>
            <thead>
              <h2>Search Results:</h2>
            </thead>
            <thead>
              <tr>
                <th className="head280">Card Name</th>
                <th className="head280">Card Set</th>
                <th className="head145">Price Per Card</th>
                <th className="head145">Number In Collection?</th>
                <th className="head161">Add</th>
              </tr>
            </thead>
            <tbody>
              {this.props.reduxState.cards.cards.map((card) => {
                if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris && card.prices.usd === null) {
                  return (
                    <tr className="user-table-row" onMouseOver={() => this.handleImage(card.card_faces[0].image_uris.large, card.card_faces[0].name, card.card_faces[0].type_line, card.card_faces[0].oracle_text)} key={card.id}>
                      <SearchResult name={card.name} set={card.set_name} price={card.prices.usd_foil} image={card.card_faces[0].image_uris.large} id={card.id} />
                    </tr>
                  )
                } else if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris) {
                  return (
                    <tr className="user-table-row" onMouseOver={() => this.handleImage(card.card_faces[0].image_uris.large, card.card_faces[0].name, card.card_faces[0].type_line, card.card_faces[0].oracle_text)} key={card.id}>
                      <SearchResult name={card.name} set={card.set_name} price={card.prices.usd} image={card.card_faces[0].image_uris.large} id={card.id} />
                    </tr>
                  )
                } else if (card.prices.usd === null && card.prices.usd_foil === null) {
                  return null
                } else if (card.prices.usd === null) {
                  return (
                    <tr className="user-table-row" onMouseOver={() => this.handleImage(card.image_uris.large, card.name, card.type_line, card.oracle_text)} key={card.id}>
                      <SearchResult name={card.name} set={card.set_name} price={card.prices.usd_foil} image={card.image_uris.large} id={card.id} />
                    </tr>
                  )
                } else {
                  return (
                    <tr className="user-table-row" onMouseOver={() => this.handleImage(card.image_uris.large, card.name, card.type_line, card.oracle_text)} key={card.id}>
                      <SearchResult name={card.name} set={card.set_name} price={card.prices.usd} image={card.image_uris.large} id={card.id} />
                    </tr>
                  )
                }
              }
              )
              }
            </tbody>
          </table>
          <div>
            <img className="cardImageResults" src={this.state.image} alt={this.state.alt} />
          </div>
          <br />
          {/* <pre>
            {JSON.stringify(this.props.reduxState.cards, null, 2)}
          </pre> */}
        </div>

      </>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({user});
const mapReduxStateToProps = reduxState => ({
  reduxState: reduxState
});


// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(AddCards);
