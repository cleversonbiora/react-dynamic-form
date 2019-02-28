import React,{Component} from "react";
import { connect } from 'react-redux';
import { execFunc } from "../helpers/functions";
import BaseForm from './BaseForm';
import Value from './Value';
import SchemaField from './SchemaField';
import {isVoidElement} from '../helpers/inputs';

class CustomElement extends Component {

    render() {
        const {
            values,
            hidden,
            type,
            controls,
            value,
            dispatch,
            formId,
            ...inputProps
        } = this.props;
        if(hidden && values){ 
            if(execFunc(hidden,values))
                return null;
        }
        if(isVoidElement(type)){
            const CustomTag = `${type}`;
            return (
                <CustomTag {...inputProps} />
            );
        }else{
            switch(type){
                case 'form':
                    return (
                        <BaseForm {...inputProps}>
                            {controls ? 
                            (controls.map(control => <SchemaField formId={inputProps.id} key={control.id} {...control} />)) :(null)}
                        </BaseForm>
                    );
                case 'fragment':
                    return (
                        <React.Fragment>
                            <Value value={value} />
                            {controls ? 
                            (controls.map(control => <SchemaField formId={formId} key={control.id} {...control} />)) :(null)}
                        </React.Fragment>
                    );
                default:
                    if(type){
                        const CustomTag = `${type}`;
                        return (
                            <CustomTag {...inputProps}>
                                <Value value={value} />
                                {controls ? 
                                (controls.map((control, i) => <SchemaField formId={formId} key={i} {...control} />)) :(null)}
                            </CustomTag>
                        );
                    }else{ 
                        return null
                    }
            }
    }
  }
}

  const mapStateToProps = (store) => ({
    values: store.dynamicFormState.valueState
  });
  export default connect(mapStateToProps)(CustomElement);