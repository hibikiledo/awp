import './style.css';
import React from 'react';
import PropTypes from 'prop-types';

const RestaurantWithVoters = ({title, imageUrl,imageWidth, vote}) => {
    var coverWidth = 100-imageWidth;
    var rightItem;
    if (vote > 1) {
        rightItem = (
            <div className="right-item">{vote} votes</div>
        );
    } else {
        rightItem = (
            <div className="right-item">{vote} vote</div>
        );
    }

    return (
        <div className="restarant-vote">
            <div className="pull-left">
                <div className="title">{title}</div>
            </div>
            <div className="pull-right">
            {rightItem}
            </div>
            <div className="clear"></div>
            <div className="image" style={{
                    background: `url(${imageUrl}) center no-repeat`,
                    backgroundSize: 'cover'
                }}>
                <div className="white-box" style={{
                    width: `${coverWidth}%`
                }} >
                </div>
                <div className="black-box" style={{
                    width: `${imageWidth}%`
                }} ></div>
            </div>
        </div>
    );
};

RestaurantWithVoters.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    rightItem: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.element
    ])
};

export default RestaurantWithVoters;