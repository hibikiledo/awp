import { combineReducers } from 'redux'
import firebaseReducer from './firebaseReducer'
import { handleActions } from 'redux-actions'
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    firebase: firebaseReducer,
    router: routerReducer,
    room: handleActions({
        SET_ROOM: (room, action) => action.payload
    }, null),
    toasts: handleActions({
        ADD_TOAST: (toasts, action) => [...toasts, action.payload],
        DELETE_TOAST: (toasts, action) => toasts.filter((msg) => msg !== action.payload)
    }, []),
    chat: handleActions({
        CHAT_MESSAGE: (chat, action) => action.payload
    }),
    me: handleActions({
        SET_ME: (me, action) => action.payload
    }, null)
})
