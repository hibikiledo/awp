import './App.css';

import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import logo from './logo.svg';
import { push } from 'react-router-redux'

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="App">
        <input type="text" />
        <button onClick={() => {
          console.log('clicked')
          this.props.dispatch(push('/create'))
        }}
        >JOIN</button>
        <Link to='/create'>Create new room</Link>
      </div>
    );
  }
}

export default connect()(App);
