import NumericInput from '../NumericInput';
import React from 'react';
import SettingListItem from './index';
import {host} from 'storybook-host';
import {storiesOf} from '@storybook/react';

storiesOf('<SettingListItem />')
    .addDecorator(host({width: '320px'}))
    .add('with <NummericInput />', () => (
        <SettingListItem
            option="Nominate Time"
            explanation="Minues"
            control={<NumericInput />} />
    ));
