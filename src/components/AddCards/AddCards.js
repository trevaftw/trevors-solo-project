import React, { Component } from 'react';
import { connect } from 'react-redux';


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
    console.log('this.state.cardName:', this.state.cardName)
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, { this.props.state.user.username }! Your id is { this.props.state.user.id }!
        </h1><br />
        <br />
        <label>Enter Card Name:</label><br />
        <input placeholder="Type a card name" onChange={this.handleChange} value={this.state.cardName} />
        <button onClick={this.handleClick}>Search</button>

        <pre>
          {/* {JSON.stringify(this.props, null, 2)} */}
        </pre>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  state: state
});


// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(AddCards);
