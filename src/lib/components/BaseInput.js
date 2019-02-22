import React,{Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFormValue, changeFormValue } from '../actions';

class BaseInput extends Component {
    constructor(props) {
        super(props);
        var payload = {key:this.props.id, value:(this.props.value ? this.props.value : "")};
        props.addFormValue(payload);
        this.state = {
          optionsList: this.props.options,
      };
    }
    componentDidMount() {
      if(this.props.load){
        const {
          apiUrl,
          method,
          headers,
          valueField,
          labelField,
          root
        } = this.props.load
        fetch(apiUrl,{method: method || 'GET',headers: headers})
        .then(response => response.json())
        .then(data => {
          (root ? data[root] : data).map((item) => {
            this.setState({optionsList: [...this.state.optionsList, {value: item[valueField], label: item[labelField]}]});
          });
        });
      }
    }
    render() {
      if (!this.props.id) {
        console.log("No id for", this.props);
        throw new Error(`no id for props ${JSON.stringify(this.props)}`);
      }
      const {
        values,
        functions,
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
        className,
        ...inputProps
      } = this.props;
      inputProps.type = inputProps.type || "text";
      const _onChange = ({ target: { value } }) => {
        return this.props.changeFormValue({key:this.props.id, value:value});
      };
      if(onFocus)
        functions[onFocus]();
      const _onBlur = (onBlur ? () => {
                                      return functions[onBlur]();
                                    } 
                              : null);
      const _onFocus = (onFocus ? () => {
                                        return functions[onBlur]();
                                      } 
                                : null);

      switch(inputProps.type){
        case 'select':
        case 'datalist':
        case 'textarea':
          const CustomInput = `${inputProps.type}`;
          const {
            type,
            ...inputPropsWithoutType
          } = inputProps;
          return (
              <CustomInput 
                  readOnly={readonly}
                  disabled={disabled}
                  autoFocus={autofocus}
                  value={values[inputProps.id]}
                  onChange={_onChange}
                  onBlur={_onBlur}
                  onFocus={_onFocus}
                  {...inputPropsWithoutType}>
                      {this.state.optionsList ? (this.state.optionsList.map(option => <option key={option.value} value={option.value} selected={option.selected}>{option.label ? option.label : option.value}</option>)):(<option value="">Selecione</option>)}
              </CustomInput>
          );
        default:
          return (
            <input
              readOnly={readonly}
              disabled={disabled}
              autoFocus={autofocus}
              value={values[inputProps.id]}
              {...inputProps}
              onChange={_onChange}
              onBlur={_onBlur}
              onFocus={_onFocus}
            />
          );
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

  const mapStateToProps = (store) => ({
    values: store.dynamicFormState.valueState,
    functions: store.dynamicFormState.funcState
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({ addFormValue,changeFormValue }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(BaseInput);
