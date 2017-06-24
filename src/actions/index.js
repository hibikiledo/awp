import _ from 'lodash'
import copyClipbaord from './clipboard'
import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'

let currentChatRoomRef = null

function isBlank(s) {
  return _.isString(s) ? !_.trim(s) : _.isEmpty(s)
}

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
  // Todo: This breaks when run with service worker
  // requestPush(() => {
  //   let notification = new Notification(message)
  // })
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
  disconnectChat: () => (dispatch, getState) => {
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
  resetApp: () => (dispatch, getState, firebase) => {
    dispatch(createAction('RESET_APP')())
    dispatch(push('/'))
  },
  setRoom: createAction('SET_ROOM'),
  setRoomPin: createAction('SET_ROOM_PIN'),
  addToast: (msg) => (dispatch, getState) => {
    dispatch(createAction('ADD_TOAST')(msg))
    setTimeout(() => dispatch(createAction('DELETE_TOAST')(msg)), 3000)
  },
  setMe: createAction('SET_ME'),
  copyLink: () => (dispatch, getState) => {
    const roomPin = getState().roomPin
    if (!roomPin) {
      return;
    }
    const msg = `https://awp-pwa.firebaseapp.com/r/${roomPin}`
    copyClipbaord(msg)
  }
}

export const LandingPageActions = {
  tryJoinRoomWithPin: (pin) => (dispatch, getState, firebase) => {
    if (isBlank(pin)) {
      return dispatch(AppActions.addToast("Pin cannot empty"))
    }
    firebase
      .database()
      .ref(`room/${pin}`)
      .once('value', (s) => {
        const val = s.val()
        if (val) {
          dispatch(AppActions.setRoom(val))
          dispatch(AppActions.setRoomPin(pin))
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
    let notified = false
    firebase
      .database()
      .ref(`room/${pin}`)
      .on('value', (s) => {
        if (!s.val()) {
          console.error("Room not found")
          return dispatch(push('/'))
        }
        if (notified === false) {
          pushNotify(`You just join room ${pin}, please enter your name.`)
          notified = true
        }

        dispatch(AppActions.setRoomPin(pin))
        dispatch(AppActions.setRoom(s.val()))
      })
  },
  tryJoinRoomWithName: (roomId, name) => (dispatch, getState, firebase) => {
    if (isBlank(name)) {
      return dispatch(AppActions.addToast("Name cannot be blank"))
    }
    name = _.trim(name)
    firebase
      .database()
      .ref(`room/${roomId}/users`)
      .push(name)
      .then(() => dispatch(AppActions.setMe(name)))
  }
}

export const OrderPageActions = {
  addMenu: (menu) => async (dispatch, getState, firebase) => {
    const pin = getState().roomPin
    if (isBlank(pin)) {
      console.error("Room pin is missing, cannot add menu");
      return dispatch(AppActions.addToast("Room pin is missing, cannot add menu"))
    }

    const me = getState().me
    if (isBlank(me)) {
      console.error("Error: current user missing");
      return dispatch(push('/'))
    }

    if (isBlank(menu)) {
      return dispatch(AppActions.addToast("Menu name should not be blank"))
    }

    const menusRef = firebase.database().ref(`room/${pin}/menus`)
    let menuRef = null
    let iseq = await menusRef.orderByChild("name").equalTo(menu).once('value')
    if (iseq.val()) {
      menuRef = menusRef.child(_.first(_.keys(iseq.val())))
    } else {
      menuRef = await menusRef.push({name: menu})
    }
    return await menuRef.child('users').push(me)
  },
  updateMenu: (menu, updatedAmount) => async (dispatch, getState, firebase) => {
    const pin = getState().roomPin
    if (isBlank(pin)) {
      console.error("Room pin is missing, cannot add menu");
      return dispatch(AppActions.addToast("Room pin is missing, cannot add menu"))
    }

    const me = getState().me
    if (isBlank(me)) {
      console.error("Error: current user missing");
      return dispatch(push('/'))
    }

    if (isBlank(menu)) {
      return dispatch(AppActions.addToast("Menu name should not be blank"))
    }

    const menusRef = firebase.database().ref(`room/${pin}/menus`);
    const iseq = await menusRef.orderByChild("name").equalTo(menu).once('value');

    if (!iseq.val()) {
      return;
    }

    let menuRef = menusRef.child(_.first(_.keys(iseq.val())));

    menuRef.once('value', (menu) => {
      const menuValue = menu.val();
      const currentAmount = _.countBy(_.values(menuValue.users))[me] || 0;
      const myKeys = _.keys(_.pickBy(menuValue.users, _.partial(_.isEqual, me)));
      const diff = currentAmount - updatedAmount;

      if (diff === 0) {
        return;
      } else if (diff > 0) {
        const diffKeys = myKeys.splice(0, diff);
        diffKeys.forEach(key => menuRef.child('users/' + key).set(null));
      } else {
        const a = new Array(Math.abs(diff)).fill(1);
        a.forEach(() => menuRef.child('users').push(me));
      }
    })
  },
  endOrder: () => (dispatch, getState, firebase) => {
    const { roomPin } = getState()
    firebase
      .database()
      .ref(`room/${roomPin}/lockMenu`)
      .set(true)
  }
}

export const VotePageActions = {
  voteForRestaurant: (me, roomId, restaurantId) => (dispatch, getState, firebase) => {
    const { room } = getState()
    const numVotesByMe = _.values(room.restaurants)
      .map((restaurant) => {
        return _.keys(restaurant.votes).filter((voter) => voter === me)
      })
      .reduce(_.add, 0)

    firebase
      .database()
      .ref(`room/${roomId}/restaurants/${restaurantId}/votes/${me}`)
      .transaction((currentVotes) => {
        if (numVotesByMe === 0) {
          return currentVotes + 1
        }
        return currentVotes
      })
  }
}

export const RestaurantPageActions = {
  addRestaurant: (roomId, name, nominator, imageUrl) => (dispatch, getState, firebase) => {
    if (!name) {
      return dispatch(AppActions.addToast("Restaurant name cannot be empty."))
    }
    firebase
      .database()
      .ref(`room/${roomId}/restaurants`)
      .push({ name, nominator, imageUrl })
      .then(() => dispatch(RestaurantPageActions.closeRestaurantSearchBox()))
  },
  openRestaurantSearchBox: createAction('OPEN_RESTAURANT_SEARCH_BOX'),
  closeRestaurantSearchBox: createAction('CLOSE_RESTAURANT_SEARCH_BOX')
}
