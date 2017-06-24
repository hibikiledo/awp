import './style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import RestaurantDisplayWithVoters from '../../../../components/RestaurantDisplayWithVoters';
import ChosenServicePerson from '../../../../components/ChosenServicePerson';
import ListItem from '../../../../components/ListItem';
import FormGroup from '../../../../components/FormGroup';
import PageContainer from '../../../../components/PageContainer';
import PageSection from '../../../../components/PageSection';
import _ from 'lodash';

import PropTypes from 'prop-types';

class SummaryPage extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    const { menus, topRestaurant } = this.props;

    const grandTotal = _.sumBy(menus, 'total');
    
    return (
      <div>
        <FormGroup>
          <div className="restaurant-info full-width">
            <FormGroup>
              <RestaurantDisplayWithVoters
                restaurantName={topRestaurant.name}
                imageUrl={topRestaurant.imageUrl}
                voters={['Earth']}
              />
            </FormGroup>
            <ChosenServicePerson person={topRestaurant.nominator} />
          </div>
        </FormGroup>
        {
          menus && menus.map((m,i) => <ListItem
            key={i}
            title={m.name}
            description={m.users.map(u => `${u.name} x${u.amount}`).join(', ')}
            rightItem={`x${m.total}`}
            />
            )
        }
        <ListItem
          title="Total"
          description="Items"
          rightItem={`x${grandTotal}`}
          highlight={true}
        />
      </div>
    )
  }
}

export default connect(
  ({ menus, topRestaurant }) => ({ menus, topRestaurant })
)(SummaryPage);
