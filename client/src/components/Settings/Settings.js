import React from 'react';
import './settings.scss';

const Settings = (props) => {
  let settings = null;
  if(props.showSettings) {
    settings = <div className="settings-modal-wrapper">
                <div className="settings-modal">
                  <button className="close-settings" onClick={props.hideSettings}>x</button>
                  <div className="settings-menus">
                    <p className="menu-label">Clock Type</p>
                    <label>
                      <input type="radio" 
                        name="clock" 
                        value="hh:mm A"
                        onClick={props.setUserCustomSettings} /> 12 Hours
                    </label>
                    <label>
                      <input type="radio" 
                        name="clock" 
                        value="HH:mm" 
                        onClick={props.setUserCustomSettings}/> 24 Hours
                    </label>
                  </div>

                  <div className="settings-menus" style={{margin : "20px 0"}}>
                    <p className="menu-label">Send message on Ctrl+Enter</p>
                    <label>
                      <input type="radio" 
                      name="sendKey" 
                      onClick={props.setUserCustomSettings}
                      value="on"/> On
                    </label>
                    <label>
                      <input type="radio" 
                      name="sendKey" 
                      onClick={props.setUserCustomSettings}
                      value="off"/> Off
                    </label>
                  </div>
                  <p className="settings-restores">{props.settingsRestored}</p>
                  <button className="restore-settings-btn" onClick={props.restoreSettings}>Restore Settings</button>
                </div>

                
              </div>
  }
  return settings
}

export default Settings;