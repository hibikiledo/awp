import { combineReducers, compose, createStore } from 'redux'
import { firebaseStateReducer, reactReduxFirebase } from 'react-redux-firebase'

import Layout from '../components/layout'

export default () => (
  <Layout>
    <h1>First page</h1>
  </Layout>
);
