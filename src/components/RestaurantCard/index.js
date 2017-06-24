import './style.css';
import React from 'react';
import PropTypes from 'prop-types';
import SquareImage from '../SquareImage';

const RestaurantCard = ({ imageUrl, restaurantName, nominatedBy }) => (
    <div className="restaurant-card">
        <SquareImage imageUrl={imageUrl} />
        <div className="title">{restaurantName}</div>
        <div className="description">nominated by <span className="highlight">{nominatedBy}</span></div>
    </div>
);

RestaurantCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    restaurantName: PropTypes.string.isRequired,
    nominatedBy: PropTypes.string.isRequired
}

export default RestaurantCard;