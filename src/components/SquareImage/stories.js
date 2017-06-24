import React from 'react';
import {storiesOf} from '@storybook/react';
import {host} from 'storybook-host';
import SquareImage from './index';

storiesOf('<SquareImage />')
    .addDecorator(host({width: '128px'}))
    .add('default', () => (
        <SquareImage 
            imageUrl="http://coolwildlife.com/wp-content/uploads/galleries/post-3004/Fox%20Picture%20003.jpg"
        />
    ))
    .add('with placeholder', () => (
        <SquareImage />
    ));
    