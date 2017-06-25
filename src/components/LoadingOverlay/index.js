import './style.css'
import loadingImg from './images/loading.png';
import React from 'react';
import PageContainer from '../PageContainer'

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
