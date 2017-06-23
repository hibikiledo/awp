import Modal from './index';
import React from 'react';
import {host} from 'storybook-host';
import {storiesOf} from '@storybook/react';

storiesOf('<Modal />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <Modal title="WeEat" />
    ));
