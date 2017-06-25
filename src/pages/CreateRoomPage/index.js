import './style.css'
import '../../styles/global.css'

import React, { Component } from 'react';

import NumericInput from '../../components/NumericInput'
import PrimaryButton from '../../components/PrimaryBtn'
import PropTypes from 'prop-types';
import SettingListItem from '../../components/SettingListItem'
import TextInput from '../../components/TextInput'
import _ from 'lodash';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import { push } from 'react-router-redux'
import { CreateRoomPageActions } from '../../actions';

class CreateRoomPage extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      roomName: "",
      nominateTime: 5
    }
  }

  render() {
    return (
      <div>
        <div className="room-name-form full-width">
          <TextInput placeholder="Room name" onChange={(e) => this.setState({ roomName: e.target.value })} />
        </div>
        <div className="room-settings-form">
          <SettingListItem
            option="Nominate Time"
            explanation="Minutes"
            control={< NumericInput onChange={(value) => this.setState({ nominateTime: value })} 
            value={this.state.nominateTime} 
            min={1}
            max={10}
          />} />
        </div>
        <PrimaryButton
          onClick={() => this.props.createRoom(this.state.roomName, this.state.nominateTime)}>CREATE</PrimaryButton>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase }) => ({ firebase })
const mapDispatchToProps = (dispatch) => bindActionCreators(CreateRoomPageActions, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(CreateRoomPage);
