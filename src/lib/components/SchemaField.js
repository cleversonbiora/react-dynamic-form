import React, { Component } from 'react';
import BaseInput from './BaseInput';
import CustomElement from './CustomElement';
import {isControlledComponent} from '../helpers/inputs';

class SchemaField extends Component {
  render() {
    const {
        type,
        controls,
        value,
        ...inputProps
    } = this.props;
    if(isControlledComponent(type)){
        return (
            <BaseInput type={type} value={value} {...inputProps} />
        );
    }else{
        return (
            <CustomElement type={type} value={value} controls={controls} {...inputProps}></CustomElement>
        );
    }
  }
}
export default SchemaField;
