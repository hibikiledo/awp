import ChosenServicePerson from './index';
import React from 'react';
import {host} from 'storybook-host';
import {storiesOf} from '@storybook/react';

storiesOf('<ChosenServicePerson />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <ChosenServicePerson person="Earth" />
    ));
