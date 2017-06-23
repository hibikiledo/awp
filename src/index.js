import { ConnectedRouter, push, routerMiddleware, routerReducer } from 'react-router-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'

import CreateRoomPage from './pages/CreateRoomPage'
import LandingPage from './pages/LandingPage';
import OrderPage from './pages/OrderPage';
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import RoomPage from './pages/RoomPage';
import { Route } from 'react-router'
import SummaryPage from './pages/SummaryPage';
import VotePage from './pages/VotePage';
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
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/create" component={CreateRoomPage} />
        <Route exact path="/r/:id" component={RoomPage} />
        <Route exact path='/r/:id/vote' component={VotePage} />
        <Route exact path='/r/:id/order' component={OrderPage} />
        <Route exact path='/r/:id/summary' component={SummaryPage} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker();
