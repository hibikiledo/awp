import { createAction } from 'redux-actions'
import { push } from 'react-router-redux'

export const AppActions = {
  setRoom: createAction('SET_ROOM'),
  addToast: (msg) => (dispatch, getState) => {
    dispatch(createAction('ADD_TOAST')(msg))
    setTimeout(() => dispatch(createAction('DELETE_TOAST')(msg)), 3000)
  },
}

export const LandingPageActions = {
  tryJoinRoomWithPin: (pin) => (dispatch, getState, firebase) => {
    firebase.database().ref(`room/${pin}`).once('value', (s) => {
      const val = s.val()
      dispatch(AppActions.setRoom(val))
      if (!val) {
        dispatch(AppActions.addToast('Invalid Pin'))
      }
    })
  },
  tryJoinRoomWithName: (name) => (dispatch, getState, api) => {
    dispatch(AppActions.setRoom({ id: 123, joined: true }))
  },
  navigateToCreateRoomPage: () => (dispatch, getState, api) => {
    dispatch(push('/create'))
  }
}
