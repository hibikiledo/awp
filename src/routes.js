import React from 'react';
import { Route } from 'react-router'

import CreateRoomPage from './pages/CreateRoomPage'
import RoomPage from './pages/RoomPage';
import LandingPage from './pages/LandingPage';
import OrderPage from './pages/OrderPage';
import SummaryPage from './pages/SummaryPage';
import VotePage from './pages/VotePage';

export default class AppRoute extends React.Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/create" component={CreateRoomPage} />
                <Route exact path="/r/:id" component={RoomPage} />
                <Route exact path='/r/:id/vote' component={VotePage} />
                <Route exact path='/r/:id/order' component={OrderPage} />
                <Route exact path='/r/:id/summary' component={SummaryPage} />
            </div>
        )
    }
}