import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'

export const AppActions = {
  setRoom: createAction('SET_ROOM'),
}

export const LandingPageActions = {
  tryJoinRoomWithPin: (pin) => (dispatch, getState, firebase) => {
    // check room pin in firebase
    // firebase.database().ref('room').on('value', (s) => dispatch(AppActions.setRoom(s.val())))

    // if valid
    // set room
    dispatch(AppActions.setRoom({ id: 123, joined: false }))

    // otherwise set null
    // dispatch(AppActions.setRoom(null))
  },
  tryJoinRoomWithName: (name) => (dispatch, getState, api) => {
    dispatch(AppActions.setRoom({ id: 123, joined: true }))
  },
  navigateToCreateRoomPage: () => (dispatch, getState, api) => {
    dispatch(push('/create'))
  }
}
