import CreateRoomPage from './pages/CreateRoomPage'
import LandingPage from './pages/LandingPage';
import React from 'react';
import RoomPage from './pages/RoomPage';
import { Route } from 'react-router'
import { connect } from 'react-redux';

function Toast({ toasts }) {
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
        }}>
            {toasts.map((msg) => (
                <div style={{
                    padding: '12px',
                    fontFamily: 'Roboto, Arial',
                    background: '#444',
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '18px',
                }}>{msg}</div>
            ))}
        </div>
    )
}

const ConnectedToast = connect(({ toasts }) => ({
    toasts
}))(Toast)

export default class AppRoute extends React.Component {
    render() {
        return (
            <div>
                <Route path="/" render={() => (
                  <ConnectedToast />
                )} />
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/create" component={CreateRoomPage} />
                <Route exact path="/r/:id" component={RoomPage} />
            </div>
        )
    }
}
