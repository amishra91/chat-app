import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './join.scss';
import io from 'socket.io-client';

const SignIn = () => {
  const ENDPOINT = 'localhost:3001';
  const socket = io(ENDPOINT);
  socket.disconnect();
  const [name, setName] = useState('');
  return (
    <div className="user-login-wrapper">
      <input type="text" 
      className="user-input" 
      placeholder="Enter username" 
      onChange={(event) => setName(event.target.value)}
      />
      <Link onClick={e => (!name) ? e.preventDefault() : null} to={`/chat?name=${name}`}>
        <button className="user-login-btn" type="submit">Sign In</button>
      </Link>
    </div>
  );
}

export default SignIn;