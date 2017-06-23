import React from 'react';
import StatusBar from './index';
import {host} from 'storybook-host';
import {storiesOf} from '@storybook/react';

storiesOf('<StatusBar />')
    .addDecorator(host({width: '320px'}))
    .add('default', () => (
        <StatusBar
            states={['Nominate', 'Vote', 'Order', 'Summary']}
            currentState={'Vote'}
            remainingTime="00:49" />
    ));
