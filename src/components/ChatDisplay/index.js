import './style.css'

import React, { Component } from 'react';

import PropTypes from 'prop-types';

const ChatDisplay = ({flag, name, message}) => {
  var messageDisplay;

  if(flag) {
    messageDisplay = (
    <div className="my-message-container">
      <text className="display-name">{name}</text>
      <div className="my-message">
        <text>{message}</text>
      </div>
    </div>
    );
  } else {
    messageDisplay = (
    <div className="their-message-container">
      <text className="display-name">{name}</text>
      <div className="their-message">
        <text>{message}</text>
      </div>
    </div>
    );
  }
  return (
    <div className="message-container">
        {messageDisplay}
    </div>
  )
}

export default ChatDisplay;