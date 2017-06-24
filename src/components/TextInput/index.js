import './style.css'

import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default function TextInput(props) {
  return (
    <input type="text" className="text-input" {...props} />
  );
}
