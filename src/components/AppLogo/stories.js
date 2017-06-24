import AppLogo from './index';
import React from 'react';
import {host} from 'storybook-host';
import {storiesOf} from '@storybook/react';

storiesOf('<AppLogo />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <AppLogo />
    ));
