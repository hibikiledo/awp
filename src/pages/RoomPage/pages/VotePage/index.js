import React, {Component} from 'react';

import PropTypes from 'prop-types';
import RestaurantWithVoters from '../../../../components/RestaurantWithVoters'
import {VotePageActions} from '../../../../actions'
import _ from 'lodash';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

function VotePage({me, room, match, voteForRestaurant}) {
  if (!room) {
    return null;
  }

  const allVotesAmoungRestaurants = _.values(room.restaurants)
    .map(restaurant => _.values(restaurant.votes).reduce(_.add, 0))
    .reduce(_.add, 0)

  return (
    <div>
      {_
        .keys(room.restaurants)
        .map((key, idx) => {
          const restaurant = room.restaurants[key];
          const thisRestaurantVotes = _
            .values(restaurant.votes)
            .reduce((result, v) => result + v, 0)
          const computedPercentage = allVotesAmoungRestaurants === 0
            ? 0
            : (thisRestaurantVotes / allVotesAmoungRestaurants) * 100
          const iAmVoter = _.keys(restaurant.votes).indexOf(me) >= 0
          return (
            <div key={idx} onClick={() => voteForRestaurant(me, match.params.id, key)}>
              <RestaurantWithVoters
                active={iAmVoter}
                title={restaurant.name}
                imageUrl={restaurant.imageUrl}
                imageWidth={computedPercentage}
                vote={thisRestaurantVotes} />
            </div>
          )
        })}
    </div>
  )
}

export default withRouter(connect(({room, me}) => ({room, me}), (dispatch) => bindActionCreators(VotePageActions, dispatch))(VotePage))
