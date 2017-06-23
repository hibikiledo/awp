import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { firebaseStateReducer, reactReduxFirebase } from 'react-redux-firebase'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

// global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const initialState = {}

const rootReducer = combineReducers({
  firebase: firebaseStateReducer
})

const config = {
  apiKey: "AIzaSyAQ098JTX35JqDLW4Wg4k-uFiSeF5iHE5U",
  authDomain: "awp-pwa.firebaseapp.com",
  databaseURL: "https://awp-pwa.firebaseio.com",
  projectId: "awp-pwa",
  storageBucket: "awp-pwa.appspot.com",
  messagingSenderId: "499655629854"
};

export const initStore = (initialState = initialState) => {
  const createStoreWithFirebaseAndThunk = compose(
    reactReduxFirebase(config),
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )(createStore);
  return createStoreWithFirebaseAndThunk(rootReducer, initialState, )
}
