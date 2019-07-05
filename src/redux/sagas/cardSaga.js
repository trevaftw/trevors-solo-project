import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* cardSearchResults(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log('action.payload:', action.payload)
    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const cardSearchResponse = yield axios.get(`/api/cards/search/${action.payload}`, config);
    console.log('cardSearchResponse.data:', cardSearchResponse.data)
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'CARD_SEARCH_REDUCER', payload: cardSearchResponse.data });
  } catch (error) {
    console.log('Card Search get request failed', error);
  }
}
function* addToColletion(action){
  try{
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    console.log('action.payload:', action.payload)
  }catch (error) {
    console.log('Card Search get request failed', error);
  }
}

function* cardSaga() {
  yield takeLatest('CARD_SEARCH_RESULTS', cardSearchResults);
  yield takeLatest('ADD_TO_COLLECTION', addToColletion)
}

export default cardSaga;
