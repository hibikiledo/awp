import React, { Component } from 'react';
import './style.css';

class Page extends Component {
  render() {
    const { children, flex, padding, scroll, ...props } = this.props;
    return (
      <div className="page-section" style={{
        flex: flex || null,
        padding: padding === false ? '0' : null,
        overflowY: scroll ? 'auto' : null
      }} {...props}>
        {children}
      </div>
    );
  }
}

export default Page;