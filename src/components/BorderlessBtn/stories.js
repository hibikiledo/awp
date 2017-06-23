import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import BorderlessBtn from './index';

storiesOf('<BorderlessBtn />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <BorderlessBtn>Create Room</BorderlessBtn>
    ));