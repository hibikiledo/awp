import './styles/global.css'

import { AppActions, ChatActions } from './actions'

import ChatContainer from './components/ChatContainer'
import LoadingOverlay from './components/LoadingOverlay';
import NavBar from './components/NavBar';
import React from 'react';
import { Route } from 'react-router'
import { bindActionCreators } from 'redux'
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
            {toasts.map((msg, idx) => (
                <div
                    key={idx}
                    style={{
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

const ConnectedChatContainer = connect(
    ({chat, chatDialogShow}) => ({chat, chatDialogShow}),
    (dispatch) => bindActionCreators(ChatActions, dispatch)
)(ChatContainer)


const AppNavBar = connect(
    ({ roomPin }) => ({ showCopy: roomPin, title: 'WeEat ❤︎' }),
    (dispatch) => ({
        onCopyIconClick: () => dispatch(AppActions.copyLink()),
        onAppIconClick: () => dispatch(AppActions.resetApp())
    })
)(NavBar)

const AppLoadingPage = connect(
    ({ isLoading }) => ({ isLoading })
)(LoadingOverlay);

function loadLazily(asyncImport) {
    return class LazyLoader extends React.Component {
        state = {
            component: null
        }
        componentDidMount() {
            asyncImport().then((module) => {
                this.setState({ component: module.default })
            })
        }
        render() {
            if (!this.state.component) {
                return null;
            }
            const Component = this.state.component
            return <Component {...this.props} />
        }
    }
}

const LazyLoadLandingPage = loadLazily(() => import('./pages/LandingPage/index.js'))
const LazyLoadCreateRoomPage = loadLazily(() => import('./pages/CreateRoomPage/index.js'))
const LazyLoadRoomPage = loadLazily(() => import('./pages/RoomPage/index.js'))

export default class AppRoute extends React.Component {
    render() {
        return (
            <div>
                <nav className="full-width">
                    <AppNavBar />
                </nav>
                <AppLoadingPage />
                <Route path="/" component={ConnectedToast} />
                <Route path="/" component={ConnectedChatContainer} />
                <Route exact path="/" component={LazyLoadLandingPage}  />
                <Route exact path="/create" component={LazyLoadCreateRoomPage} />
                <Route exact path="/r/:id" component={LazyLoadRoomPage}  />
            </div>
        )
    }
}
