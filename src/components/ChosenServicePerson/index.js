import React from 'react';
import './style.css';

const ChosenServicePerson = ({person}) => (
    <div className="chosen-person">
        <div className="person-name">{person}</div>
        <div className="description">&ensp;has been chosen to service</div>
    </div>
);

export default ChosenServicePerson;