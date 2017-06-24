import './style.css';
import React from 'react';
import PropTypes from 'prop-types';

const SquareImage = ({ imageUrl }) => (
    <div className="square-image" style={{
        background: `url(${imageUrl}) top center no-repeat`,
        backgroundSize: 'cover'
    }}>
        <img src={imageUrl} />
    </div>   
)

SquareImage.propTypes = {
    imageUrl: PropTypes.string
}

export default SquareImage;