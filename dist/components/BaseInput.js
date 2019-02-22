var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFormValue, changeFormValue } from '../actions';

class BaseInput extends Component {
  constructor(props) {
    super(props);
    var payload = { key: this.props.id, value: this.props.value ? this.props.value : "" };
    props.addFormValue(payload);
    this.state = {
      optionsList: this.props.options
    };
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
          inputProps = _objectWithoutProperties(_props, ['values', 'value', 'readonly', 'disabled', 'autofocus', 'onBlur', 'onFocus', 'onChange', 'options', 'schema', 'formContext', 'registry', 'rawErrors', 'className']);
    inputProps.type = inputProps.type || "text";
    const _onChange = ({ target: { value } }) => {
      return this.props.changeFormValue({ key: this.props.id, value: value });
    };
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
            onBlur: onBlur && (event => onBlur(inputProps.id, event.target.value)),
            onFocus: onFocus && (event => onFocus(inputProps.id, event.target.value))
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
          onBlur: onBlur && (event => onBlur(inputProps.id, event.target.value)),
          onFocus: onFocus && (event => onFocus(inputProps.id, event.target.value))
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
  values: store.dynamicFormState.valueState
});

const mapDispatchToProps = dispatch => bindActionCreators({ addFormValue, changeFormValue }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BaseInput);