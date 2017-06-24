import { applyMiddleware, createStore } from 'redux'

import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory'
import reducers from './reducers'
import registerServiceWorker from './registerServiceWorker';
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';

const history = createHistory()
const middleware = routerMiddleware(history)

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(middleware, thunk.withExtraArgument(global.firebase)))
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
