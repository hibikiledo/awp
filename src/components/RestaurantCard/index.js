import './style.css';

import PropTypes from 'prop-types';
import React from 'react';
import SquareImage from '../SquareImage';

const RestaurantCard = ({ imageUrl, restaurantName, nominatedBy }) => (
    <div className="restaurant-card">
        <SquareImage imageUrl={imageUrl} />
        <div className="title">{restaurantName}</div>
        <div className="description">nominated by <span className="highlight">{nominatedBy}</span></div>
    </div>
);

RestaurantCard.propTypes = {
    imageUrl: PropTypes.string,
    restaurantName: PropTypes.string.isRequired,
    nominatedBy: PropTypes.string.isRequired
}

export default RestaurantCard;
