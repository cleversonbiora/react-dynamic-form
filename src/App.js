import React, { Component } from 'react';
import './App.css';
import formJson from './assets/form3.json';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateState} from './actions';
import DynamicForm from './lib/DynamicForm'

class App extends Component {

  constructor(props) {
    super(props);
    props.updateState(formJson);
  }
  render() {
    console.log(this.props.teste);
    return (
      <div className="App">
        <DynamicForm form={this.props.form}/>
      </div>
    );
  }
}
const mapStateToProps = store => ({
  form: store.formState
});


const mapDispatchToProps = dispatch => bindActionCreators({ updateState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);