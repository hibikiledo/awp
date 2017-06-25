import _ from 'lodash'
import { combineReducers } from 'redux'
import firebaseReducer from './firebaseReducer'
import { handleActions } from 'redux-actions'
import { routerReducer } from 'react-router-redux'

const appReducer = combineReducers({
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
                if (!r || !r.votes) {
                    return
                }
                let score = _.sum(_.values(r.votes))
                if (score > max) {
                    max = score
                    top = r
                }
            })
            if (!top) {
                return top
            }

            top.voterNames = _.keys(top.votes)
            return top
        }
    }, null),
    menus: handleActions({
        SET_ROOM: (prevMenus, action) => {
            const menus = _.get(action, 'payload.menus')
            if (!menus) {
                return prevMenus
            }

            const mappedResult = _.map(menus, (m) => {
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

            return _.filter(mappedResult, (menu) => _.get(menu, 'total', 0))
        },
        REMOVE_MENU: (prevMenus, action) => {
            return _.filter(prevMenus, m => !_.partial(_.isEqual, _.get(action, 'payload.menuName'))(m));
        }
    }, []),
    toasts: handleActions({
        ADD_TOAST: (toasts, action) => [...toasts, action.payload],
        DELETE_TOAST: (toasts, action) => toasts.filter((msg) => msg !== action.payload)
    }, []),
    chat: handleActions({
        CHAT_MESSAGES: (chat, action) => {
            return _.map(action.payload.messages, m => ({flag: m.name === action.payload.me, ...m}))
        }
    }, null),
    me: handleActions({
        SET_ME: (me, action) => action.payload
    }, null),
    restaurantSearchBoxOpen: handleActions({
        OPEN_RESTAURANT_SEARCH_BOX: (__, action) => true,
        CLOSE_RESTAURANT_SEARCH_BOX: (__, action) => false,
    }, false),
    chatDialogShow: handleActions({
        OPEN_CHAT_DIALOG: (__, action) => true,
        CLOSE_CHAT_DIALOG: (__, action) => false,
    }, false),
    serviceUser: handleActions({
        SET_ROOM: (serviceUser, action) => {
            console.log('srvUser')
            const room = action.payload
            if (room && room.users) {
                const userKey = _.keys(room.users).sort()[0]
                return room.users[userKey]
            } else {
                return serviceUser
            }
        }
    }, null)
})

export default (state, action) => {
    if (action.type === 'RESET_APP') {
        state = undefined
    }
    return appReducer(state, action)
}
