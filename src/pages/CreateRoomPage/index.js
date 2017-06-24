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
import { push } from 'react-router-redux'

const generateRoomID = async function() {
  for (let i = 0; i < 99999; i++) {
    let tempID = _.padStart(_.random(0, 99999), 5, '0');
    // let tempID = '53096'
    let existRoom = await global.firebase.database().ref(`room/${tempID}`).once('value');
    console.log(`Checked room ${tempID}, value=${existRoom.val()}`)
    if (!existRoom.val()) {
      return tempID;
    }
  }
}

class CreateRoomPage extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = {
      roomName: "",
      nominateTime: 5
    }
  }

  createRoom = async () => {
    const roomCfg = {
      name: this.state.roomName,
      nominateTime: this.state.nominateTime
    }
    let roomId = await generateRoomID()
    console.log("ROOM ID:", roomId)
    let newRoom = global.firebase.database()
      .ref('room/' + roomId)
      .set(roomCfg);
    this.props.goToRoom(roomId)
    console.log('create room in firebase')
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
            control={< NumericInput onChange={(value) => this.setState({ nominateTime: value })} value={this.state.nominateTime} />} />
        </div>
        <PrimaryButton
          onClick={this.createRoom}>CREATE</PrimaryButton>
      </div>
    );
  }
}

const mapStateToProps = ({ firebase }) => ({ firebase })
const mapDispatchToProps = function(dispatch) {
  return {
    goToRoom: function(roomId) {
      dispatch(push(`r/${roomId}`))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CreateRoomPage);
