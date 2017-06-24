import React, {Component} from 'react';

import PropTypes from 'prop-types';
import ChatInput from '../ChatInput';
import ChatDisplay from '../ChatDisplay';
import {debounce} from 'lodash';


const Chatbox = ({messages, sendMessage}) => {
  return (
    <div className="container">
      {messages.map((r, i) => <ChatDisplay
        key={i}
        flag={r.flag}
        name={r.name}
        message={r.message} />
      )}
      <ChatInput onSendIconClick={sendMessage} />
    </div>
  );
}

export default Chatbox;