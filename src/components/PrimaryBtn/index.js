import './style.css'

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default function PrimaryButton({ children, ...props }) {
  return (
    <button {...props} className="primary-btn">
      {children}
    </button>
  );
}
