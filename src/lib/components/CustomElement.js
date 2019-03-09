import React,{Component} from "react";
import { connect } from 'react-redux';
import { execFunc } from "../helpers/functions";
import BaseForm from './BaseForm';
import Value from './Value';
import SchemaField from './SchemaField';
import {isVoidElement} from '../helpers/inputs';
import {isUpperCase} from '../helpers/values';

class CustomElement extends Component {

    render() {
        const {
            values,
            components,
            hidden,
            type,
            children,
            value,
            dispatch,
            formId,
            voidElement,
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
                            {children ? 
                            (children.map(control => <SchemaField formId={inputProps.id} key={control.id} {...control} />)) :(null)}
                        </BaseForm>
                    );
                case 'fragment':
                    return (
                        <React.Fragment>
                            <Value value={value} />
                            {children ? 
                            (children.map(control => <SchemaField formId={formId} key={control.id} {...control} />)) :(null)}
                        </React.Fragment>
                    );
                default:
                    if(type){
                        if(isUpperCase(`${type}`) && components[`${type}`]){
                            const CustomTag = components[`${type}`];
                            debugger
                            if(voidElement)
                                return (
                                    <CustomTag value={value} {...inputProps}>
                                        {children ? 
                                        (children.map((control, i) => <SchemaField formId={formId} key={i} {...control} />)) :(null)}
                                    </CustomTag>
                                );
                            else
                                return (
                                    <CustomTag {...inputProps}>
                                        <Value value={value} />
                                        {children ? 
                                        (children.map((control, i) => <SchemaField formId={formId} key={i} {...control} />)) :(null)}
                                    </CustomTag>
                                );
                        }else{
                            const CustomTag = `${type}`;
                            return (
                                <CustomTag {...inputProps}>
                                    {children ? 
                                    (children.map((control, i) => <SchemaField formId={formId} key={i} {...control} />)) :(null)}
                                </CustomTag>
                            );
                        }
                    }else{ 
                        return null
                    }
            }
    }
  }
}

  const mapStateToProps = (store) => ({
    values: store.dynamicFormState.valueState,
    components:store.dynamicFormState.componentState
  });
  export default connect(mapStateToProps)(CustomElement);