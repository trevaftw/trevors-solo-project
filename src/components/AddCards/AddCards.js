import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddCards.css';

const mtgCardBack = require('./Magic_the_gathering-card_back.jpg');

class AddCards extends Component {
  state = {
    cardName: '',
    image: mtgCardBack,
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
    this.props.dispatch({ type: 'CARD_SEARCH_RESULTS', payload: card })
  }

  handleImage = (newImage) => {
    console.log('mouse over')
    this.setState({
      ...this.state,
      image: newImage
    })
    console.log('this.state.image:', this.state.image)
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, {this.props.reduxState.user.username}! Your id is {this.props.reduxState.user.id}!
        </h1><br />
        <br />
        <label>Enter Card Name:</label><br />
        <input placeholder="Type a card name" onChange={this.handleChange} value={this.state.cardName} />
        <button onClick={this.handleClick}>Search</button><br />
        <h2>Search Results:</h2>
        {/* {this} */}
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
                Add to owned?
              </th>
              <th>
                Add to watch list?
              </th>
            </tr>
          </thead>
          <tbody>
            {this.props.reduxState.cards.map(card => {
              if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris) {
                return (
                  <>
                    {card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris &&
                      <tr onMouseOver={() => this.handleImage(card.card_faces[0].image_uris.large)}>
                        <td>{card.name}</td>
                        <td>{card.set_name}</td>
                        <td>{card.prices.usd}</td>
                        <td><input type="number" /><input type="checkbox" />Add</td>
                        <td><input type="checkbox" />Add</td>
                      </tr>}
                  </>
                )
              } else {
                return (
                  <>
                    {card.image_uris && card.image_uris.large &&
                      <tr onMouseOver={() => this.handleImage(card.image_uris.large)} >
                        <td>{card.name}</td>
                        <td>{card.set_name}</td>
                        <td>{card.prices.usd}</td>
                        <td><input type="number" /><input type="checkbox" />Add</td>
                        <td><input type="checkbox" />Add</td>
                      </tr>}
                  </>
                )

              }
            }
            )
            }
          </tbody>
        </table> <img src={this.state.image} />
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
// const mapStateToProps = ({user}) => ({user});
const mapReduxStateToProps = reduxState => ({
  reduxState: reduxState
});


// this allows us to use <App /> in index.js
export default connect(mapReduxStateToProps)(AddCards);










// if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris) {
//   return (
//     <tr>
//       <td key={card.id}>{card.name}</td>
//         {card.card_faces[0] &&
//           <><img src={card.card_faces[0].image_uris.large} className="cardImageResults" /><img src={card.card_faces[1].image_uris.large} className="cardImageResults" /></>
//         }<br />
//         {card.purchase_uris &&
//           <a href={card.purchase_uris.tcgplayer} key={card.purchase_uris.tcgplayer} >Buy {card.name} from TCGPlayer</a>
//         }
//       </li>
//       <br /> <br />
//     </tr>
//   )
// } else {
//   return (
//     <tr>
//       <li key={card.id}>{card.name}<br />
//         {card.image_uris &&
//           <img src={card.image_uris.large} className="cardImageResults" />
//         }<br />
//         {card.purchase_uris &&
//           <a href={card.purchase_uris.tcgplayer} key={card.purchase_uris.tcgplayer} >Buy {card.name} from TCGPlayer</a>
//         }
//       </li>
//       <br /> <br />
//     </tr>

// if (card.card_faces && card.card_faces[0] && card.card_faces[0].image_uris) {
//   return (
//     <>
//       {card.card_faces[0] &&
//         <tr onMouseOver={this.handleImage} value={card.card_faces[0].image_uris.large}>
//           <td>{card.name}</td>
//           <td>{card.set_name}</td>
//           <td>{card.prices.usd}</td>
//           <td><input type="number" /><input type="checkbox" />Add</td>
//           <td><input type="checkbox" />Add</td>
//         </tr>}
//     </>
//   )
// } else {
//   return (
//     <>
//         <tr onMouseOver={this.handleImage} value={card.card_faces[0].image_uris.large}>
//           <td>{card.name}</td>
//           <td>{card.set_name}</td>
//           <td>{card.prices.usd}</td>
//           <td><input type="number" /><input type="checkbox" />Add</td>
//           <td><input type="checkbox" />Add</td>
//         </tr>
//     </>
//   )
// }