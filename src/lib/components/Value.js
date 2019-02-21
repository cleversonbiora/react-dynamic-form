import React,{Component} from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addValue, changeValue } from '../../actions';

class BaseInput extends Component {
    render() {
        const {
            values,
            value
        } = this.props;

        var variables = [],
        regex = /{([^}]+)}/g,
        val = `${value}`,
        result = `${value}`,
        match;

        while((match = regex.exec(val))) {
            result = result.replace('{' + match[1] + '}', values[match[1]]);
            variables.push(match[1]);
        }
        if(variables.length > 0){
            return (
                <React.Fragment>
                    {result}
                </React.Fragment>
            );
        }else{
            return (
                <React.Fragment>
                    {value}
                </React.Fragment>
            );
        }

  }
}

  const mapStateToProps = (store) => ({
    values: store.valueState
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({ addValue,changeValue }, dispatch);
  
  export default connect(mapStateToProps, mapDispatchToProps)(BaseInput);
