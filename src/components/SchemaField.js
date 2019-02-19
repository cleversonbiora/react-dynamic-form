import React, { Component } from 'react';
import BaseInput from './BaseInput';
import { onChangeValue } from '../actions';

class SchemaField extends Component {
  render() {
    const {
        type,
        controls,
        value,
        options,
        ...inputProps
    } = this.props;
    switch(type){
        case 'button':
        case 'checkbox':
        case 'color':
        case 'date':
        case 'datetime-local':
        case 'email ':
        case 'file':
        case 'hidden':
        case 'image':
        case 'month ':
        case 'number ':
        case 'password':
        case 'radio':
        case 'range':
        case 'reset':
        case 'search':
        case 'submit':
        case 'tel':
        case 'text':
        case 'time':
        case 'url':
        case 'week':
            return (
                <BaseInput type={type} value={value} {...inputProps} />
            );
        case 'select':
        case 'datalist':
            const CustomList = `${type}`;
            return (
                <CustomList {...inputProps}>
                        {options ? (options.map(option => <option key={option.value} value={option.value}>{option.label ? option.label : option.value}</option>)):(<option value="">Selecione</option>)}
                </CustomList>
            );
        case 'fragment':
            return (
                <React.Fragment>
                    {value}
                    {controls ? 
                    (controls.map(control => <SchemaField key={control.id} {...control} />)) :(null)}
                </React.Fragment>
            );
        default:
            const CustomTag = `${type}`;
            return (
                <CustomTag {...inputProps}>
                    {value}
                    {controls ? 
                    (controls.map(control => <SchemaField key={control.id} {...control} />)) :(null)}
                </CustomTag>
            );
    }
  }
}
export default SchemaField;