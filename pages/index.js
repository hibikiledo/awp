import { combineReducers, compose, createStore } from 'redux'
import { firebaseStateReducer, reactReduxFirebase } from 'react-redux-firebase'

import Layout from '../components/layout'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'

const RootPage = () => (
  <Layout>
    <h1>First page</h1>
  </Layout>
);

export default withRedux(initStore)(RootPage)
