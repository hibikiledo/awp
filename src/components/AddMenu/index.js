import './style.css'

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function AddMenu(props) {
  return (
    <div className="add-menu">
      <input type="text" placeholder="Menu Name" className="menu-input" {...props} />
      <div className="add-btn">Add</div>
    </div>
  );
}
