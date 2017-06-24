import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

let currentChatRoomRef = null

function requestPush(cb) {
  if (Notification.permission === "granted") {
    cb()
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        cb()
      }
    });
  }
}

export function pushNotify(message) {
  if (!("Notification" in window)) {
    return;
  }
  requestPush(() => {
    let notification = new Notification(message)
  })
}

export const ChatActions = {
  joinOrCreateChatRoom: (roomId) => (dispatch, getState, firebase) => {
    if (currentChatRoomRef !== null) {
      currentChatRoomRef.off()
    }
    currentChatRoomRef = firebase.database().ref(`chat/${roomId}`)
    currentChatRoomRef.on('value', (s) => {
      if (!s.val()) {
        return;
      }
      dispatch(createAction('CHAT_MESSAGES')(s.val()))
    })
  },
  disconnectChat: () => {
    if (currentChatRoomRef !== null) {
      currentChatRoomRef.off()
    }
    currentChatRoomRef = null
  },
  sendMessage: (message, name) => (dispatch, getState, firebase) => {
    if (currentChatRoomRef == null) {
      return;
    }
    return currentChatRoomRef.push({
      payload: message,
      name,
      type: "text"
    })
  }
}

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
    firebase
      .database()
      .ref(`room/${pin}`)
      .once('value', (s) => {
        const val = s.val()
        if (val) {
          dispatch(AppActions.setRoom(val))
          dispatch(push('/r/' + pin));
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
  subscribeRoom: (pin) => (dispatch, getState, firebase) => {
    firebase
      .database()
      .ref(`room/${pin}`)
      .on('value', (s) => {
        pushNotify(`You just join room ${pin}, please enter your name.`)
        dispatch(AppActions.setRoom(s.val()))
      })
  },
  tryJoinRoomWithName: (roomId, name) => (dispatch, getState, firebase) => {
    firebase
      .database()
      .ref(`room/${roomId}/users`)
      .push(name)
      .then(() => dispatch(AppActions.setMe(name)))
  }
}

export const VotePageActions = {
  voteForRestaurant: (roomId, restaurantId) => (dispatch, getState, firebase) => {
    firebase
      .database()
      .ref(`room/${roomId}/restaurants/${restaurantId}/votes`)
      .transaction((currentVotes) => currentVotes + 1)
  }
}
