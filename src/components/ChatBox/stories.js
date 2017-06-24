import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import {action} from '@storybook/addon-actions';
import ChatBox from './index';

storiesOf('<ChatBox />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => {
        const messages = new Array(5).fill({
            flag: true,
            name: 'Earth',
            message: 'เบื่ออาหารญี่ปุ่น'
        });

        return (<ChatBox
            messages={messages}
            />)
    });