import React, { Component } from 'react';
import './App.css';
import formJson from './assets/form3.json';
import {DynamicForm} from './lib'

class App extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App">
        <DynamicForm form={formJson}/>
      </div>
    );
  }
}

export default App;