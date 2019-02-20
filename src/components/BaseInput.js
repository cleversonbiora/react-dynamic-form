import React,{Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addValue } from '../actions';

class BaseInput extends Component {
    constructor(props) {
        super(props);
        var payload = {key:this.props.id, value:(this.props.value ? this.props.value : "")};
        props.addValue(payload);
    }

    render() {
      console.log(this.props.values);
      if (!this.props.id) {
        console.log("No id for", this.props);
        throw new Error(`no id for props ${JSON.stringify(this.props)}`);
      }
      const {
        inputValue,
        value,
        readonly,
        disabled,
        autofocus,
        onBlur,
        onFocus,
        options,
        schema,
        formContext,
        registry,
        rawErrors,
        className,
        ...inputProps
      } = this.props;
      inputProps.type = inputProps.type || "text";
      const _onChange = ({ target: { value } }) => {
        return this.props.onChange ? this.props.onChange(value) : (value) => this.props.addValue({key:this.props.id, value:value});
      };
    
      return (
        <input
          readOnly={readonly}
          disabled={disabled}
          autoFocus={autofocus}
          value={inputValue}
          {...inputProps}
          onChange={_onChange}
          onBlur={onBlur && (event => onBlur(inputProps.id, event.target.value))}
          onFocus={onFocus && (event => onFocus(inputProps.id, event.target.value))}
        />
      );
  }
}
BaseInput.defaultProps = {
    type: "text",
    required: false,
    disabled: false,
    readonly: false,
    autofocus: false
  };

  const mapStateToProps = (store,ownProps) => ({
    inputValue: store.valueState[ownProps.id]
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({ addValue }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(BaseInput);
