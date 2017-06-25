import { applyMiddleware, createStore } from 'redux'
import reducers from './reducers'
import { routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk';
import {createAction} from 'redux-actions'

export const history = createHistory()
export const middleware = routerMiddleware(history)

export const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(middleware, thunk.withExtraArgument(global.firebase)))
)

export default store

global.firebase.database().ref().child('.info/connected').on('value', (s) => {
  store.dispatch(createAction("FIREBASE_CONNECTED")(s.val()))
})

if (module.hot) {
  module.hot.accept('./reducers', () => {
    store.replaceReducer(reducers)
  })
}