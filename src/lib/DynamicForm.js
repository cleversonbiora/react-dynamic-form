import React, { Component } from 'react';
import SchemaField  from './components/SchemaField';

class DynamicForm extends Component {
  render() {
    return(<SchemaField {...this.props.form}/>);
  }
}
export default DynamicForm;