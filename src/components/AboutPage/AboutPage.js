import React from 'react';

//Components
import Nav from '../Nav/Nav';

//memes
const image = require('./stonks.jpg');

const AboutPage = () => (
  <div>
    <Nav />
    <div>
      <p>
        This app will allow a user to search for Magic the Gathering cards to add to their collection to see the daily prices and the total of their collection. 
      </p>
      <ul>
      <li><a href="https://www.lodestonecoffeeandgames.com/">Lodcestone Coffee and Games</a></li>
      <li><a href="https://locator.wizards.com/">Wizards store locator</a></li>
      </ul>
      <br /><br />
      <img src={image} style={{width: 200, height: 100}} alt="stonks meme"></img>
    </div>
     
  </div>
);

export default AboutPage;
