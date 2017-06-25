import './style.css'

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import sendIcon from './images/send.png';

export default class ChatInput extends Component {
  render() {
    const { onSendIconClick } = this.props
    return (
      <div className="chat-bottom">
        <input type="text" placeholder="Aa" className="chat-input" ref="input" onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSendIconClick(this.refs.input.value)
            this.refs.input.value = ""
          }
        }} />
        <img className="send-btn" src={sendIcon} onClick={() => {
          onSendIconClick(this.refs.input.value)
          this.refs.input.value = ""
        }} />
      </div>
    );
  }
}