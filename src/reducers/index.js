import { combineReducers } from 'redux'
import firebaseReducer from './firebaseReducer'
import { handleActions } from 'redux-actions'
import { routerReducer } from 'react-router-redux'
import _ from 'lodash'

export default combineReducers({
    firebase: firebaseReducer,
    router: routerReducer,
    roomPin: handleActions({
        SET_ROOM_PIN: (currentRoom, action) => action.payload
    }, null),
    room: handleActions({
        SET_ROOM: (room, action) => action.payload
    }, null),
    topRestaurant: handleActions({
        SET_ROOM: (topRestaurant, action) => {
            if (!_.get(action, 'payload.restaurants')) {
                return topRestaurant
            }

            const restaurants = _.values(action.payload.restaurants)
            let max = 0
            let top = null
            _.each(restaurants, (r) => {
                if (!r.votes) {
                    return
                }
                let score = 0
                if (_.isArray(r.votes)) {
                    score = r.votes.length
                } else if (_.isNumber(r.votes)) {
                    score = r.votes
                }
                if (score > max) {
                    max = score
                    top = r
                }
            })
            return top
        }
    }, null),
    menus: handleActions({
        SET_ROOM: (prevMenus, action) => {
            const menus = _.get(action, 'payload.menus')
            if (!menus) {
                return prevMenus
            }

            return _.map(menus, (m) => {
                const users = m.users || {}
                const groupedUsers = _.groupBy(_.values(users), (u) => u)
                const countedByName = _.map(groupedUsers, (arr, id) => {
                    return {
                        name: id,
                        amount: (arr && arr.length) || 0
                    }
                })

                return {
                    name: m.name,
                    users: countedByName,
                    total: _.sumBy(countedByName, 'amount')
                }
            })
        }
    }, []),
    toasts: handleActions({
        ADD_TOAST: (toasts, action) => [...toasts, action.payload],
        DELETE_TOAST: (toasts, action) => toasts.filter((msg) => msg !== action.payload)
    }, []),
    chat: handleActions({
        CHAT_MESSAGES: (chat, action) => action.payload
    }, []),
    me: handleActions({
        SET_ME: (me, action) => action.payload
    }, null)
})
