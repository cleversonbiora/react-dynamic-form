var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeFormValue, addForm, changeValidationValue } from '../actions';
import { getValidation } from "../helpers/validators";

class BaseForm extends Component {
    constructor(props) {
        super(props);
        props.addForm(props.id);
        if (this.props.onSubmitFunc) this._onSubmit = this.props.functions[this.props.onSubmitFunc].bind();
        if (this.props.onResult) this._onResult = this.props.functions[this.props.onResult].bind();
        if (this.props.onError) this._onError = this.props.functions[this.props.onError].bind();
    }

    render() {
        const _props = this.props,
              {
            functions,
            validations,
            validators,
            onResult,
            onError,
            onSubmitFunc,
            changeFormValue,
            changeValidationValue,
            values,
            addForm,
            async
        } = _props,
              inputProps = _objectWithoutProperties(_props, ['functions', 'validations', 'validators', 'onResult', 'onError', 'onSubmitFunc', 'changeFormValue', 'changeValidationValue', 'values', 'addForm', 'async']);
        if (async) {
            const {
                method,
                action,
                headers
            } = inputProps,
                  inputPropsAsync = _objectWithoutProperties(inputProps, ['method', 'action', 'headers']);
            const _onSubmit = event => {
                event.preventDefault();
                if (validators) {
                    var promises = Object.keys(validators[inputProps.id]).map(function (e) {
                        return getValidation(validators[inputProps.id][e], values[inputProps.id][e], values[inputProps.id]);
                    });
                    Promise.all(promises).then(data => {
                        return data.map(([output, valid, value]) => {
                            changeValidationValue({ key: output, valid: valid, value: value });
                            return { key: output, valid: valid, value: value };
                        });
                    }).then(newValidations => {
                        if (newValidations) {
                            var invalid = newValidations.some(item => item.valid === false);
                            if (invalid) {
                                if (this.props.onError) this._onError();else console.log('Invalid');
                            }
                        }
                        if (onSubmitFunc) {
                            this._onSubmit(values[inputProps.id]);
                        } else {
                            fetch(action, {
                                method: method || 'GET',
                                headers: headers,
                                body: `${method}`.toUpperCase() === 'GET' ? null : JSON.stringify(values[inputProps.id])
                            }).then(response => response.json()).then(data => {
                                this._onResult ? this._onResult(data) : alert("Enviado");
                            });
                        }
                    });
                }
                return;
            };
            return React.createElement('form', _extends({
                onSubmit: _onSubmit
            }, inputPropsAsync));
        }
        const _onSubmit = async event => {
            event.preventDefault();
            let result = true;
            if (validators) {
                var promises = Object.keys(validators[inputProps.id]).map(function (e) {
                    return getValidation(validators[inputProps.id][e], values[inputProps.id][e], values[inputProps.id]);
                });
                result = await Promise.all(promises).then(data => {
                    return data.map(([output, valid, value]) => {
                        changeValidationValue({ key: output, valid: valid, value: value });
                        return { key: output, valid: valid, value: value };
                    });
                }).then(newValidations => {
                    if (newValidations) {
                        var invalid = newValidations.some(item => item.valid === false);
                        if (invalid) {
                            if (this.props.onError) this._onError();else console.log('Invalid');
                            return false;
                        }
                    }
                    return true;
                });
            }
            if (result) document.querySelector('#' + inputProps.id).submit();
            return result;
        };
        return React.createElement('form', _extends({ onSubmit: _onSubmit.bind(this)
        }, inputProps));
    }
}
BaseForm.defaultProps = {
    method: "GET",
    async: false
};

const mapStateToProps = store => ({
    values: store.dynamicFormState.valueState,
    functions: store.dynamicFormState.funcState,
    validations: store.dynamicFormState.validationState,
    validators: store.dynamicFormState.validatorState
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeFormValue, addForm, changeValidationValue }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BaseForm);