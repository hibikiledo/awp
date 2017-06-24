import React from 'react';
import SquareImage from '../SquareImage';
import './style.css';

const RestaurantDisplayWithVoters = ({ imageUrl, restaurantName, voters }) => (
  <div className="restaurant-display">
    <div className="image">
      <SquareImage imageUrl={imageUrl} />
    </div>
    <div className="text">
      <h4>{restaurantName}</h4>
      <div>Voted by {
          voters.length > 4 ? voters.splice(0, 4).join(', ') +  ` and ${voters.length} others` : voters.join(', ')
        }</div>
    </div>
    <div className="clear"></div>
  </div>
)

export default RestaurantDisplayWithVoters;