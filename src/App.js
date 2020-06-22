import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Editor from './editor/editor'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
    
      <Switch>
        <Route exact  path="/" component={Editor}/>   
      </Switch>
    </BrowserRouter>
  );
}

export default App;
