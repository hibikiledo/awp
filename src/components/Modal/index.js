import './style.css'

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default function Modal({
  onCloseIconClick
}) {
  return (
    <div className="modal">
      <div className="body">
        <span className="close-icon" onClick={() => onCloseIconClick}>X</span>
      </div>
    </div>
  );
}
