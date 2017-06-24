import './style.css'

import React, {Component} from 'react';

import Modal from '../../../../components/Modal'
import PrimaryBtn from '../../../../components/PrimaryBtn'
import PropTypes from 'prop-types';
import RestaurantCard from '../../../../components/RestaurantCard'
import {RestaurantPageActions} from '../../../../actions'
import RestaurantSearchBox from '../../../../components/RestaurantSearchBox'
import _ from 'lodash'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

function RestaurantPage({
  me,
  room,
  match,
  addRestaurant,
  restaurantSearchBoxOpen,
  openRestaurantSearchBox,
  closeRestaurantSearchBox
}) {
  if (!room) {
    return
  }
  return (
    <div>
      <div className="full-width">
        <div className="card-scroll">
          {_
            .values(room.restaurants)
            .map((restaurant) => (
              <div className="card-container">
                <RestaurantCard
                  imageUrl={restaurant.imageUrl}
                  nominatedBy={restaurant.nominator}
                  restaurantName={restaurant.name}/>
              </div>
            ))}
        </div>
      </div>
      <PrimaryBtn onClick={openRestaurantSearchBox}>
        Add Restaurants
      </PrimaryBtn>
      <Modal
        open={restaurantSearchBoxOpen}
        onCloseIconClick={closeRestaurantSearchBox}>
        <div style={{
          padding: '48px 64px'
        }}>
          <RestaurantSearchBox
            onSelect={r => addRestaurant(match.params.id, r.name, me, r.imageUrl)}/>
        </div>
      </Modal>
    </div>
  )
}

export default withRouter(connect(
  ({room, me, restaurantSearchBoxOpen}) => ({room, me, restaurantSearchBoxOpen}),
  (dispatch) => bindActionCreators(RestaurantPageActions, dispatch)
)(RestaurantPage))
