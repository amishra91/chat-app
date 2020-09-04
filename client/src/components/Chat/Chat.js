import React, { useState, useEffect, Fragment } from 'react';
import queryString from 'query-string';
import Header from '../../components/Header/Header';
import Settings from '../Settings/Settings';
import Messages from '../../components/Messages/Messages';
import io from 'socket.io-client';
import './chat.scss';

let socket;

const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageTime, setMessageTime] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [timeFormat, setTimeFormat] = useState("hh:mm A");
  const [ctrlEnterToSend, setCtrlEnterToSend] = useState('Enter');
  const [settingsRestored, setSettingsRestores] = useState(null);
  const ENDPOINT = 'localhost:3001';
  const userFromLocalStorage = JSON.parse(localStorage.getItem('userSettings'));

  useEffect(() => {
    const { name } = queryString.parse(location.search);
    socket = io(ENDPOINT);
    socket.connect();
    setName(name)
    socket.emit('join', { name });
    
    setTimeFormat("hh:mm A");
    if(userFromLocalStorage) {
      const userNameFromLocalStorage = userFromLocalStorage.user.name;
      const settingsFromLocalStorage = userFromLocalStorage.user.settings;
      if(userNameFromLocalStorage == name) {
        alert('Restored your previos settings');
        setTimeFormat(settingsFromLocalStorage.timeFormatToStore);
        setCtrlEnterToSend(settingsFromLocalStorage.sendKey);
      }
    }
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    const messageTime = new Date();
    setMessageTime(messageTime);
    if(message) {
      socket.emit('sendMessage', message, messageTime, () => setMessage(''))
      event.target.value = '';
    }
  }

  const displaySettings = (event) => {
    event.preventDefault();
    setShowSettings(true);
    setSettingsRestores(null);
  }

  const hideSettings = () => {
    setShowSettings(false);
  }

  const setUserCustomSettings = (event, name) => {
    let timeFormatToStore = timeFormat;
    let sendKey = ctrlEnterToSend;
    if(event.target.name == 'clock') {
      setTimeFormat(event.target.value);
      timeFormatToStore = event.target.value;
    } else {
      if(event.target.value == 'off') {
        setCtrlEnterToSend(null);
        sendKey = null;
      } else {
        setCtrlEnterToSend('Enter');
        sendKey = 'Enter';
      }
    }
    const customSettings = {
      user: {
        name: name,
        settings: {
          timeFormatToStore: timeFormatToStore,
          sendKey: sendKey
        }
      }
    }
    localStorage.setItem('userSettings', JSON.stringify(customSettings));
  }
  const restoreSettings = () => {
    localStorage.removeItem('userSettings');
    setSettingsRestores('Your settings restored to default!!')
  }
  
  return (
    <Fragment>
      <Header displaySettings={displaySettings} name={name} />
      <Messages 
      messages={ messages } 
      name={name} 
      time={messageTime}
      timeFormat={timeFormat}
      />

      <div className="send-messages-wrapper">
        <input className="user-input" 
        placeholder="Type a message" 
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={event => event.key == ctrlEnterToSend && event.ctrlKey ? sendMessage(event): null}
        />
        <button className="send-msg-btn" onClick={event => sendMessage(event)}>Send</button>
      </div>
      <Settings
      showSettings={showSettings} 
      hideSettings={hideSettings} 
      restoreSettings={restoreSettings}
      settingsRestored={settingsRestored}
      setUserCustomSettings = {event => setUserCustomSettings(event, name)}
      />
    </Fragment>
  )
}

export default Chat;