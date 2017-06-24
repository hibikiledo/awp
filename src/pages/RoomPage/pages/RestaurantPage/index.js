import './style.css'

import React, {Component} from 'react';

import PrimaryBtn from '../../../../components/PrimaryBtn'
import PropTypes from 'prop-types';
import RestaurantCard from '../../../../components/RestaurantCard'
import _ from 'lodash'
import {connect} from 'react-redux';

function RestaurantPage({room}) {
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
              )
            )}
        </div>
      </div>
      <PrimaryBtn>
        Add Restaurants
      </PrimaryBtn>
    </div>
  )
}

export default connect(({room}) => ({room}))(RestaurantPage)
