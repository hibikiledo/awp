import { routerMiddleware } from 'react-router-redux'
import { applyMiddleware, createStore } from 'redux'

import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory'
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker';
import thunk from 'redux-thunk';
import Routes from './routes'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(middleware, thunk))
)

function render(Comp) {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Comp />
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'))
}

render(Routes)
registerServiceWorker();

if (module.hot) {
  module.hot.accept('./routes', () => {
    render(Routes)
  })
  module.hot.accept('./reducers', () => {
    store.replaceReducer(reducers)
  })
}