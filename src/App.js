import React, { Component } from 'react';
import './App.css';
import formJson from './assets/form3.json';
import {DynamicForm} from './lib'

class App extends Component {

  render() {
    var x = {
      f1: function(value) {
        console.log('Value');
      },
      f2: function() {console.log('Amendoim Torrado');},
      f3:function(value) {console.log(value);}
    };
    return (
      <div className="App">
        <DynamicForm form={formJson} functions={x}/>
      </div>
    );
  }
}

export default App;