import React from 'react'
import './style.css'
import ChatBtn from '../ChatBtn'
import ChatBox from '../ChatBox'
import _ from 'lodash'

export default (props) => {
  const { chat, showChatDialog, closeChatDialog, chatDialogShow, sendMessage } = props

  if (chat === null) {
    return <div className="chatContainer collapsed"></div>
  }
  const classExpanded = chatDialogShow ? "expanded": "collapsed"
  return (
    <div className={`chatContainer ${classExpanded}`} onClick={closeChatDialog}>
      <div className={`chatWrapper ${classExpanded}`} onClick={(e) => {e.stopPropagation(); e.preventDefault()}}>
        { !chatDialogShow && <ChatBtn onChatIconClick={showChatDialog} /> }
        <ChatBox messages={chat} {...props} />
      </div>
    </div>
  )
}