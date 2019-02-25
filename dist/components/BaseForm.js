var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeFormValue } from '../actions';

class BaseForm extends Component {
    constructor(props) {
        super(props);
        if (this.props.onSubmitFunc) this._onSubmit = this.props.functions[this.props.onSubmitFunc].bind();
        if (this.props.onResult) this._onResult = this.props.functions[this.props.onResult].bind();
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
        const _props = this.props,
              {
            functions,
            onSubmitFunc,
            values,
            async
        } = _props,
              inputProps = _objectWithoutProperties(_props, ['functions', 'onSubmitFunc', 'values', 'async']);
        if (async) {
            const _props2 = this.props,
                  {
                method,
                action,
                headers
            } = _props2,
                  inputPropsAsync = _objectWithoutProperties(_props2, ['method', 'action', 'headers']);

            const _onSubmit = event => {
                event.preventDefault();
                if (onSubmitFunc) {
                    this._onSubmit(values);
                } else {
                    fetch(action, {
                        method: method || 'GET',
                        headers: headers,
                        body: `${method}`.toUpperCase() === 'GET' ? null : JSON.stringify(values)
                    }).then(response => response.json()).then(data => {
                        this._onResult ? this._onResult(data) : alert("Enviado");
                    });
                }
                return;
            };
            return React.createElement('form', _extends({
                onSubmit: _onSubmit
            }, inputPropsAsync));
        }
        return React.createElement('form', inputProps);
    }
}
BaseForm.defaultProps = {
    method: "GET",
    async: false
};

const mapStateToProps = store => ({
    values: store.dynamicFormState.valueState,
    functions: store.dynamicFormState.funcState
});

const mapDispatchToProps = dispatch => bindActionCreators({ changeFormValue }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BaseForm);