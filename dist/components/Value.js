import React, { Component } from "react";
import { connect } from 'react-redux';
import { getVariables, mergeValues } from '../helpers/values';

class BaseInput extends Component {
    render() {
        const {
            values,
            validations,
            value
        } = this.props;

        var result = `${value}`;
        var variables = getVariables(value);
        let mergedValues = mergeValues(values);
        variables.forEach(match => {
            if (mergedValues[match]) result = result.replace('{' + match + '}', mergedValues[match]);else if (validations[match]) result = result.replace('{' + match + '}', validations[match].value);else result = result.replace('{' + match + '}', "");
        });
        if (variables.length > 0) {
            return React.createElement(
                React.Fragment,
                null,
                result
            );
        } else {
            return React.createElement(
                React.Fragment,
                null,
                value
            );
        }
    }
}

const mapStateToProps = store => ({
    values: store.dynamicFormState.valueState,
    validations: store.dynamicFormState.validationState
});

export default connect(mapStateToProps)(BaseInput);