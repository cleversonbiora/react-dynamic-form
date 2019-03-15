var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { Component } from "react";
import { connect } from 'react-redux';
import { execFunc } from "../helpers/functions";
import BaseForm from './BaseForm';
import Value from './Value';
import SchemaField from './SchemaField';
import { isVoidElement } from '../helpers/inputs';
import { isUpperCase } from '../helpers/values';

class CustomElement extends Component {

    render() {
        const _props = this.props,
              {
            values,
            components,
            hidden,
            type,
            children,
            value,
            dispatch,
            formId,
            voidElement
        } = _props,
              inputProps = _objectWithoutProperties(_props, ["values", "components", "hidden", "type", "children", "value", "dispatch", "formId", "voidElement"]);
        if (hidden && values) {
            if (execFunc(hidden, values)) return null;
        }
        if (isVoidElement(type)) {
            const CustomTag = `${type}`;
            return React.createElement(CustomTag, inputProps);
        } else {
            switch (type) {
                case 'form':
                    return React.createElement(
                        BaseForm,
                        inputProps,
                        children ? children.map(control => React.createElement(SchemaField, _extends({ formId: inputProps.id, key: control.id }, control))) : null
                    );
                case 'fragment':
                    return React.createElement(
                        React.Fragment,
                        null,
                        React.createElement(Value, { value: value }),
                        children ? children.map(control => React.createElement(SchemaField, _extends({ formId: formId, key: control.id }, control))) : null
                    );
                default:
                    if (type) {
                        if (isUpperCase(`${type}`) && components[`${type}`]) {
                            const CustomTag = components[`${type}`];
                            return React.createElement(
                                CustomTag,
                                _extends({ value: value }, inputProps),
                                children ? children.map((control, i) => React.createElement(SchemaField, _extends({ formId: formId, key: i }, control))) : null
                            );
                        } else {
                            const CustomTag = `${type}`;
                            return React.createElement(
                                CustomTag,
                                inputProps,
                                React.createElement(Value, { value: value }),
                                children ? children.map((control, i) => React.createElement(SchemaField, _extends({ formId: formId, key: i }, control))) : null
                            );
                        }
                    } else {
                        return null;
                    }
            }
        }
    }
}

const mapStateToProps = store => ({
    values: store.dynamicFormState.valueState,
    components: store.dynamicFormState.componentState
});
export default connect(mapStateToProps)(CustomElement);