import React, {Component} from 'react';

import AddMenu from '../../../../components/AddMenu'
import BorderdNumericInput from '../../../../components/BorderdNumericInput'
import ChosenServicePerson from '../../../../components/ChosenServicePerson';
import FormGroup from '../../../../components/FormGroup'
import PageContainer from '../../../../components/PageContainer';
import PageSection from '../../../../components/PageSection';
import ListItem from '../../../../components/ListItem'
import {OrderPageActions} from '../../../../actions'
import PrimaryBtn from '../../../../components/PrimaryBtn'
import PropTypes from 'prop-types';
import RestaurantDisplayWithVoters from '../../../../components/RestaurantDisplayWithVoters'
import _ from 'lodash';
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

class VotePage extends Component {

  constructor(props, ctx) {
    super(props, ctx)
  }

  handleAddMenu = async() => {
    this
      .props
      .addMenu(this.refs.menu.value)
    this.refs.menu.value = ""
  }

  render() {
    const {
      restaurant,
      addMenu,
      updateMenu,
      menus,
      me,
      serviceUser
    } = this.props
    if (!restaurant) {
      return null;
    }

    return (
      <PageContainer top="110px" center={false}>
        <PageSection padding={false}>
          <FormGroup>
            <div className="restaurant-info full-width">
              <FormGroup>
                <RestaurantDisplayWithVoters
                  restaurantName={restaurant.name}
                  imageUrl={restaurant.imageUrl}
                  voters={restaurant.voterNames}/>
              </FormGroup>
              <ChosenServicePerson/>
            </div>
          </FormGroup>
          <AddMenu onAddMenu={addMenu}/>
        </PageSection>
        <PageSection padding={false} scroll>
          {menus && menus.map((m, i) => <ListItem
            key={i}
            title={m.name}
            description={m
            .users
            .map(u => `${u.name} x${u.amount}`)
            .join(', ')}
            rightItem={< BorderdNumericInput onChange = {
            (amount) => {
              updateMenu(m.name, amount)
            }
          }
          value = {
            m
              .users
              .reduce((sum, u) => {
                if (u.name !== me) {
                  return sum;
                }
                sum += u.amount;
                return sum;
              }, 0)
          } />}/>)
        }
        </PageSection>
        <PageSection padding={false}>
          {me === serviceUser && <PrimaryBtn onClick={this.props.endOrder}>
            End Ordering
          </PrimaryBtn>}
        </PageSection>
      </PageContainer>
    )
  }
}

export default withRouter(connect(({topRestaurant, menus, me, serviceUser}) => ({restaurant: topRestaurant, menus, me, serviceUser}), (dispatch) => bindActionCreators(OrderPageActions, dispatch))(VotePage))
