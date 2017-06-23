import './App.css';

import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from './logo.svg';
import { push } from 'react-router-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <input type="text" ref="token" />
        <button onClick={() => {
          console.log(this.refs.token.value)
          let token = this.refs.token.value
          this.props.dispatch(push(`/r/${token}`))
        }}
        >
          JOIN
        </button>
        <Link to='/create'>Create new room</Link>
      </div>
    );
  }
}

export default connect()(App);
