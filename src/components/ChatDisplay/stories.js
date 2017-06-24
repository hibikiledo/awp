import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import ChatDisplay from './index';

storiesOf('<ChatDisplay />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
    <div>
        <ChatDisplay
            flag={false}
            name='Earth'
            message='เบื่ออาหารญี่ปุ่น' />
        <ChatDisplay
            flag={true}
            name='Choo'
            message='KFC kentucky fried chocobo!' />
    </div>
    ));