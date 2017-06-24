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
    const coverWidth = 100 - imageWidth;
    const safeImageWidth = Math.max(2, imageWidth)
    return (
        <div className="restarant-vote">
            <div className="pull-left">
                <div className="title">{title}</div>
            </div>
            <div className="pull-right">
                <div className="right-item">
                    {`${vote} ${vote > 1 ? 'Votes' : 'Vote'}`}
                </div>
            </div>
            <div className="clear"></div>
            <div
                className="image"
                style={{
                    background: `url(${imageUrl}) center no-repeat`,
                    backgroundSize: 'cover'
                }}
            >
                <div
                    className="white-box"
                    style={{
                        width: `${coverWidth}%`
                }} />
                <div
                    className="black-box"
                    style={{
                        position: 'relative',
                        width: `${safeImageWidth}%`,
                        opacity: imageWidth === 0 ? 0.5 : 1
                }}>
                { active && <ActiveOverlay />}
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
