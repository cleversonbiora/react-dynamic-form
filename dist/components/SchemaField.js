var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from 'react';
import BaseInput from './BaseInput';
import BaseForm from './BaseForm';
import Value from './Value';

class SchemaField extends Component {
    isControlledComponent(type) {
        switch (type) {
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
    isVoidElement(type) {
        switch (type) {
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
        const _props = this.props,
              {
            type,
            controls,
            value
        } = _props,
              inputProps = _objectWithoutProperties(_props, ['type', 'controls', 'value']);
        if (this.isControlledComponent(type)) {
            return React.createElement(BaseInput, _extends({ type: type, value: value }, inputProps));
        } else if (this.isVoidElement(type)) {
            const CustomTag = `${type}`;
            return React.createElement(CustomTag, inputProps);
        } else {
            switch (type) {
                case 'form':
                    return React.createElement(
                        BaseForm,
                        inputProps,
                        controls ? controls.map(control => React.createElement(SchemaField, _extends({ key: control.id }, control))) : null
                    );
                case 'fragment':
                    return React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(Value, { value: value }),
                        controls ? controls.map(control => React.createElement(SchemaField, _extends({ key: control.id }, control))) : null
                    );
                default:
                    if (type) {
                        const CustomTag = `${type}`;
                        return React.createElement(
                            CustomTag,
                            inputProps,
                            React.createElement(Value, { value: value }),
                            controls ? controls.map((control, i) => React.createElement(SchemaField, _extends({ key: i }, control))) : null
                        );
                    } else {
                        return null;
                    }
            }
        }
    }
}
export default SchemaField;