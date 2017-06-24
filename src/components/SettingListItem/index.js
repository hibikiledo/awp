import './style.css'

import React, { Component } from 'react';

import PropTypes from 'prop-types';

SettingListItem.propTypes = {
  option: PropTypes.string,
  explanation: PropTypes.string,
  control: PropTypes.node
}

export default function SettingListItem({
  option,
  explanation,
  control
}) {
  return (
    <div className="setting-list-item">
      <div className="setting-info">
        <div className="option">{option}</div>
        <div className="explanation">{explanation}</div>
      </div>
      <div className="form-control">
        {control}
      </div>
    </div>
  )
}
