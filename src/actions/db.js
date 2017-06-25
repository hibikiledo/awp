import PouchDB from 'pouchdb-browser'
import _ from 'lodash'

if (process.env.NODE_ENV === "development") {
  PouchDB.debug.enable('pouchdb:api')
}

export const rooms = new PouchDB("rooms")
export const chats = new PouchDB("chats")

export const Rooms = {
  findRoom: async (roomPin) => {
    try {
      return await rooms.get(roomPin)
    } catch(e) {
      return null
    }
  },
  findOrCreateRoom: async (roomPin) => {
    try {
      return await rooms.get(roomPin)
    } catch(e) {
      return await rooms.put({
        _id: roomPin
      })
    }
  },
  updateRoom: async (roomPin, data) => {
    let room = await Rooms.findOrCreateRoom(roomPin)
    // console.log("UPDATE:", room, data)
    let toupdate = _.extend({_id: room._id || room.id, _rev: room._rev || room.rev}, data)
    // console.log("TOUPDATE:", toupdate)
    return rooms.put(toupdate)
  }
}