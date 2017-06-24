import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { VotePageActions } from '../../../../actions'
import _ from 'lodash';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import RestaurantMedia from '../../../../components/RestaurantMedia'

function VotePage({ restaurant }) {
  if (!restaurant) {
    return null;
  }
  
  return (
    <div>
      <RestaurantMedia restaurantName={restaurant.name} imageUrl={restaurant.image} voters={['sharp', 'chu', 'earth', 'nut']} />
    </div>
  )
}

export default withRouter(connect(
  ({ topRestaurant }) => ({ restaurant: topRestaurant }),
  (dispatch) => bindActionCreators(VotePageActions, dispatch)
)(VotePage))
