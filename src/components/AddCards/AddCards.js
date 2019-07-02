import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddCards.css';


class AddCards extends Component {
  state = {
    cardName: ''
  }

  handleChange = (event) => {
    this.setState({
      cardName: event.target.value
    })
  }

  handleClick = () => {
    const card = this.state.cardName
    console.log('this.state.cardName:', card)
    this.setState({
      cardName: ''
    })
    this.props.dispatch({type: 'CARD_SEARCH_RESULTS', payload: card})
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, { this.props.reduxState.user.username }! Your id is { this.props.reduxState.user.id }!
        </h1><br />
        <br />
        <label>Enter Card Name:</label><br />
        <input placeholder="Type a card name" onChange={this.handleChange} value={this.state.cardName} />
        <button onClick={this.handleClick}>Search</button><br />
        <h2>Search Results:</h2>
        {/* {this} */}
        <ul>
        {this.props.reduxState.cards.map(card => {
            if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris) {
              return (
                <>
                  <li key={card.id}>{card.name}<br />
                    {card.card_faces[0] &&
                      <><img src={card.card_faces[0].image_uris.large} className="cardImageResults" /><img src={card.card_faces[1].image_uris.large} className="cardImageResults" /></>
                    }<br />
                    {card.purchase_uris &&
                      <a href={card.purchase_uris.tcgplayer} key={card.purchase_uris.tcgplayer} >Buy {card.name} from TCGPlayer</a>
                    }
                  </li>
                  <br /> <br />
                </>
              )
            } else {
              return (
                <>
                  <li key={card.id}>{card.name}<br />
                    {card.image_uris &&
                      <img src={card.image_uris.large} className="cardImageResults" />
                    }<br />
                    {card.purchase_uris &&
                      <a href={card.purchase_uris.tcgplayer} key={card.purchase_uris.tcgplayer} >Buy {card.name} from TCGPlayer</a>
                    }
                  </li>
                  <br /> <br />
                </>
              )
            }
          }
          )
          }
        </ul>
        <br />
        <pre>
          {JSON.stringify(this.props.reduxState.cards, null, 2)}
        </pre>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapReduxStateToProps = reduxState => ({
  reduxState: reduxState
});


// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(AddCards);
