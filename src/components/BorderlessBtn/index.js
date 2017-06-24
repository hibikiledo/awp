import './style.css'

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default function BorderlessBtn({ children, ...props }) {
  return (
    <button {...props} className="borderless-btn">
      {children}
    </button>
  );
}
