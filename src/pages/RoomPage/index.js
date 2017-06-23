import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';

class RoomPageFirebase extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = null
  }

  componentDidMount() {
    const id = this.props.roomId
    const ref = global.firebase.database().ref(`room/${id}`)
    ref.on('value', (s) => {
      this.setState(s.val())
    })

    // setInterval(() => {
    //   ref.update({
    //     time: new Date().getTime()
    //   })
    // }, 1000)
  }

  render() {
    if (!this.state) {
      return <div>Loading...</div>
    }

    // console.log(this.state)
    const props = this.props
    const ChildComp = this.props.component
    return <ChildComp {...props} room={this.state} />
  }
}

function RoomPageConnect(fn) {
  return function(comp) {
    return function(props) {
      const id = fn(props)
      return <RoomPageFirebase roomId={id} component={comp} />
    }
  }
}

class RoomPage extends Component {
  constructor(props, ctx) {
    super(props, ctx)
    this.state = null
  }
  
  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Room page</h1>
      </div>
    )
  }
}

const mapState = (state, {match}) => {
  return {
    roomId: match.params.id
  }
};

const mapAction = {}

export default connect(mapState)(RoomPageConnect(({roomId}) => roomId)(RoomPage))
