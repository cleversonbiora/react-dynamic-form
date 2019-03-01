import React, { Component } from 'react';
import './App.css';
import formJson from './assets/form3.json';
import {DynamicPage} from './lib'
import CustomDiv from './CustomDiv';

class App extends Component {

  render() {
    var funcs = {
      f1: function(value) { console.log('Value');},
      f2: function() {console.log('Amendoim Torrado');},
      f3:function(value) {console.log(value);}
    };

    const Components = {
      CustomDiv
    };

    return (
      <div className="App">
        <DynamicPage form={formJson} functions={funcs} customComponents={Components}/>
      </div>
    );
  }
}

export default App;