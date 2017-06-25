import './styles/global.css'

import { AppActions, ChatActions } from './actions'

import ChatContainer from './components/ChatContainer'
import CreateRoomPage from './pages/CreateRoomPage'
import LandingPage from './pages/LandingPage';
import LoadingOverlay from './components/LoadingOverlay';
import NavBar from './components/NavBar';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import RoomPage from './pages/RoomPage';
import { Route } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

function Toast({ toasts }) {
    const items = toasts.map((t, idx) => (
        <div
            key={idx}
            style={{
                padding: '12px',
                fontFamily: 'Roboto, Arial',
                background: '#444',
                color: 'white',
                textAlign: 'center',
                fontSize: '18px',
            }}>{t.msg}</div>
    ))
    return (
        <div style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1,
        }}>
            <ReactCSSTransitionGroup
                transitionName="toast"
                transitionEnterTimeout={250}
                transitionLeaveTimeout={150}>
                    {items}
            </ReactCSSTransitionGroup>
        </div>
    )
}

const ConnectedToast = connect(({ toasts }) => ({
    toasts
}))(Toast)

const ConnectedChatContainer = connect(
    ({chat, chatDialogShow}) => ({chat, chatDialogShow}),
    (dispatch) => bindActionCreators(ChatActions, dispatch)
)(ChatContainer)


const AppNavBar = connect(
    ({ roomPin, room }) => ({ showCopy: roomPin, title: room ? room.name : 'WeEat ❤︎' }),
    (dispatch) => ({
        onCopyIconClick: () => dispatch(AppActions.copyLink()),
        onAppIconClick: () => dispatch(AppActions.resetApp())
    })
)(NavBar)

const AppLoadingPage = connect(
    ({ isLoading }) => ({ isLoading })
)(LoadingOverlay);

export default class AppRoute extends React.Component {
    render() {
        return (
            <div>
                <nav className="full-width">
                    <AppNavBar />
                </nav>
                <AppLoadingPage />
                <div className="wrapper">
                    <Route path="/" component={ConnectedToast} />
                    <Route path="/" component={ConnectedChatContainer} />
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/create" component={CreateRoomPage} />
                    <Route exact path="/r/:id" component={RoomPage} />
                </div>
            </div>
        )
    }
}
