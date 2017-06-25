import './style.css'

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import closeIcon from './images/close.png';

export default function Modal({
  open,
  children,
  onCloseIconClick
}) {
  if (!open) { return null }
  return (
    <div className="modal">
      <div className="body">
        <img className="close-icon" src={closeIcon} onClick={onCloseIconClick} />
        { children }
      </div>
    </div>
  );
}
