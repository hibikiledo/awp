import React, { Component } from 'react';

import { RoomPageConnect } from './helper'
import _ from 'lodash'
import actionsFactory from './actions'
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

  renderSetName = () => {
    const { setName } = this.props.actions
    return (
      <div>
        <h1>Enter your name</h1>
        <input type="text" ref="name" />
        <button onClick={() => { setName(this.refs.name.value) }}>Join</button>
      </div>
    )
  }

  renderSelectRestaurant = () => {
    //room is ImmutableJS object
    const { room } = this.props
    const { updateRestaurantsNearby } = this.props.actions
    console.log(room.toJS())

    return (
      <div>
        <h1>Room page</h1>
        <div>
          <h2>Restaurants: <button onClick={() => updateRestaurantsNearby()}>Show nearby</button></h2>
          {(room.get('restaurants') || []).map((r, idx) => {

          })}
        </div>
        <div>
          <h2>Members:</h2>
          {room.get('members').toArray().map((name, idx) => {
            return <span key={idx}>{name} </span>
          })}
        </div>
      </div>
    )
  }

  render() {
    const { me } = this.props
    if (!me) {
      return this.renderSetName()
    } else {
      return this.renderSelectRestaurant()
    }
  }
}

const mapState = (state, { match }) => {
  return {
    roomId: match.params.id
  }
};

export default connect(mapState)(
  RoomPageConnect(
    ({ roomId }) => roomId,
    actionsFactory)(RoomPage)
)
