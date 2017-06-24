import React, { Component } from 'react';
import './style.css';

class Page extends Component {
  render() {
    const { children, flex, ...props } = this.props;
    return (
      <div className="form-section" style={{
        flex: flex || null
      }} {...props}>
        {children}
      </div>
    );
  }
}

export default Page;