import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import PopupChat from './index';

storiesOf('<PopupChat />')
    .addDecorator(host({width: '200px'}))
    .add('default', () => (
        <PopupChat
            name="Choo"
            message="Isao กินแล้วขี้แตกฮือ" />
    ));