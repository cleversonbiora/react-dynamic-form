import React,{Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeFormValue } from '../actions';

class BaseForm extends Component {
    constructor(props) {
        super(props);
        if(this.props.onSubmitFunc)
           this._onSubmit = this.props.functions[this.props.onSubmitFunc].bind();
        if(this.props.onResult)
            this._onResult = this.props.functions[this.props.onResult].bind();
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
        const {
            onSubmitFunc,
            values,
            async,
            ...inputProps
        } = this.props;
        if(async){
            const {
                method,
                action,
                headers,
                ...inputPropsAsync
            } = this.props;
            
            const _onSubmit = (event) => {
                event.preventDefault();
                if(onSubmitFunc){
                    this._onSubmit(values);
                }else{
                    fetch(action,{
                                    method: method || 'GET',
                                    headers: headers, 
                                    body: (`${method}`.toUpperCase() === 'GET' ? null : JSON.stringify(values))
                                })
                    .then(response => response.json())
                    .then(data => {
                        (this._onResult ? this._onResult(data) : alert("Enviado"))
                    });
                }
                return;
            };
            return (
                <form
                    onSubmit={_onSubmit}
                    {...inputPropsAsync}>
                </form>
            );
        }
        return (
            <form {...inputProps}>
            </form>
        );
    }
}
BaseForm.defaultProps = {
    method: "GET",
    async: false
  };

  const mapStateToProps = (store) => ({
    values: store.dynamicFormState.valueState,
    functions: store.dynamicFormState.funcState
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({ changeFormValue }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(BaseForm);