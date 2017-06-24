import './style.css';

import React, {Component} from 'react';

import PropTypes from 'prop-types';
import ChatInput from '../ChatInput';
import ChatDisplay from '../ChatDisplay';
import {debounce} from 'lodash';


const Chatbox = ({messages}) => {
  return (
    <div className="container">
      {messages.map((r, i) => <ChatDisplay
        key={i}
        flag={r.flag}
        name={r.name}
        message={r.message} />
      )}
      <ChatInput />
    </div>
  );
}

export default Chatbox;