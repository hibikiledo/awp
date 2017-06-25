import './style.css';

import React from 'react';
import logo from './images/logo.png';
import logo2x from './images/logo@2x.png'

const AppLogo = (props) => (
    <div className="app-logo" {...props}>
        <img src={logo} srcSet={`${logo2x} 2x`} className="image" alt="We Eat Logo" />
    </div>
);

export default AppLogo;
