import React, { Component } from 'react';

class SchemaField extends Component {
  render() {
    const {
        label,
        controls,
        controlType,
        value,
        options,
        className
    } = this.props.form;
    switch(controlType){
        case 'formGroup':
            return (
                <div className={className}>
                    {label}
                    {controls ? 
                    (controls.map(form => <SchemaField form={form} />)) :(<div></div>)}
                </div>
            );
        case 'h1':
            return (
                <h1 className={className} >{value}</h1>
            );
        case 'span':
            return (
                <span className={className}>{value}</span>
            );
        case 'textbox':
            return (
                <React.Fragment>
                    {label? (<label>{label}</label>):""}
                    <textbox className={className}>{value}</textbox>
                </React.Fragment>
            );
        case 'dropdown':
            return (
                <React.Fragment>
                    {label? (<label>{label}</label>):""}
                    <select className={className}>
                        {options ? (options.map(option => <option value="">{option.value}</option>)):(<option value="">Selecione</option>)}
                    </select>
                </React.Fragment>
            );
        default:
            return (
                <React.Fragment>
                    {controls ? 
                    (controls.map(form => <SchemaField form={form} />)) :(<div></div>)}
                </React.Fragment>
            );
    }
  }
}
export default SchemaField;