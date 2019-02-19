import React,{Component} from "react";

class BaseInput extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.value);
        this.state = {inputValue: (this.props.value ? this.props.value : "")};
    }

    render() {
      if (!this.props.id) {
        console.log("No id for", this.props);
        throw new Error(`no id for props ${JSON.stringify(this.props)}`);
      }
      const {
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
        return this.props.onChange ? this.props.onChange(value) : (value) => this.setState({inputValue:value});
      };
    
      return (
        <input
          readOnly={readonly}
          disabled={disabled}
          autoFocus={autofocus}
          value={this.state.inputValue}
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
  
export default BaseInput;