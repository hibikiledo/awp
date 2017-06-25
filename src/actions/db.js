import PouchDB from 'pouchdb-browser'
import _ from 'lodash'

if (process.env.NODE_ENV === "development") {
  PouchDB.debug.enable('pouchdb:api')
}

export const rooms = new PouchDB("rooms")
export const chats = new PouchDB("chats")

export const Chats = {
  findRoom: async (roomPin) => {
    try {
      let doc = await chats.get(roomPin)
      return doc.messages
    } catch(e) {
      return null
    }
  },
  findOrCreateChatRoom: async (roomPin) => {
    try {
      return await chats.get(roomPin)
    } catch(e) {
      return await chats.put({
        _id: roomPin
      })
    }
  },
  updateChatRoom: async (roomPin, data) => {
    let chat = await Chats.findOrCreateChatRoom(roomPin)
    let toupdate = _.extend({_id: chat._id || chat.id, _rev: chat._rev || chat.rev}, {messages: data})
    return await chats.put(toupdate)
  }
}

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
    return await rooms.put(toupdate)
  }
}