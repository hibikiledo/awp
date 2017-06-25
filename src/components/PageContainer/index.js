import React, { Component } from 'react';
import './style.css';

class Page extends Component {
  render() {
    const { top, center, children, ...props} = this.props;

    return (
      <div className="page-container" style={{
        top: top || null,
        justifyContent: center === false ? 'flex-start' : null
      }}>
        {children}
      </div>
    );
  }
}

export default Page;