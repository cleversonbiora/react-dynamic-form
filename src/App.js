import React, { Component } from 'react';
import './App.css';
import formJson from './assets/form3.json';
import {DynamicForm} from './lib'

class App extends Component {

  render() {
    var x = {
      f1: function() {console.log('Amendoim Logger');},
      f2: function() {alert('Amendoim');}
    };
    return (
      <div className="App">
        <DynamicForm form={formJson} functions={x}/>
      </div>
    );
  }
}

export default App;