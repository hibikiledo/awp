import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {VotePageActions} from '../../../../actions'
import _ from 'lodash';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import { withRouter } from 'react-router'

function VotePage({room, match, voteForRestaurant}) {
  if (!room) {
    return null;
  }
  console.log(room);
  return (
    <div>
      {_
        .keys(room.restaurants)
        .map((key, idx) => {
          const restaurant = room.restaurants[key];
          return (
            <div key={idx} onClick={() => voteForRestaurant(match.params.id, key)}>
              <div>{restaurant.name}</div>
              <img src={restaurant.image}/>
              <div>{restaurant.votes}</div>
            </div>
          )
        })}
    </div>
  )
}

export default withRouter(connect(
  ({room}) => ({room}),
  (dispatch) => bindActionCreators(VotePageActions, dispatch)
)(VotePage))
