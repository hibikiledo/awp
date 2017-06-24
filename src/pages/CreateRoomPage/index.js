import './style.css'
import '../../styles/global.css'

import React, {Component} from 'react';

import NumericInput from '../../components/NumericInput'
import PrimaryButton from '../../components/PrimaryBtn'
import PropTypes from 'prop-types';
import SettingListItem from '../../components/SettingListItem'
import TextInput from '../../components/TextInput'
import _ from 'lodash';
import {connect} from 'react-redux';

class CreateRoomPage extends Component {
  render() {
    return (
      <div>
        <div className="room-name-form full-width">
          <TextInput placeholder="Room name"/>
        </div>
        <div className="room-settings-form">
          <SettingListItem
            option="Nominate Time"
            explanation="Minutes"
            control={< NumericInput />}/>
        </div>
        <PrimaryButton
          onClick={() => {
            var newRoom = global.firebase.database()
              .ref('room')
              .push({
                name: this.roomName.value,
                nominateTime: this.nominateTime.value
              });

            var generateRoomID = function() {
              for (let i = 0; i < 99999; i++) {
                var tempID = _.padStart(_.random(0,99999),5,'0');
                var existRoom = global.firebase.database()
                  .ref('roomList/')
                  .equalTo(tempID);
                if (existRoom !== true || existRoom.status === true) {
                  return tempID;
                } else {
                  console.log('Number of rooms exceed the limit');
                }
              }
            }

            global.firebase.database()
              .ref('roomList/' + generateRoomID())
              .set({
                roomkey: newRoom.key,
                status: false
              });

            console.log('create room in firebase')
        }}>CREATE</PrimaryButton>
      </div>
    );
  }
}

const mapStateToProps = ({firebase}) => ({firebase})
export default connect(mapStateToProps)(CreateRoomPage);
