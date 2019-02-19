import React, { Component } from 'react';
import SchemaField  from './SchemaField';

class DynamicForm extends Component {
  render() {
    return(<SchemaField {...this.props.form}/>);
  }
}
export default DynamicForm;