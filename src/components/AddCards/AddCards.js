import React, { Component } from 'react';
import { connect } from 'react-redux';

//map results
import SearchResult from '../SearchResult/SearchResult';

//styling
import './AddCards.css';
import TableBody from '@material-ui/core/TableBody';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow' 


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
      alert('Search must be at least 3 characters')
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

  handleAdd = (event) => {
    // console.log('event.target.value:', event.target.value)
    if (this.state.newCards === null) {
      alert('Please select a number')
    } else if (this.state.newCards.scryfall_id === event.target.value) {
      const newCardObject = this.state.newCards
      console.log('card to be added:', newCardObject)
      this.props.dispatch({ type: 'ADD_TO_COLLECTION', payload: newCardObject })
      this.setState({
        newCards: null
      })
      event.target.value = 0
    } else {
      alert(`Please add the ${this.state.newCards.name} from ${this.state.newCards.card_set} first before adding other cards`)
    }
  }

  render() {
    return (
      <>
        <h1>Card Search</h1>
        <br />
        <input placeholder="Type a card name" onChange={this.handleChange} value={this.state.cardName} />
        <button onClick={this.handleClick}>Search</button><br />
        <h2>Search Results:</h2>
        {this.props.reduxState.cards.length >= 100 &&
          <h3>Search returned over 100 results. Please narrow search.</h3>}
        {this.props.reduxState.cards === [] &&
          <h3>Search returned over 0 results. Please check your spelling.</h3>}
        {/* <pre>
            {JSON.stringify(this.state, null, 2)}
          </pre> */}
        <div id="AddCardTable">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Card Name</TableCell>
                <TableCell>Price Per Card</TableCell>
                <TableCell>Number?</TableCell>
                <TableCell>Number to Add?</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.reduxState.cards.cards.map((card) => {
                if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris && card.prices.usd === null) {
                  return (
                    <TableRow onMouseOver={() => this.handleImage(card.card_faces[0].image_uris.large, card.card_faces[0].name, card.card_faces[0].type_line, card.card_faces[0].oracle_text)} key={card.id}>
                      <SearchResult name={card.name} set={card.set_name} price={card.prices.usd_foil} image={card.card_faces[0].image_uris.large} id={card.id} />
                    </TableRow>
                  )
                } else if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris) {
                  return (
                    <TableRow onMouseOver={() => this.handleImage(card.card_faces[0].image_uris.large, card.card_faces[0].name, card.card_faces[0].type_line, card.card_faces[0].oracle_text)} key={card.id}>
                      <SearchResult name={card.name} set={card.set_name} price={card.prices.usd} image={card.card_faces[0].image_uris.large} id={card.id} />
                    </TableRow>
                  )
                } else if (card.prices.usd === null && card.prices.usd_foil === null) {
                  return null
                } else if (card.prices.usd === null) {
                  return (
                    <TableRow onMouseOver={() => this.handleImage(card.image_uris.large, card.name, card.type_line, card.oracle_text)} key={card.id}>
                      <SearchResult name={card.name} set={card.set_name} price={card.prices.usd_foil} image={card.image_uris.large} id={card.id} />
                    </TableRow>
                  )
                } else {
                  return (
                    <TableRow onMouseOver={() => this.handleImage(card.image_uris.large, card.name, card.type_line, card.oracle_text)} key={card.id}>
                      <SearchResult name={card.name} set={card.set_name} price={card.prices.usd} image={card.image_uris.large} id={card.id} />
                    </TableRow>
                  )
                }
              }
              )
              }
            </TableBody>
          </Table> <img className="cardImageResults" src={this.state.image} alt={this.state.alt} />
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
