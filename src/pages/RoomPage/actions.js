export default function(roomId, room) {
  return {
    setName: (name) => {
      room.update({ members: [name] })
        .then(() => {
          this.setState(() => ({ me: name }))
        })
    }
  }
}
