import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import RestaurantCard from './index';

storiesOf('<RestaurantCard />')
    .addDecorator(host({width: '128px'}))
    .add('default', () => (
        <RestaurantCard 
            imageUrl="http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg"
            restaurantName="Isao"
            nominatedBy="Toyy"
        />
    ));
    