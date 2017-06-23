import NavBar from './index';
import React from 'react';
import {host} from 'storybook-host';
import {storiesOf} from '@storybook/react';

storiesOf('<NavBar />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <NavBar title="WeEat" />
    ));
