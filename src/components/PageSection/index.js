import React, { Component } from 'react';
import './style.css';

class Page extends Component {
  render() {
    const { children, flex, ...props } = this.props;
    return (
      <div className="page-section" style={{
        flex: flex || null
      }} {...props}>
        {children}
      </div>
    );
  }
}

export default Page;