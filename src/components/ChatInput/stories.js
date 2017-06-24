import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import ChatInput from './index';

storiesOf('<ChatInput />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <ChatInput />
    ));