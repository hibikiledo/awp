import './style.css';
import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({title, description, rightItem, highlight}) => {
    if (typeof rightItem === 'string') {
        rightItem = (
            <div className="right-item">{rightItem}</div>
        );
    }

    return (
        <div className="list-item">
            <div className="pull-left">
                <div className={'title' + (highlight ? ' highlight' : '')}>{title}</div>
                <div className={'description' + (highlight ? ' highlight' : '')}>{description}</div>
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
    highlight: PropTypes.bool
};

export default ListItem;