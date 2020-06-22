import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Editor from './editor/editor'
import PureEditor from './editor/pureEditor'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App"></div>
    
      <Switch>
        <Route exact  path="/" component={Editor}/>   
        <Route exact  path="/p" component={PureEditor}/>   
      </Switch>
    </BrowserRouter>
  );
}

export default App;
