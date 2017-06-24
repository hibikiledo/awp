import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import RoomPin from './index';

storiesOf('<RoomPin />')
    .addDecorator(host({width: '128px'}))
    .add('default', () => (
        <RoomPin pin="86434" />
    ));
    