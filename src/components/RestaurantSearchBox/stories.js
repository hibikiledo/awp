import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import {action} from '@storybook/addon-actions';
import {RestaurantSearchBox} from './index';

storiesOf('<RestaurantSearchBox />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => {
        const restaurants = new Array(5).fill({
            name: 'Isao'
        });

        return (<RestaurantSearchBox
            restaurants={restaurants}
            onSelect={action('restaurant item selected')}/>)
    });
