import './style.css';
import placeholdImage from './images/placeholder.jpg';
import React from 'react';
import PropTypes from 'prop-types';

const SquareImage = ({ imageUrl }) => (
    <div className="square-image" style={{
        background: `url(${imageUrl || placeholdImage}) top center no-repeat`,
        backgroundSize: 'cover'
    }}>
        <img src={imageUrl || placeholdImage} />
    </div>   
)

SquareImage.propTypes = {
    imageUrl: PropTypes.string
}

export default SquareImage;