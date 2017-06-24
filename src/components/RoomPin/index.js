import React from 'react';
import './style.css';

const RoomPin = ({ pin }) => (
  <div className="room-pin">
    <div className="label">Room PIN</div>
    <h2 className="pin">{pin}</h2>
  </div>
)

export default RoomPin;