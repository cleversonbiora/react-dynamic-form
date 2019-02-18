import React, { Component } from 'react';

class Item extends Component {
  render() {
    return (
      <div className="row">
          {this.props.form.label}
          {this.props.form.controls ? 
            (this.props.form.controls.map(form => <Item form={form} />)) :(<div></div>)}
      </div>
    );
  }
}
export default Item;