import React,{Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changeFormValue } from '../actions';

class BaseForm extends Component {
    render() {
        const {
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
                fetch(action,{
                                method: method || 'GET',
                                headers: headers, 
                                body: (`${method}`.toUpperCase() === 'GET' ? null : JSON.stringify(values))
                            })
                .then(response => response.json())
                .then(data => {
                    alert("Enviado");
                });
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
    values: store.dynamicFormState.valueState
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({ changeFormValue }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(BaseForm);