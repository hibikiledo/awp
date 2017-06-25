import _ from 'lodash'
import copyClipbaord from './clipboard'
import {createAction} from 'redux-actions'
import {push} from 'react-router-redux'
import {Chats, Rooms} from './db'

let currentChatRoomRef = null
let subscribed = []
async function fbSubsc(path, cb) {
  let result = path.on('value', cb)
  subscribed.push(path)
  return await result
}

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
  joinOrCreateChatRoom: (roomId) => async (dispatch, getState, firebase) => {
    if (!getState().firebaseConnected) {
      let messages = await Chats.findRoom(roomId)
      const payload = {
        me: getState().me,
        messages: messages
      }
      dispatch(createAction('CHAT_MESSAGES')(payload))
    }
    if (currentChatRoomRef !== null) {
      currentChatRoomRef.off()
    }
    currentChatRoomRef = firebase.database().ref(`chat/${roomId}`)
    currentChatRoomRef.on('value', (s) => {
      const payload = {
        me: getState().me,
        messages: s.val() || []
      }
      Chats.updateChatRoom(roomId, payload.messages)
      dispatch(createAction('CHAT_MESSAGES')(payload))
    })
  },
  disconnectChat: () => (dispatch, getState) => {
    if (currentChatRoomRef !== null) {
      currentChatRoomRef.off()
    }
    currentChatRoomRef = null
    dispatch(createAction('CHAT_MESSAGES')(null))
  },
  sendMessage: (message) => (dispatch, getState, firebase) => {
    if (currentChatRoomRef == null) {
      console.error("Chat room subscribe is not active")
      return;
    }
    const state = getState()
    if (isBlank(state.me)) {
      console.error("Chat room cannot find active user name")
      return;
    }
    return currentChatRoomRef.push({
      payload: message,
      name: state.me,
      type: "text"
    })
  },
  showChatDialog: () => (dispatch, getState, firebase) => {
    dispatch(createAction("OPEN_CHAT_DIALOG")())
  },
  closeChatDialog: () => (dispatch, getState, firebase) => {
    dispatch(createAction("CLOSE_CHAT_DIALOG")())
  }
}

export const AppActions = {
  resetApp: () => (dispatch, getState, firebase) => {
    _.each(subscribed, (s) => s.off())
    subscribed = []
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
  tryJoinRoomWithPin: (pin) => async (dispatch, getState, firebase) => {
    if (isBlank(pin)) {
      return dispatch(AppActions.addToast("Pin cannot empty"))
    }

    dispatch(createAction('LOADING_START')());

    if (!getState().firebaseConnected) {
      try {
        const room = await Rooms.findRoom(pin)
        dispatch(AppActions.setRoom(room))
        dispatch(AppActions.setRoomPin(pin))
        dispatch(createAction('LOADING_END')());
        dispatch(push('/r/' + pin));
      } catch(e) {
        dispatch(AppActions.addToast('[Offline] Invalid Pin'))
      }
    }
    firebase
      .database()
      .ref(`room/${pin}`)
      .once('value', (s) => {
        dispatch(createAction('LOADING_END')());

        const val = s.val()
        if (val) {
          Rooms.updateRoom(pin, val)
          dispatch(AppActions.setRoom(val))
          dispatch(AppActions.setRoomPin(pin))
          dispatch(createAction('LOADING_END')())
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

const generateRoomID = async function() {
  for (let i = 0; i < 99999; i++) {
    let tempID = _.padStart(_.random(0, 99999), 5, '0');
    // let tempID = '53096'
    let existRoom = await global.firebase.database().ref(`room/${tempID}`).once('value');
    console.log(`Checked room ${tempID}, value=${existRoom.val()}`)
    if (!existRoom.val()) {
      return tempID;
    }
  }
}

export const CreateRoomPageActions = {
  createRoom: (roomName, nominateTime) => async (dispatch, getState, firebase) => {
    dispatch(createAction('LOADING_START')());
    
    const roomCfg = {
      name: roomName,
      nominateTime: nominateTime,
      startTime: new Date().getTime()
    }
    let roomId = await generateRoomID()
    console.log("ROOM ID:", roomId)

    let newRoom = await firebase.database()
      .ref('room/' + roomId)
      .set(roomCfg);

    dispatch(createAction('LOADING_END')());

    dispatch(push(`r/${roomId}`))
    console.log('create room in firebase')

  }
}

export const RoomPageActions = {
  subscribeRoom: (pin) => async (dispatch, getState, firebase) => {
    let notified = false
    dispatch(createAction('LOADING_START')());
    
    return await fbSubsc(firebase.database().ref(`room/${pin}`), (s) => {
      dispatch(createAction('LOADING_END')());
      if (!s.val()) {
        console.error("Room not found")
        return dispatch(push('/'))
      }
      if (notified === false) {
        pushNotify(`You just join room ${pin}, please enter your name.`)
        notified = true
      }
      Rooms.updateRoom(pin, s.val())
      dispatch(AppActions.setRoomPin(pin))
      dispatch(AppActions.setRoom(s.val()))
    })
  },
  tryJoinRoomWithName: (roomId, name) => (dispatch, getState, firebase) => {
    if (isBlank(name)) {
      return dispatch(AppActions.addToast("Name cannot be blank"))
    }
    name = _.trim(name)

    dispatch(createAction('LOADING_START')());

    if (!getState().firebaseConnected) {
      dispatch(AppActions.setMe(name))
      dispatch(createAction('LOADING_END')())
      dispatch(ChatActions.joinOrCreateChatRoom(roomId))
    }
    firebase
      .database()
      .ref(`room/${roomId}/users`)
      .push(name)
      .then(() => {
        dispatch(createAction('LOADING_END')())
        dispatch(AppActions.setMe(name))
        dispatch(ChatActions.joinOrCreateChatRoom(roomId))
      })
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

    const firstKey = _.first(_.keys(iseq.val()));
    let menuRef = menusRef.child(firstKey);

    menuRef.once('value', (m) => {
      const menuValue = m.val();
      const menuAmounts = _.countBy(_.values(menuValue.users));
      const myCurrentAmount = menuAmounts[me] || 0;
      const totalAmount = _.sum(_.values(menuAmounts));
      const myKeys = _.keys(_.pickBy(menuValue.users, _.partial(_.isEqual, me)));
      const diff = myCurrentAmount - updatedAmount;

      if (totalAmount - diff <= 0) {
        return menusRef
          .child(firstKey)
          .set(null)
          .then(() => dispatch({
            type: 'REMOVE_MENU',
            payload: {
              menuName: menu
            }
          }));
      } else if (diff === 0) {
        return
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
