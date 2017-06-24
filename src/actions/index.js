import {
  createAction
} from 'redux-actions'
import {
  push
} from 'react-router-redux'

export const AppActions = {
  setRoom: createAction('SET_ROOM'),
  addToast: (msg) => (dispatch, getState) => {
    dispatch(createAction('ADD_TOAST')(msg))
    setTimeout(() => dispatch(createAction('DELETE_TOAST')(msg)), 3000)
  },
  setMe: createAction('SET_ME')
}

export const LandingPageActions = {
  tryJoinRoomWithPin: (pin) => (dispatch, getState, firebase) => {
    firebase.database().ref(`room/${pin}`).once('value', (s) => {
      const val = s.val()
      if (val) {
        dispatch(AppActions.setRoom(val))
        dispatch(push('/r/' + pin));
        firebase.database().ref(`room/${pin}`).on('value', (s) => dispatch(AppActions.setRoom(s.val())))
      } else {
        dispatch(AppActions.addToast('Invalid Pin'))
      }
    })
  },
  navigateToCreateRoomPage: () => (dispatch, getState, firebase) => {
    dispatch(push('/create'))
  }
}

export const RoomPageActions = {
  tryJoinRoomWithName: (roomId, name) => (dispatch, getState, firebase) => {
    firebase
      .database()
      .ref(`room/${roomId}/users`)
      .push(name)
      .then(() => dispatch(AppActions.setMe(name)))
  },
}
