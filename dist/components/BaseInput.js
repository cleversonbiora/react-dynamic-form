var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFormValue, changeFormValue, addValidationValue, changeValidationValue } from '../actions';
import { execFunc } from "../helpers/functions";
import { getValidation } from "../helpers/validators";

class BaseInput extends Component {
  constructor(props) {
    super(props);
    var payload = { key: this.props.id, value: this.props.value ? this.props.value : "" };
    props.addFormValue(payload);
    if (this.props.validation) {
      var payloadVal = { key: this.props.validation.output, value: "" };
      props.addValidationValue(payloadVal);
    }
    this.state = {
      optionsList: this.props.options,
      value: this.props.value
    };
    if (this.props.onFocus) this._onFocus = this.props.functions[this.props.onFocus].bind();
    if (this.props.onBlur) this._onBlur = this.props.functions[this.props.onBlur].bind();
    if (this.props.validation) {
      this._onBlur = () => {
        if (!getValidation(this.props.validation, this.state.value)) {
          this.props.changeValidationValue({ key: this.props.validation.output, value: this.props.validation.msg });
        } else {
          this.props.changeValidationValue({ key: this.props.validation.output, value: "" });
        }
      };
    }
  }
  componentDidMount() {
    if (this.props.load) {
      const {
        apiUrl,
        method,
        headers,
        valueField,
        labelField,
        root
      } = this.props.load;
      fetch(apiUrl, { method: method || 'GET', headers: headers }).then(response => response.json()).then(data => {
        // eslint-disable-next-line
        (root ? data[root] : data).map(item => {
          this.setState({ optionsList: [...this.state.optionsList, { value: item[valueField], label: item[labelField] }] });
        });
      });
    }
  }
  render() {
    if (!this.props.id) {
      console.log("No id for", this.props);
      throw new Error(`no id for props ${JSON.stringify(this.props)}`);
    }
    const _props = this.props,
          {
      values,
      hidden,
      functions,
      value,
      readonly,
      disabled,
      autofocus,
      onBlur,
      onFocus,
      onChange,
      options,
      schema,
      formContext,
      registry,
      rawErrors,
      className
    } = _props,
          inputProps = _objectWithoutProperties(_props, ['values', 'hidden', 'functions', 'value', 'readonly', 'disabled', 'autofocus', 'onBlur', 'onFocus', 'onChange', 'options', 'schema', 'formContext', 'registry', 'rawErrors', 'className']);
    inputProps.type = inputProps.type || "text";
    const _onChange = ({ target: { value } }) => {
      this.setState({ value: value });
      return this.props.changeFormValue({ key: this.props.id, value: value });
    };

    if (hidden && values) {
      if (execFunc(hidden, values)) return null;
    }

    switch (inputProps.type) {
      case 'select':
      case 'datalist':
      case 'textarea':
        const CustomInput = `${inputProps.type}`;
        const {
          type
        } = inputProps,
              inputPropsWithoutType = _objectWithoutProperties(inputProps, ['type']);
        return React.createElement(
          CustomInput,
          _extends({
            readOnly: readonly,
            disabled: disabled,
            autoFocus: autofocus,
            value: values[inputProps.id],
            onChange: _onChange,
            onBlur: this._onBlur,
            onFocus: this._onFocus
          }, inputPropsWithoutType),
          this.state.optionsList ? this.state.optionsList.map(option => React.createElement(
            'option',
            { key: option.value, value: option.value, selected: option.selected },
            option.label ? option.label : option.value
          )) : React.createElement(
            'option',
            { value: '' },
            'Selecione'
          )
        );
      default:
        return React.createElement('input', _extends({
          readOnly: readonly,
          disabled: disabled,
          autoFocus: autofocus,
          value: values[inputProps.id]
        }, inputProps, {
          onChange: _onChange,
          onBlur: this._onBlur,
          onFocus: this._onFocus
        }));
    }
  }
}
BaseInput.defaultProps = {
  type: "text",
  required: false,
  disabled: false,
  readonly: false,
  autofocus: false
};

const mapStateToProps = store => ({
  values: store.dynamicFormState.valueState,
  functions: store.dynamicFormState.funcState
});

const mapDispatchToProps = dispatch => bindActionCreators({ addFormValue, changeFormValue, addValidationValue, changeValidationValue }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BaseInput);