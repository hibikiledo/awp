import React, { Component } from 'react';

import { RoomPageActions, ChatActions } from '../../actions'
import { RoomPageConnect } from './helper'
import _ from 'lodash'
import actionsFactory from './actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

const RestaurantCard = (r) => {
  if (!r) {
    return;
  }
  return (
    <div>
      {r.get('name')}
    </div>
  )
}

class RoomPage extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = null
  }

  componentDidMount() {
    this.props.joinOrCreateChatRoom(this.props.match.params.id)
    // setInterval(() => {
    //   if (!this.props.me) {
    //     console.log("No user")
    //     return;
    //   }
    //   this.props.sendMessage("Hello " + new Date(), this.props.me)
    // }, 1000)
  }

  componentWillUnmount() {
    this.props.disconnectChat()
  }

  renderSetName = () => {
    return (
      <div>
        <h1>Enter your name</h1>
        <input type="text" ref="name" />
        <button
          onClick={() => {
            this
              .props
              .tryJoinRoomWithName(this.props.match.params.id, this.refs.name.value)
          }}>
          Join
        </button>
      </div>
    )
  }

  renderSelectRestaurant = () => {
    return (
      <div>
        <h1>Room page</h1>
        <div>
          <h2>Restaurants:
            <button >Show nearby</button>
          </h2>
          {/*{(room.get('restaurants') || []).map((r, idx) => {})}*/}
        </div>
        <div>
          <h2>Members:</h2>
          {_.values(this.props.room.users).map((name, idx) => (
            <div key={idx}>{name}</div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    if (!this.props.me) {
      return this.renderSetName()
    } else if (this.props.me && this.props.room) {
      return this.renderSelectRestaurant()
    } else {
      return null;
    }
  }
}

export default connect(
  ({ me, room }) => ({ me, room }),
  (dispatch) => bindActionCreators(_.extend({}, RoomPageActions, ChatActions), dispatch),
  )(RoomPage)
