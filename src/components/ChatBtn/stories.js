import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import ChatBtn from './index';

storiesOf('<ChatBtn />')
    .addDecorator(host({width: '48px'}))
    .add('default', () => (
        <ChatBtn />
    ));