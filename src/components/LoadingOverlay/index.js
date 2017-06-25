import './style.css'
import loadingImg from './images/loading.gif';
import React from 'react';
import PageContainer from '../PageContainer'
import PageSection from '../PageSection'

export default({isLoading}) => (
  <div
    className="loading-overlay"
    style={{
    display: isLoading
      ? 'block'
      : 'none'
  }}>
    <PageContainer top="0px">
      <div className="icon"><img src={loadingImg}/></div>
    </PageContainer>
  </div>
);
