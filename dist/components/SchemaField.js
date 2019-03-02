var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import BaseInput from './BaseInput';
import CustomElement from './CustomElement';
import { isControlledComponent } from '../helpers/inputs';

class SchemaField extends Component {
    render() {
        const _props = this.props,
              {
            type,
            children,
            value
        } = _props,
              inputProps = _objectWithoutProperties(_props, ['type', 'children', 'value']);
        if (isControlledComponent(type)) {
            return React.createElement(BaseInput, _extends({ type: type, value: value }, inputProps));
        } else {
            return React.createElement(CustomElement, _extends({ type: type, value: value, children: children }, inputProps));
        }
    }
}
export default SchemaField;