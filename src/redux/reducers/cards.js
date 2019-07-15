import { combineReducers } from 'redux';

const cards = (state = [], action) => {
  switch (action.type) {
    case 'CARD_SEARCH_REDUCER':
      return action.payload;
    default:
      return state;
  }
};

const userCards = (state = [], action) => {
  switch (action.type) {
    case 'SINGLE_USER_REDUCER':
      return action.payload;
    default:
      return state;
  }
}

const shareCards = (state = [], action) => {
  switch (action.type) {
    case 'SHARE_CARDS_REDUCER':
      return action.payload;
    case 'EMPTY_SHARE_CARDS':
      return [];
    default:
      return state;
  }
}


export default combineReducers({
  cards,
  userCards,
  shareCards
});

