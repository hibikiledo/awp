import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import PrimaryBtn from './index';

storiesOf('<PrimaryBtn />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <PrimaryBtn>Join</PrimaryBtn>
    ));