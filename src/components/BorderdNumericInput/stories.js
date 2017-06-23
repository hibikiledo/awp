import React from 'react';
import {storiesOf} from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {host} from 'storybook-host';
import BorderedNumericInput from './index';

storiesOf('<BorderedNumericInput />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <BorderedNumericInput placeholder="Please type here" value={0} onChange={action('input changed')}/>
    ));