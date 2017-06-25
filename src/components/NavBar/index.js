import './style.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import circularIcon from './images/circular-icon.png';
import copyIcon from './images/copy.png';
import shareIcon from './images/share.png';

NavBar.propTypes = {
  icons: PropTypes.arrayOf(PropTypes.node),
  title: PropTypes.string,
  onAppIconClick: PropTypes.func,
  onCopyIconClick: PropTypes.func,
  onShareIconClick: PropTypes.func,
};

export default function NavBar({
  onAppIconClick,
  onCopyIconClick,
  onShareIconClick,
  showCopy,
  icons,
  title
}) {
  return (
    <div className="nav-bar">
      <img className="app-icon left" alt="App Logo" src={circularIcon} onClick={() => onAppIconClick()}/>
      {showCopy ?
        <div className="block-nav-bar">
          <span className="room-pin">{showCopy}&ensp;</span>
          <span className="room-name">{title}</span>
          <img className="action-icon" src={copyIcon} id="clipboard" onClick={() => onCopyIconClick()}/>
        </div>
        : <span className="title">{title}</span>}
    </div>
  )
}
