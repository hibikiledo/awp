import './style.css';
import React from 'react';
import PageContainer from '../../../../components/PageContainer';
import PageSection from '../../../../components/PageSection';
import {push} from 'react-router-redux'
import {connect} from 'react-redux';
import {withRouter} from 'react-router'

const ErrorPage = ({ naviateToCreateRoom }) => (
  <PageContainer>
    <PageSection flex={1} padding={false}>
      <div className="error-messages-section">
        <h1 className="title">WE FAILED.</h1>
        <div className="description">Aren’t we hungry ? Nominate some place to eat.</div>
      </div>
    </PageSection>
    <PageSection padding={false}>
      <div className="create-room-button" onClick={naviateToCreateRoom}>
        <div className="title">Create Room</div>
        <div className="description">and this time, nominate</div>
      </div>
    </PageSection>
  </PageContainer>
);

export default withRouter(connect(
  null,
  (dispatch) => ({
    naviateToCreateRoom: () => dispatch(push('/create'))
  })
)(ErrorPage))