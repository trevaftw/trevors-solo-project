import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class UserPage extends Component {

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
                  <tr key={card.serial_id}>
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
          <LogOutButton className="log-in" />
        </div>
        <div>
          {/* <pre>
            {JSON.stringify(this.props.state.cards.userCards, null, 2)}
          </pre> */}
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
