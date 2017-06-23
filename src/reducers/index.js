import firebaseReducer from './firebaseReducer'
import { routerReducer } from 'react-router-redux'
import { combineReducers } from 'redux'

export default combineReducers({
    firebase: firebaseReducer,
    router: routerReducer
})