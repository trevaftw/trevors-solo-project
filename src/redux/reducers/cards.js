const cards = (state = [], action) => {
    switch (action.type) {
      case 'CARD_SEARCH_REDUCER':
        return action.payload;
      default:
        return state;
    }
  };
  

  export default cards;
  