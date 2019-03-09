import React, { Component } from 'react';
import SchemaField  from './components/SchemaField';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateFormState, updateFuncState, updateComponentState } from './actions';

class DynamicPage extends Component {
  constructor(props) {
    super(props);
    if(this.props.form)
      props.updateFormState(this.props.form);
    else
      console.warn("react-json-page: You must set a form! <DynamicPage form={formJson} />")
    if(this.props.functions)
      props.updateFuncState(this.props.functions);
    if(this.props.customComponents)
      props.updateComponentState(this.props.customComponents);
  }

  componentDidUpdate(prevProps) {
    if(this.props.form && this.props.form !== prevProps.form)
      this.props.updateFormState(this.props.form);
  }
  
  render() {
      /*Entry point... The json structure enters on the React structure from this point on.*/
    return(<SchemaField {...this.props.jsonForm}/>);
  }
}
const mapStateToProps = store => ({
  /*Redux mapping to control the props*/
  jsonForm: store.dynamicFormState.formState
});

const mapDispatchToProps = dispatch => bindActionCreators({ updateFormState, updateFuncState,updateComponentState }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DynamicPage);