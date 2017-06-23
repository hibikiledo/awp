import React from 'react';
import {
    storiesOf
} from '@storybook/react';

import BorderlessBtn from './index';

storiesOf('<BorderlessBtn />')
    .add('default', () => ( 
        <BorderlessBtn>Create Room</BorderlessBtn>
    ));