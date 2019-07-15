import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';



//Components
import Nav from '../Nav/Nav';


class AboutPage extends Component {
  render() {
    return (

      <div>
        <Nav />
        <div>
          <h2>
            <p>
              This app will allow a user to search for Magic the Gathering cards to add to their collection to see the daily prices and the total of their collection.
            </p>
            <ul>
              <li>Where to play: <a href="https://www.lodestonecoffeeandgames.com/">Lodcestone Coffee and Games</a></li>
              <li>Looking for other stores? <a href="https://locator.wizards.com/">Wizards store locator</a></li>
              {this.props.state && this.props.state.user && this.props.state.user.id &&
                <li><Link to={`/collection/${this.props.state.user.id}`}>Send your friends this link to show them your collection!</Link></li>}
            </ul>
          </h2>
        </div>
        {/* <pre>
          {JSON.stringify(this.props.state, null, 2)}
        </pre> */}
      </div>
    )
  };
}

const mapStateToProps = state => ({
  state: state,
});


export default connect(mapStateToProps)(AboutPage);
