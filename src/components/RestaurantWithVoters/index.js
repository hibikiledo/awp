import './style.css';

import PropTypes from 'prop-types';
import React from 'react';

const ActiveOverlay = () => (
    <div
        style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        background: 'rgba(0,0,0,0.4)',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Roboto, Arial'
    }}>
        <div
            style={{
            position: 'absolute',
            left: '-5px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '16px',
            height: '24px',
            background: '#e21a00',
            borderRadius: '2px'
        }}/>
        Voted
    </div>
)

const RestaurantWithVoters = ({title, imageUrl, imageWidth, vote, active}) => {
    var coverWidth = 100 - imageWidth;
    var rightItem;
    if (vote > 1) {
        rightItem = (
            <div className="right-item">{vote}
                votes</div>
        );
    } else {
        rightItem = (
            <div className="right-item">{vote}
                vote</div>
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
            <div
                className="image"
                style={{
                background: `url(${imageUrl}) center no-repeat`,
                backgroundSize: 'cover'
            }}>
                <div
                    className="white-box"
                    style={{
                    width: `${coverWidth}%`
                }}></div>
                <div
                    className="black-box"
                    style={{
                    position: 'relative',
                    width: `${imageWidth}%`
                }}>
                    { active && <ActiveOverlay/> }
                </div>

            </div>
        </div>
    );
};

RestaurantWithVoters.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    imageWidth: PropTypes.number.isRequired,
    vote: PropTypes.number.isRequired
};

export default RestaurantWithVoters;
