import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import RestaurantDisplayWithVoters from './index';

storiesOf('<RestaurantDisplayWithVoters />')
    .addDecorator(host({width: '300px'}))
    .add('default', () => (
        <RestaurantDisplayWithVoters
            restaurantName="Ginzado Thonglorr"
            imageUrl="http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg"
            voters={['Earch', 'Sharpy', 'Choo Choo', 'Nut', 'Toy']}
        />
    ));
    