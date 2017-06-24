import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import { action } from '@storybook/addon-actions';
import RestaurantSearchBox from './index';

storiesOf('<RestaurantSearchBox />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <RestaurantSearchBox onSelect={action('restaurant item selected')} />
    ));
    