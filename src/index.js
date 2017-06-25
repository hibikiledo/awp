import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes'
import registerServiceWorker from './registerServiceWorker';
import { store, history } from './store'

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
}
