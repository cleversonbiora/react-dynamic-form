import React, { Component } from 'react';
import SchemaField from './components/SchemaField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateFormState } from './actions';

class DynamicForm extends Component {
  constructor(props) {
    super(props);
    props.updateFormState(this.props.form);
  }

  render() {
    return React.createElement(SchemaField, this.props.jsonForm);
  }
}
const mapStateToProps = store => ({
  jsonForm: store.dynamicFormState.formState
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateFormState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DynamicForm);