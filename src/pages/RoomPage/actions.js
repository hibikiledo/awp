import _ from 'lodash'

const GOOGLE_API_KEY = 'AIzaSyBBCNZzqHHJyaWFVmHPISaTO1E76y2DE8c'

export default function(roomId, roomRef, setState) {
  let that = {
    setName: async (name) => {
      const membersRef = roomRef.child('members')
      const members = await membersRef.once('value')
      const hasName = _.values(members.val()).includes(name)
      // console.log(members.val(), _.values(members.val()), hasName)
      if (!hasName) {
        const newJoiner = await membersRef.push(name)
      }
      setState(() => ({ me: name }))
    },

    updateRestaurantsNearby: async () => {
      if (!("geolocation" in navigator)) {
        alert("no geolocation API supported on your browser")
        return
      }

      navigator.geolocation.getCurrentPosition(function(position) {
        const {latitude, longitude} = position.coords
        that.updateRestaurantsByLocation(latitude, longitude)
      })
    },

    updateRestaurantsByLocation: async (lat, lng) => {
      let result = await fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=500&types=food&key=${GOOGLE_API_KEY}`, {mode: 'no-cors'})
      console.log(result)
    }
  }

  return that
}
