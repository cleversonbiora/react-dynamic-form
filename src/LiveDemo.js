import React, { Component } from 'react';
import './App.css';
import formJson from './assets/form.json';
import {DynamicPage} from './lib'

class LiveDemo extends Component {
 constructor(props){
     super(props);
     this.state = { json: JSON.stringify(formJson, null, ' '), jsonForm: formJson};
 }
 update(value){
    this.setState({json: value});
    try {
        let jsonParse = JSON.parse(value);
        this.setState({jsonForm: jsonParse});
    } catch (e) {
        console.warn("Invalid JSON");
    }
 }
  render() {
    return (
      <div className="App">
        <textarea style={{width:100 + '%', height:200}} onChange={({ target: { value } }) => { this.update(value); }} value={this.state.json}></textarea>
        <DynamicPage live={true} form={this.state.jsonForm}/>
      </div>
    );
  }
}

export default LiveDemo;