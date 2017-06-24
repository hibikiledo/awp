import React from 'react'
import PropTypes from 'prop-types';
import _ from 'lodash'

function shortConcat(list, size) {
  let names = _.slice(list, size)
  let joined = _.join(names, ", ")
  let remain = list.length - size
  if (remain > 0) {
    joined = `${joined} and ${remain} others`
  }
  return joined
}

const RestaurantMedia = ({restaurant}) => {
  return (
    <div className="restaurantMedia">
      <img src={restaurant.imageUrl} />
      <div>
        <div>{restaurant.restaurantName}</div>
        <div>Voted by {shortConcat(restaurant.voters, 1)}</div>
      </div>
    </div>
  )
}

RestaurantMedia.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    restaurantName: PropTypes.string.isRequired,
    voters: PropTypes.array.isRequired
}

export default RestaurantMedia