import React from 'react';
import logo from './images/logo.jpg';
import './style.css';

const AppLogo = (props) => (
    <div className="app-logo" {...props}>
        <img src={logo} className="image" />
    </div>
);

export default AppLogo;