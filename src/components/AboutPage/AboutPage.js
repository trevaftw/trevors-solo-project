import React from 'react';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const AboutPage = () => (
  <div>
    <div>
      <p>
        This app will allow a user to search for Magic the Gathering cards to add to their collection to see the daily prices and the total of their collection. 
      </p>
    </div>
  </div>
);

export default AboutPage;
