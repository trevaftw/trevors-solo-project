import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



//Components
import Nav from '../Nav/Nav';

//memes
const image = require('./stonks.jpg');

class AboutPage extends Component {
  render() {
    return (

      <div>
        <Nav />
        <div>
          <p>
            This app will allow a user to search for Magic the Gathering cards to add to their collection to see the daily prices and the total of their collection.
      </p>
          <ul>
            <li><a href="https://www.lodestonecoffeeandgames.com/">Lodcestone Coffee and Games</a></li>
            <li><a href="https://locator.wizards.com/">Wizards store locator</a></li>
            <li><Link to={`/collection/${this.props.state.user.id}`}>Send your friends this link to show them your collection!</Link></li>
          </ul>
          <br /><br />
          <img src={image} style={{ width: 200, height: 100 }} alt="stonks meme"></img>
        </div>
        <pre>
          {JSON.stringify(this.props.state.user.id, null, 2)}
        </pre>
      </div>
    )
  };
}

const mapStateToProps = state => ({
  state: state,
});


export default connect(mapStateToProps)(AboutPage);
