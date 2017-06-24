import './style.css'

import React, { Component } from 'react';

import { AppSelectors } from '../../selectors'
import BorderlessBtn from '../../components/BorderlessBtn'
import { LandingPageActions } from '../../actions'
import { Link } from 'react-router-dom'
import PrimaryBtn from '../../components/PrimaryBtn'
import PropTypes from 'prop-types'
import TextInput from '../../components/TextInput'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class LandingPage extends Component {
  static propTypes = {
    room: PropTypes.object
  }

  state = {
    pin: ''
  }

  renderRequestName() {
    return (
      <div className="App">
        PIN
        XXXXXX
        <TextInput />
        <PrimaryBtn onClick={() => {
          this.props.tryJoinRoomWithName('Nut')
        }}
        >
          JOIN
        </PrimaryBtn>
      </div>
    );
  }

  renderRequestPin() {
    return (
      <div className="landing-page">
        <div className="request-pin-form">
          <TextInput
            value={this.state.pin}
            onChange={(e) => {
            this.setState({ pin: e.target.value })
          }} />
          <PrimaryBtn onClick={() => {
            this.props.tryJoinRoomWithPin(this.state.pin)
          }}>
            JOIN
          </PrimaryBtn>
        </div>
        <div className="footer">
          <BorderlessBtn onClick={() => {
            this.props.navigateToCreateRoomPage()
          }}>
            Create Room
          </BorderlessBtn>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        { this.props.room && !this.props.room.joined
          ? this.renderRequestName()
          : this.renderRequestPin() }
      </div>
    )
  }
}

export default connect(
  (state) => ({
    room: AppSelectors.getRoom(state)
  }),
  (dispatch) => bindActionCreators(LandingPageActions, dispatch)
)(LandingPage);
