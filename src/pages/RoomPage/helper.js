import React, { Component } from 'react';
import { fromJS } from 'immutable'
import actionFactory from './actions'

let hotReloadComponentState = null

export function RoomPageConnect(fn) {
  return function(WrappedComp) {
    class RoomPageFirebase extends Component {
      constructor(props, ctx) {
        super(props, ctx)
        this.state = hotReloadComponentState
      }

      shouldComponentUpdate(nextProps, nextState) {
        if (module.hot) {
          hotReloadComponentState = nextState
        }
        return this.props !== nextProps || this.state !== nextState
      }

      componentDidMount() {
        const id = fn(this.props)
        const ref = global.firebase.database().ref(`room/${id}`)
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
              room: (s.val())
            }
          })
        })

        this.actions = actionFactory.call(this, id, ref)

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

        return <WrappedComp {...this.props} room={this.state.room} me={this.state.me} actions={this.actions} />
      }
    }

    return RoomPageFirebase
  }
}
