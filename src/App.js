import './App.css';

import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from './logo.svg';

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <input type="text" />
        <button>JOIN</button>
        <Link to='/create'>Create new room</Link>
      </div>
    );
  }
}

export default connect(({firebase}) => ({firebase}))(App);
