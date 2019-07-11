import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch, //put switch around the routes will check all the routes for a match, then if not it will render the 404--see last route before </switch>
} from 'react-router-dom';

import {connect} from 'react-redux';

//Components
import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

//user has to be logged in to see the route
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

//Routes
import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import AddCards from '../AddCards/AddCards';

import './App.css';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={UserPage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/AddCards"
              component={AddCards}
            />
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
        </div>
      </Router>
  )}
}

export default connect()(App);
