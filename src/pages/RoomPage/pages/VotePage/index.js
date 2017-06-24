import React, {Component} from 'react';

import PropTypes from 'prop-types';
import {VotePageActions} from '../../../../actions'
import _ from 'lodash';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';
import { withRouter } from 'react-router'

function VotePage({me, room, match, voteForRestaurant}) {
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
          const allVotes = _.values(restaurant.votes).reduce((result, v) => result + v, 0)
          return (
            <div key={idx} onClick={() => voteForRestaurant(me, match.params.id, key)}>
              <div>{restaurant.name}</div>
              <img src={restaurant.image}/>
              <div>{allVotes}</div>
            </div>
          )
        })}
    </div>
  )
}

export default withRouter(connect(
  ({room,me}) => ({room,me}),
  (dispatch) => bindActionCreators(VotePageActions, dispatch)
)(VotePage))
