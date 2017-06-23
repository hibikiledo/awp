import './style.css';

import React, { Component } from 'react';

import PropTypes from 'prop-types';

StatusBar.propTypes = {
  states: PropTypes.arrayOf(PropTypes.string),
  currentState: PropTypes.string,
  remainingTime: PropTypes.string,
}

export default function StatusBar({
  states,
  currentState,
  remainingTime
}) {
  return (
    <div className="status-bar">
      <div className="indicators">
        {states.map((state) => (
          <span className={`indicator ${state === currentState ? 'active': ''}`} />
        ))}
      </div>
      <div className="info">
        <div className="state-name">{currentState}</div>
        <div className="time-remaining">{remainingTime}</div>
      </div>
    </div>
  )
}
