import React from 'react'
import './style.css'
import ChatBtn from '../ChatBtn'
import ChatBox from '../ChatBox'
import _ from 'lodash'

export default (props) => {
  const { chat, showChatDialog, closeChatDialog, chatDialogShow, sendMessage } = props

  if (chat === null) {
    return null
  }

  return (
    <div className={`chatContainer ${chatDialogShow ? "expanded": ""}`} onClick={closeChatDialog}>
      <div className="chatWrapper" onClick={(e) => {e.stopPropagation(); e.preventDefault()}}>
      { chatDialogShow ? <ChatBox messages={chat} {...props} />
        : <ChatBtn onChatIconClick={showChatDialog} />
      }
      </div>
    </div>
  )
}