import React, { Component } from 'react';

import PrimaryButton from '../../components/PrimaryBtn'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CreateRoomPage extends Component {

  render() {
    console.log(this.props.firebase)
    return (
      <div>
        <input type="text" ref={(el) => this.roomName = el} />
        <input type="text" ref={(el) => this.nominateTime = el} />
        <PrimaryButton onClick={() => {
          global.firebase
            .database()
            .ref('room')
            .push({
              name: this.roomName.value,
              nominateTime: this.nominateTime.value
          })
        }}>JOIN</PrimaryButton>
      </div>
    );
  }
}


const mapStateToProps = ({ firebase }) => ({
  firebase
})
export default connect(mapStateToProps)(CreateRoomPage);
