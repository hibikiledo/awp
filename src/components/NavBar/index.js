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
  icons,
  title
}) {
  return (
    <div className="nav-bar">
      <img className="app-icon left" src={circularIcon} onClick={() => onAppIconClick()}/>
      <span className="title">{title}</span>
      <img className="action-icon first" src={copyIcon} onClick={() => onCopyIconClick()}/>
      <img className="action-icon" src={shareIcon} onClick={() => onShareIconClick()}/>
    </div>
  )
}
