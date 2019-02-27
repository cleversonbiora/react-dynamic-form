import React,{Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFormValue, changeFormValue, addValidationValue, changeValidationValue } from '../actions';
import { execFunc } from "../helpers/functions";
import { getValidation } from "../helpers/validators";
import {getVariables} from '../helpers/values';

class BaseInput extends Component {
    constructor(props) {
        super(props);
        var payload = {key:this.props.id, value:(this.props.value ? this.props.value : "")};
        props.addFormValue(payload);
        if(this.props.validation){
          var payloadVal = {key:this.props.validation.output, valid: true, value:""};
          props.addValidationValue(payloadVal);
        }
        this.state = {
          optionsList: this.props.options,
          value: this.props.value
        };
        if(this.props.onFocus)
          this._onFocus = this.props.functions[this.props.onFocus].bind();
        if(this.props.onBlur)
          this._onBlur = this.props.functions[this.props.onBlur].bind();
        if(this.props.validation){
          this._onBlur = () => {
            const [valid, value] = getValidation(this.props.validation,this.state.value, this.props.values);
            this.props.changeValidationValue({key:this.props.validation.output, valid: valid, value:value});
          };
        }
    }
    componentDidUpdate(prevProps) {
      if (this.props.load && this.props.values[this.props.load.trigger] !== prevProps.values[prevProps.load.trigger]) {
        if(this.props.values[this.props.load.trigger] || this.props.load.emptyLoad){
          this.loadOptions();
        }else{
          this.unloadOptions();
        }
      }
    }
    componentDidMount() {
      if (this.props.load && (!this.props.load.trigger || this.props.load.emptyLoad)) {
        this.loadOptions();
      }
    }
    loadOptions() {
        const { apiUrl, method, headers, valueField, labelField, root, body } = this.props.load;
        var apiUrlVariabel = `${apiUrl}`;
        var variables = getVariables(apiUrl);
        variables.forEach(match => {
            if(this.props.values[match])
              apiUrlVariabel = apiUrlVariabel.replace('{' + match + '}', this.props.values[match]);
            else
              apiUrlVariabel = apiUrlVariabel.replace('{' + match + '}',"");
        });
        fetch(apiUrlVariabel, { method: method || 'GET', headers: headers, body: body || null })
          .then(response => response.json())
          .then(data => {
            if(!data)
              return;
            if (this.props.load.override) {
              // eslint-disable-next-line
              root ? this.setState({
              optionsList: data[root].map((item) => {
                return { value: item[valueField], label: item[labelField] };
              })
              })
                : this.setState({
                optionsList: data.map((item) => {
                  return { value: item[valueField], label: item[labelField] };
                })
                });
            }
            else {
              this.setState({ optionsList: this.props.options});
              // eslint-disable-next-line
              (root ? data[root] : data).map((item) => {
                this.setState({ optionsList: [...this.state.optionsList, { value: item[valueField], label: item[labelField] }] });
              });
            }
          });
    }

    unloadOptions() {
      this.setState({ optionsList: this.props.options});
    }

    render() {
      if (!this.props.id) {
        console.log("No id for", this.props);
        throw new Error(`no id for props ${JSON.stringify(this.props)}`);
      }
      const {
        values,
        hidden,
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
        addFormValue,
        addValidationValue,
        changeFormValue,
        changeValidationValue,
        ...inputProps
      } = this.props;
      inputProps.type = inputProps.type || "text";
      const _onChange = ({ target: { value } }) => {
        this.setState({value: value});
        return changeFormValue({key:this.props.id, value:value});
      };
      
      if(hidden && values){ 
        if(execFunc(hidden,values))
            return null;
      }
      
      let val = values[inputProps.id];
      if(!val)
        val = "";
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
                  value={val}
                  onChange={_onChange}
                  onBlur={this._onBlur}
                  onFocus={this._onFocus}
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
              value={val}
              {...inputProps}
              onChange={_onChange}
              onBlur={this._onBlur}
              onFocus={this._onFocus}
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
  
  const mapDispatchToProps = dispatch => bindActionCreators({ addFormValue,changeFormValue,addValidationValue, changeValidationValue}, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(BaseInput);
