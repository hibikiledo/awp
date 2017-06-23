import './index.css';

import { ConnectedRouter, push, routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'

import App from './App';
import CreateRoomPage from './pages/CreateRoomPage'
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import RoomPage from './pages/RoomPage';
import { Route } from 'react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory'
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  composeWithDevTools(applyMiddleware(middleware, thunk))
)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={App} />
        <Route path="/create" component={CreateRoomPage} />
        <Route path="/room/:id" component={RoomPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
