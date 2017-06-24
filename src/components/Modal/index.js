import './style.css'

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default function Modal({
  open,
  children,
  onCloseIconClick
}) {
  if (!open) { return null }
  return (
    <div className="modal">
      <div className="body">
        <span className="close-icon" onClick={onCloseIconClick}>X</span>
        { children }
      </div>
    </div>
  );
}
