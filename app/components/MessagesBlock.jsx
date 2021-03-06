import React from 'react';
import dateFormat from 'dateformat';
import ReactDOM from 'react-dom';

import {compareDatesWithoutTime} from 'utils/utils';
import ChatView from './ChatView';

export default React.createClass({
  propTypes: {
    chatMessages: React.PropTypes.array.isRequired,
    chatId: React.PropTypes.string.isRequired,
    loadInfo: React.PropTypes.object.isRequired,
    onLoadMessages: React.PropTypes.func.isRequired
  },

  loadMessages() {
    const chatId = this.props.chatId;
    const loadInfo = this.props.loadInfo;
    const onLoadMessages = this.props.onLoadMessages;

    return new Promise((resolve, reject) => {
      if(loadInfo.hasMore) {
        onLoadMessages(chatId);
      }
      resolve();
    });
  },

  render () {
    const {chatMessages, chatId, loadInfo, onLoadMessages} = this.props;
    const messagesAmount = chatMessages.length;

    return <ChatView className="MessagesBlock"
                     flipped={true}
                     scrollLoadThreshold={0}
                     onInfiniteLoad={this.loadMessages}
                     loadingSpinnerDelegate={<div className="Loader" />}>
      {chatMessages.map((message, i) => {
        const className = message.is_read ? 'Message' : 'Message-unread';
        const messageTimestamp = new Date(message.timestamp);
        const isFirstMessage = i === (messagesAmount - 1);
        let beforeMessageTimestamp;

        if(i === 0) {
          beforeMessageTimestamp = new Date(chatMessages[i].timestamp);
        }
        else {
          beforeMessageTimestamp = new Date(chatMessages[i - 1].timestamp);
        }

        return <div key={`message${i}`}>
          {isFirstMessage ? <div className="MessagesBlockDate">
                              {dateFormat(messageTimestamp, 'mmmm d, yyyy')}
                            </div> : ''}
          <div className={className}>
            <div className="MessageInfo">
              <div className="MessageSender">
                {message.sender_username}
              </div>
              <div className="MessageTimestamp">
                {dateFormat(messageTimestamp, 'h:MM:ss TT')}
              </div>
            </div>
            <div className="MessageText">{message.text}</div>
          </div>
          {compareDatesWithoutTime(beforeMessageTimestamp, messageTimestamp) ?
             <div className="MessagesBlockDate">
               {dateFormat(beforeMessageTimestamp, 'mmmm d, yyyy')}
             </div> : ''}
        </div>
      })}
    </ChatView>
  }
});
