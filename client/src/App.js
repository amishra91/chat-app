import React from 'react';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import './app.scss';

const App = () => {
  return(
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Join} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </BrowserRouter>
    </div>
    
  )
}

export default App;