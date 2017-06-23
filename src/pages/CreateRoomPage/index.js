import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

class CreateRoomPage extends Component {

  render() {
    console.log(this.props.firebase)
    return (
      <div>
        <input type="text" ref={(el) => this.roomName = el} />
        <input type="text" ref={(el) => this.nominateTime = el} />
        <button onClick={() => {
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
        }}
        >
          Create
        </button>
      </div>
    );
  }
}


const mapStateToProps = ({ firebase }) => ({
  firebase
})
export default connect(mapStateToProps)(CreateRoomPage);
