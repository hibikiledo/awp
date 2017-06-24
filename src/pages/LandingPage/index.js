import React, { Component } from 'react';

import { Link } from 'react-router-dom'
import PrimaryBtn from '../../components/PrimaryBtn'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

class LandingPage extends Component {
  render() {
    return (
      <div className="App">
        <input type="text" ref="token" />
        <PrimaryBtn onClick={() => {
          let token = this.refs.token.value
          this.props.dispatch(push(`/r/${token}`))
        }}
        >
          JOIN
        </PrimaryBtn>
        <Link to='/create'>Create new room</Link>
      </div>
    );
  }
}

export default connect()(LandingPage);
