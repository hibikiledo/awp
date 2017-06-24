import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { OrderPageActions } from '../../../../actions'
import _ from 'lodash';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import RestaurantDisplayWithVoters from '../../../../components/RestaurantDisplayWithVoters'

class VotePage extends Component {

  constructor(props, ctx) {
    super(props, ctx)
  }

  handleAddMenu = async () => {
    this.props.addMenu(this.refs.menu.value)
    this.refs.menu.value = ""
  }
  
  render() {
    const { restaurant, addMenu, menus } = this.props
    if (!restaurant) {
      return null;
    }

    return (
      <div>
        <RestaurantDisplayWithVoters restaurantName={restaurant.name} imageUrl={restaurant.image} voters={['sharp', 'chu', 'earth', 'nut']} />
        <div>
          <input type="text" ref="menu" />
          <button onClick={async () => this.handleAddMenu()}>Add</button>
        </div>
        <div>
          {_.map(menus, (m, idx) => {
            return (
              <div key={idx}>
                <span>{m.name}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default withRouter(connect(
  ({ topRestaurant, menus }) => ({ restaurant: topRestaurant, menus }),
  (dispatch) => bindActionCreators(OrderPageActions, dispatch)
)(VotePage))
