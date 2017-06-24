import React from 'react'
import './style.css'
import ChatBtn from '../ChatBtn'
import _ from 'lodash'

export default ({ chat, showChatDialog }) => {
  if (chat === null) {
    return null
  }

  return (
    <div className="chatContainer">
      <ChatBtn onChatIconClick={showChatDialog} />
    </div>
  )
}