import React, { Component } from 'react';
import SchemaField from './components/SchemaField';

class DynamicForm extends Component {
  render() {
    return React.createElement(SchemaField, this.props.form);
  }
}
export default DynamicForm;