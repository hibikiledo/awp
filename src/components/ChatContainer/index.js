import React from 'react'
import './style.css'
import ChatBtn from '../ChatBtn'
import ChatBox from '../ChatBox'
import _ from 'lodash'

export default ({ chat, showChatDialog, closeChatDialog, chatDialogShow }) => {
  if (chat === null) {
    return null
  }

  return (
    <div className={`chatContainer ${chatDialogShow ? "expanded": ""}`} onClick={closeChatDialog}>
      <div className="chatWrapper">
      { chatDialogShow ? <ChatBox messages={chat} />
        : <ChatBtn onChatIconClick={showChatDialog} />
      }
      </div>
    </div>
  )
}