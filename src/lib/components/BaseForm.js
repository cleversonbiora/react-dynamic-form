import React,{Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeFormValue, addForm } from '../actions';

class BaseForm extends Component {
    constructor(props) {
        super(props);
        props.addForm(props.id);
        if(this.props.onSubmitFunc)
           this._onSubmit = this.props.functions[this.props.onSubmitFunc].bind();
        if(this.props.onResult)
            this._onResult = this.props.functions[this.props.onResult].bind();
    }
    
    render() {
        const {
            functions,
            validations,
            onResult,
            onSubmitFunc,
            changeFormValue,
            values,
            addForm,
            async,
            ...inputProps
        } = this.props;
        if(async){
            const {
                method,
                action,
                headers,
                ...inputPropsAsync
            } = inputProps;
            const _onSubmit = (event) => {
                event.preventDefault();
                if(validations){
                    var vldts = Object.keys(validations).map(function(e) { return validations[e] })
                    var invalid = vldts.some((item) => item.valid === false);
                    if(invalid){
                        alert('Invalid');
                        return;
                    }
                }
                if(onSubmitFunc){
                    this._onSubmit(values[inputProps.id]);
                }else{
                    fetch(action,{
                                    method: method || 'GET',
                                    headers: headers, 
                                    body: (`${method}`.toUpperCase() === 'GET' ? null : JSON.stringify(values[inputProps.id]))
                                })
                    .then(response => response.json())
                    .then(data => {
                        (this._onResult ? this._onResult(data) : alert("Enviado"))
                    });
                }
                return;
            };
            return (
                <form
                    onSubmit={_onSubmit}
                    {...inputPropsAsync}>
                </form>
            );
        }
        const _onSubmit = (event) => {
            if(validations){
                var vldts = Object.keys(validations).map(function(e) { return validations[e] })
                var invalid = vldts.some((item) => item.valid === false);
                if(invalid){
                    event.preventDefault();
                    alert('Invalid');
                    return false;
                }
            }
            return true;
        }
        return (
            <form onSubmit={_onSubmit} 
                  {...inputProps}>
            </form>
        );
    }
}
BaseForm.defaultProps = {
    method: "GET",
    async: false
  };

  const mapStateToProps = (store) => ({
    values: store.dynamicFormState.valueState,
    functions: store.dynamicFormState.funcState,
    validations: store.dynamicFormState.validationState
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({ changeFormValue, addForm }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(BaseForm);