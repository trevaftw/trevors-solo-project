import React from 'react';
//Components
import Nav from '../Nav/Nav';
const image = require('./stonks.jpg');

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <Nav />
    <div>
      <p>
        This app will allow a user to search for Magic the Gathering cards to add to their collection to see the daily prices and the total of their collection. 
      </p>
      <br />
      <img src={image} style={{width: 200, height: 100}} alt="stonks meme"></img>
    </div>
     
  </div>
);

export default AboutPage;
