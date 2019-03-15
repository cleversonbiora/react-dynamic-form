import React,{Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFormValue, changeFormValue, addValidationValue, changeValidationValue,addValidator } from '../actions';
import { execFunc } from "../helpers/functions";
import { getValidation } from "../helpers/validators";
import {getVariables,getFormValue} from '../helpers/values';

class BaseInput extends Component {
    constructor(props) {
        super(props);
        props.addFormValue({form: props.formId, key:props.id, value:(props.value ? props.value : "")});
        if(this.props.validation){
          props.addValidationValue({key: props.validation.output, valid: true, value:""});
          props.addValidator({ form: props.formId, key: props.id, value: props.validation});
        }
        this.state = {
          optionsList: props.options,
          value: props.value
        };
        if(this.props.onFocus && props.functions[props.onFocus])
          this._onFocus = props.functions[props.onFocus].bind();
        if(this.props.onBlur && props.functions[props.onBlur])
          this.onBlurFunc = props.functions[props.onBlur].bind();
        if(this.props.onChange && props.functions[props.onChange])
          this.onChangeFunc = props.functions[props.onChange].bind();
        this._onBlur = () => {
          if(this.props.onBlur)
            this.onBlurFunc();
          if(this.props.validation){
              getValidation(this.props.validation,this.state.value, this.props.values[this.props.formId])
                .then(([output, valid, value]) => {
                    this.props.changeValidationValue({key:output, valid: valid, value:value});
                  });
          }
        };
    }
    componentDidUpdate(prevProps) {
      if (this.props.load && getFormValue(this.props.formId, this.props.id, this.props.values) !== getFormValue(prevProps.formId, prevProps.id, prevProps.values) ) {
        if(getFormValue(this.props.formId, this.props.id, this.props.values) || this.props.load.emptyLoad){
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
            if(getFormValue(this.props.formId, match, this.props.values))
              apiUrlVariabel = apiUrlVariabel.replace('{' + match + '}', getFormValue(this.props.formId, match, this.props.values));
            else
              apiUrlVariabel = apiUrlVariabel.replace('{' + match + '}',"");
        });
        var bodyVariable;
        if(body){
          bodyVariable = `${body}`;
          var vars = getVariables(body);
          vars.forEach(match => {
            if(getFormValue(this.props.formId, match, this.props.values))
              bodyVariable = bodyVariable.replace('{' + match + '}', getFormValue(this.props.formId, match, this.props.values));
            else
              bodyVariable = bodyVariable.replace('{' + match + '}',"");
        });
        }else{
          bodyVariable = null;
        }
        fetch(apiUrlVariabel, { method: method || 'GET', headers: headers, body: bodyVariable })
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
        validation,
        load,
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
        addFormValue,
        addValidationValue,
        changeFormValue,
        changeValidationValue,
        addValidator,
        formId,
        ...inputProps
      } = this.props;
      inputProps.type = inputProps.type || "text";
      const _onChange = ({ target: { value } }) => {
        if(onChange)
          this.onChangeFunc(value);
        this.setState({value: value});
        return changeFormValue({key:this.props.id, value:value});
      };
      
      if(hidden && values){ 
        if(execFunc(hidden,values))
            return null;
      }
      
      let val = getFormValue(formId, inputProps.id, values);
      switch(inputProps.type){
        case 'button':
          return (
            <button type="button" {...inputProps} >
                <Value value={value} />
                {children ? 
                (children.map(control => <SchemaField formId={formId} key={control.id} {...control} />)) :(null)}
            </button>
          );
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
          if(inputProps.type === "inputButton")
              inputProps.type = "button"
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
  
  const mapDispatchToProps = dispatch => bindActionCreators({ addFormValue,changeFormValue,addValidationValue, changeValidationValue,addValidator}, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(BaseInput);
