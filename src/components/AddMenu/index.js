import './style.css'

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class AddMenu extends Component {
  render() {
    const {
      onAddMenu,
      ...props
    } = this.props;

    return (
      <div className="add-menu">
        <input
          type="text"
          placeholder="Menu Name"
          className="menu-input"
          ref="menu"
          {...props}/>
        <div
          className="add-btn"
          onClick={() => {
          onAddMenu(this.refs.menu.value);
          this.refs.menu.value = null;
        }}>Add</div>
      </div>
    );
  }
}
