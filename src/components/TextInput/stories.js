import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import InputText from './index';

storiesOf('<InputText />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <InputText placeholder="Please type here" />
    ));