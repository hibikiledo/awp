import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import AddMenu from './index';

storiesOf('<AddMenu />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <AddMenu />
    ));