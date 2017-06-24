import ListItem from './index';
import BorderdNumericInput from '../BorderdNumericInput';
import React from 'react';
import {host} from 'storybook-host';
import {storiesOf} from '@storybook/react'
import { action } from '@storybook/addon-actions';;

storiesOf('<ListItem />')
    .addDecorator(host({width: '400px'}))
    .add('default', () => (
        <ListItem title="Grilled Sirloin" description="Choo x1, Toyy x1, Sharpy x6" />
    ))
    .add('highlight', () => (
        <ListItem title="Grilled Sirloin" description="Choo x1, Toyy x1, Sharpy x6" highlight={true} />
    ))
    .add('with right item text', () => (
        <ListItem title="Grilled Sirloin" description="Choo x1, Toyy x1, Sharpy x6" rightItem="x8"/>
    ))
    .add('with right item bordered numeric input', () => (
        <ListItem title="Grilled Sirloin" description="Choo x1, Toyy x1, Sharpy x6" rightItem={<BorderdNumericInput onChange={action('input changed')} />} />
    ));
