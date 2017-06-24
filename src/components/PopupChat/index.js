import './style.css'

import React, { Component } from 'react';

import PropTypes from 'prop-types';

export default function PopupChat({ name, message }) {
  var temp = <img className="chat-btn" onClick={() => onPopupIconClick()}/>
  return (
    <div>
      <div className="my-message">
        <text>{message}</text>
      </div>
      <div className="triangle-down" />
      <text className="display-name">{name}</text>
    </div>
  );
}