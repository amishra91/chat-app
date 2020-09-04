import React from 'react';
import { Link } from 'react-router-dom'
import './header.scss';

const Header = (props) => {
  return(
    <header className="app-header">
      <div>
        <p className="header-menu">{props.name} (you)</p>
      </div>
      <div>
        <a href="#" onClick={props.displaySettings} style={{marginRight: '12px'}} className="header-menu">Settings</a>
        <Link to="/" className="header-menu">Signout</Link>
      </div>
    </header>
  )
}

export default Header;