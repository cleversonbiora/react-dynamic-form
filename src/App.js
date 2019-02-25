import React, { Component } from 'react';
import './App.css';
import formJson from './assets/form3.json';
import {DynamicForm} from './lib'

class App extends Component {

  render() {
    var funcs = {
      f1: function(value) {
        console.log('Value');
      },
      f2: function() {console.log('Amendoim Torrado');},
      f3:function(value) {console.log(value);}
    };
    // var funcTest = {
    //   args:["a","b","c"],
    //   body:"return a * b * c"
    // }
    //var jsonFunc = new Function(funcTest.args, funcTest.body);
    //alert(jsonFunc(10,100,1000));
    
    return (
      <div className="App">
        <DynamicForm form={formJson} functions={funcs}/>
      </div>
    );
  }
}

export default App;