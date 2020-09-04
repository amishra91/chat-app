import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';

const Messages = ({messages, name, time, timeFormat}) => {
  const urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  let isURL = false;
  
  return (
    <div className="message-view" >
      <ScrollToBottom scrollViewClassName="message-view">
      {
        messages.map((message, index) => {
          if(urlRegex.test(message.text)) {
            isURL = true;
          } else {
            isURL = false;
          }
          return (
            <div key={index} className="message-wrapper">
              <Message message={message} name={name} time={time} timeFormat={timeFormat} url={isURL}/>
            </div>
          )
        })
      }
      </ScrollToBottom>
    </div>
  )
}


export default Messages;