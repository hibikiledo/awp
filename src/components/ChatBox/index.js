import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ChatInput from '../ChatInput';
import ChatDisplay from '../ChatDisplay';
import { debounce, map } from 'lodash';


const Chatbox = ({ messages, sendMessage }) => {
  messages = messages || []
  return (
    <div className="container">
      {map(messages, (r, i) => <ChatDisplay
        key={i}
        flag={r.flag}
        name={r.name}
        message={r.payload} />
      )}
      <ChatInput onSendIconClick={sendMessage} />
    </div>
  );
}

export default Chatbox;