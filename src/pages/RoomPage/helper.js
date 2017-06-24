import React, { Component } from 'react';
import { fromJS } from 'immutable'

let hotReloadComponentState = null

/**
 * actionsFactory function require 3 params, roomId, roomRef, setState
 * 
 * @param {*} roomIdFn 
 * @param {*} actionsFactory 
 */
export function RoomPageConnect(roomIdFn, actionsFactory) {
  console.log("[HMR] Reload with previous state:", hotReloadComponentState)
  return function(WrappedComp) {
    class RoomPageFirebase extends Component {
      constructor(props, ctx) {
        super(props, ctx)
        this.state = hotReloadComponentState

        this.roomId = roomIdFn(this.props)
        this.roomRef = global.firebase.database().ref(`room/${this.roomId}`)
        this.actions = actionsFactory(this.roomId, this.roomRef, this.setState.bind(this))
      }

      shouldComponentUpdate(nextProps, nextState) {
        if (module.hot) {
          hotReloadComponentState = nextState
        }
        return this.props !== nextProps || this.state !== nextState
      }

      componentDidMount() {
        const id = this.roomId
        const ref = this.roomRef
        ref.on('value', (s) => {
          if (!s.val()) {
            return this.setState(() => {
              return {
                error: 'Room not found'
              }
            })
          }

          this.setState((state, props) => {
            return {
              room: fromJS(s.val())
            }
          })
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

        if (this.state.error) {
          return <div>{this.state.error}</div>
        }

        return <WrappedComp {...this.props} {...this.state} actions={this.actions} />
      }
    }

    return RoomPageFirebase
  }
}
