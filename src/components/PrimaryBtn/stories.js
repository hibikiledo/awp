import React from 'react';
import {
    storiesOf
} from '@storybook/react';

import PrimaryBtn from './index';

storiesOf('<PrimaryBtn />')
    .add('default', () => ( 
        <PrimaryBtn>Join</PrimaryBtn>
    ));