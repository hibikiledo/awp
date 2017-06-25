import React, { Component } from 'react';

import PropTypes from 'prop-types';
import ChatInput from '../ChatInput';
import ChatDisplay from '../ChatDisplay';
import { debounce, map } from 'lodash';
import './style.css'

function scrollChatToEnd() {
  const ele = global.document.getElementById('chatMessage')
  if (!ele) {
    console.error("Cannot find chat messages")
    return
  }
  ele.scrollIntoView(false)
}

class Chatbox extends Component {
  shouldComponentUpdate(props, state) {
    if (!props.messages) {
      return false;
    }
    if (!this.props.messages) {
      return true;
    }
    return this.props.messages.length !== props.messages.length
  }

  componentDidMount() {
    scrollChatToEnd()
  }

  componentDidUpdate() {
    scrollChatToEnd()
  }

  render() {
    let { messages, sendMessage } = this.props
    messages = messages || []
    return (
      <div className="container">
        <div className="messagesCtn">
          <div className="messagesScroll" id="chatMessage">
            {map(messages, (r, i) => <ChatDisplay
              key={i}
              flag={r.flag}
              name={r.name}
              message={r.payload} />
            )}
          </div>
        </div>
        <ChatInput onSendIconClick={sendMessage} />
      </div>
    );
  }
}

export default Chatbox;