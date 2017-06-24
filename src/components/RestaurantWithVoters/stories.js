import RestaurantWithVoters from './index';
import React from 'react';
import {host} from 'storybook-host';
import {storiesOf} from '@storybook/react'
import { action } from '@storybook/addon-actions';;

storiesOf('<RestaurantWithVoters />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <RestaurantWithVoters 
            title="Ginzado Thonglorr" 
            imageUrl="https://d16jvv1mxapgw7.cloudfront.net/Ginzado_cover_thonglor.jpg" 
            imageWidth="70" 
            vote="7"/>
    ));
