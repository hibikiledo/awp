import './style.css';
import React from 'react';
import NumericInput from '../NumericInput';

const BorderedNumericInput = (props) => (
  <div className="bordered-box">
    <NumericInput {...props} />
  </div>
);

export default BorderedNumericInput;