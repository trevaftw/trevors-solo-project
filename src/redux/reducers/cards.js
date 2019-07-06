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


export default combineReducers({
  cards,
  userCards,
});

