import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import { RoomPageConnect } from './helper'

class RoomPage extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = null
  }

  renderSetName = () => {
    const { actions } = this.props
    return (
      <div>
        <h1>Enter your name</h1>
        <input type="text" ref="name" />
        <button onClick={() => { actions.setName(this.refs.name.value) }}>Join</button>
      </div>
    )
  }

  render() {
    const { actions, me, room } = this.props
    console.log(room)

    if (!me) {
      return this.renderSetName(this)
    }

    return (
      <div>
        <h1>Room page</h1>
        <div>
          {_.map(room.members, (name, idx) => {
            return <span key={idx}>{name}</span>
          })}
        </div>
      </div>
    )
  }
}

const mapState = (state, { match }) => {
  return {
    roomId: match.params.id
  }
};

export default connect(mapState)(RoomPageConnect(({ roomId }) => roomId, RoomPage))