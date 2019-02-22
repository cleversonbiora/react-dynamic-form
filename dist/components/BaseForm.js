var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addValue, changeValue } from '../../actions';

class BaseForm extends Component {
    render() {
        const _props = this.props,
              {
            values,
            async
        } = _props,
              inputProps = _objectWithoutProperties(_props, ['values', 'async']);
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
                fetch(action, {
                    method: method || 'GET',
                    headers: headers,
                    body: `${method}`.toUpperCase() == 'GET' ? null : JSON.stringify(values)
                }).then(response => response.json()).then(data => {
                    alert("Enviado");
                });
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
    values: store.valueState
});

const mapDispatchToProps = dispatch => bindActionCreators({ addValue, changeValue }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BaseForm);