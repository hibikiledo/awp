import './style.css';

import React, {Component} from 'react';

import ChosenServicePerson from '../../../../components/ChosenServicePerson';
import FormGroup from '../../../../components/FormGroup';
import ListItem from '../../../../components/ListItem';
import PageContainer from '../../../../components/PageContainer';
import PageSection from '../../../../components/PageSection';
import PropTypes from 'prop-types';
import RestaurantDisplayWithVoters from '../../../../components/RestaurantDisplayWithVoters';
import _ from 'lodash';
import {connect} from 'react-redux';

class SummaryPage extends Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    const {menus, topRestaurant, room} = this.props;

    const grandTotal = _.sumBy(menus, 'total');

    return (
      <PageContainer top="110px" center={false}>
        <PageSection padding={false}>
          <FormGroup>
            <div className="restaurant-info full-width">
              <FormGroup>
                <RestaurantDisplayWithVoters
                  restaurantName={topRestaurant.name}
                  imageUrl={topRestaurant.imageUrl}
                  voters={topRestaurant.voterNames}/>
              </FormGroup>
              <ChosenServicePerson/>
            </div>
          </FormGroup>
        </PageSection>
        <PageSection padding={false} scroll>
          {menus && menus.map((m, i) => <ListItem
            key={i}
            title={m.name}
            description={m
            .users
            .map(u => `${u.name} x${u.amount}`)
            .join(', ')}
            rightItem={`x${m.total}`}/>)
}
        </PageSection>
        <PageSection padding={false}>
          <ListItem
            title="Total"
            description="Items"
            rightItem={`x${grandTotal}`}
            highlight={true}/>
        </PageSection>
      </PageContainer>
    )
  }
}

export default connect(({menus, topRestaurant, room}) => ({menus, topRestaurant, room}))(SummaryPage);
