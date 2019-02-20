import React, { Component } from 'react';
import BaseInput from './BaseInput';
import Value from './Value';

class SchemaField extends Component {
  isControlledComponent(type){
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
        case 'select':
        case 'datalist':
        case 'textarea':
            return true;
        default:
            return false;
    }
  }
  isVoidElement(type){
      switch(type){
        case 'area':
        case 'base':
        case 'br':
        case 'col':
        case 'embed':
        case 'hr':
        case 'img':
        case 'input':
        case 'keygen':
        case 'link':
        case 'menuitem':
        case 'meta':
        case 'param':
        case 'source':
        case 'track':
        case 'wbr':
            return true;
        default:
            return false;
      }
  }
  render() {
    const {
        type,
        controls,
        value,
        ...inputProps
    } = this.props;
    if(this.isControlledComponent(type)){
        return (
            <BaseInput type={type} value={value} {...inputProps} />
        );
    }else if(this.isVoidElement(type)){
        const CustomTag = `${type}`;
        return (
            <CustomTag {...inputProps} />
        );
    }else{
        switch(type){
            case 'fragment':
                return (
                    <React.Fragment>
                        <Value value={value} />
                        {controls ? 
                        (controls.map(control => <SchemaField key={control.id} {...control} />)) :(null)}
                    </React.Fragment>
                );
            default:
                const CustomTag = `${type}`;
                return (
                    <CustomTag {...inputProps}>
                        <Value value={value} />
                        {controls ? 
                        (controls.map(control => <SchemaField key={control.id} {...control} />)) :(null)}
                    </CustomTag>
                );
            }
    }
  }
}
export default SchemaField;