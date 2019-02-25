import React, { Component } from "react";
import { connect } from 'react-redux';
import { getVariables } from '../helpers/values';

class BaseInput extends Component {
    render() {
        const {
            values,
            validations,
            value
        } = this.props;

        var result = `${value}`;
        var variables = getVariables(value);
        variables.forEach(match => {
            if (values[match]) result = result.replace('{' + match + '}', values[match]);else if (validations[match]) result = result.replace('{' + match + '}', validations[match]);else result = result.replace('{' + match + '}', "");
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