import React from 'react';
import Moment from 'react-moment';
import './message.scss';

const Message = ({message: {user, text, time}, name, url, timeFormat}) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();
  let message = null;
  let messageContainerClass = null;

  if(url) {
    messageContainerClass = "has-image";
    message = <img src={text} className="message-img" />;
  } else {
    message = <p className="message-text">{text}</p>
  }

  if(user == trimmedName) {
    isSentByCurrentUser = true;
  }
  return (
    isSentByCurrentUser ? (
      <div className="message-container right">
        <div className={`message-box current-user ${messageContainerClass}`}>
          {message}
          <p className="message-time">
            <Moment format={timeFormat}>{time}</Moment>
          </p>
        </div>
      </div>
    ) :
      <div className="message-container left">
        <div className={`message-box other-user ${messageContainerClass}`}>
          <p className="sender-name">{user}</p>
          {message}
          <p className="message-time">
            <Moment format={timeFormat}>{time}</Moment>
          </p>
        </div>
      </div>
  )
}

export default Message;