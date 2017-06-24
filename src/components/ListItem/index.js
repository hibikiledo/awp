import './style.css';
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({title, description, rightItem}) => {
    if (typeof rightItem === 'string') {
        rightItem = (
            <div className="right-item">{rightItem}</div>
        );
    }

    return (
        <div className="list-item">
            <div className="pull-left">
                <div className="title">{title}</div>
                <div className="description">{description}</div>
            </div>
            {rightItem && <div className="pull-right">
                { rightItem }
            </div>}
            <div className="clear"></div>
        </div>
    );
};

ListItem.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    rightItem: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.element
    ])
};

export default ListItem;