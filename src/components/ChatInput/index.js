import './style.css'

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import sendIcon from './images/send.png';

export default function ChatInput({ children, ...props }) {
  return (
    <div className="chat-bottom">
      <input type="text" placeholder="type your insults here" className="chat-input" />
      <img className="send-btn" src={sendIcon} onClick={() => onSendIconClick()}/>
    </div>
  );
}