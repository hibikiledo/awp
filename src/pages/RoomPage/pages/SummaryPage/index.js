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
    const { menus } = this.props;

    const grandTotal = _.sumBy(menus, 'total');
    
    return (
      <div>
        <FormGroup>
          <div className="restaurant-info full-width">
            <FormGroup>
              <RestaurantDisplayWithVoters
                restaurantName="Ginzado Thonglorr"
                voters={['Earth']}
              />
            </FormGroup>
            <ChosenServicePerson person="Earth" />
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
        />
      </div>
    )
  }
}

export default connect(
  ({ menus }) => ({ menus })
)(SummaryPage);
