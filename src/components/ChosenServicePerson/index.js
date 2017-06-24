import './style.css';

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux'

const ChosenServicePerson = ({person}) => (
    <div className="chosen-person">
        <div className="person-name">{person}</div>
        <div className="description">&ensp;has been chosen to service</div>
    </div>
);

export default connect(
    ({ serviceUser }) => ({ person: serviceUser })
)(ChosenServicePerson);
