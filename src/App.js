import React, { Component } from 'react';
import './App.css';
import formJson from './assets/form2.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState } from './actions';
import SchemaField from './components/SchemaField.js'

class App extends Component {

  constructor(props) {
    super(props);
    props.updateState(formJson);
  }
  render() {
    return (
      <div className="App">
           {this.props.form.label}
          {this.props.form.controls ? 
            (this.props.form.controls.map(form => <SchemaField form={form} />)) :(<div></div>)}
      </div>
    );
  }
}
const mapStateToProps = store => ({
  form: store.formState
});


const mapDispatchToProps = dispatch => bindActionCreators({ updateState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);