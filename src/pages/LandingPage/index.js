import './style.css'

import React, { Component } from 'react';

import AppLogo from '../../components/AppLogo'
import { AppSelectors } from '../../selectors'
import BorderlessBtn from '../../components/BorderlessBtn'
import FormGroup from '../../components/FormGroup'
import FormSection from '../../components/FormSection'
import { LandingPageActions } from '../../actions'
import { Link } from 'react-router-dom'
import PageContainer from '../../components/PageContainer'
import PageSection from '../../components/PageSection'
import PrimaryBtn from '../../components/PrimaryBtn'
import PropTypes from 'prop-types'
import RestaurantSearchBox from '../../components/RestaurantSearchBox';
import TextInput from '../../components/TextInput'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class LandingPage extends Component {
  static propTypes = {
    room: PropTypes.object
  }

  state = {
    pin: ''
  }

  renderRequestPin() {
    return (
      <PageContainer>
        <PageSection flex="1" />
        <PageSection  style={{
          marginBottom: '55px'
        }}>
          <AppLogo/>
        </PageSection>
        <FormSection>
          <FormGroup>
            <TextInput
              aria-label="room pin"
              value={this.state.pin}
              type="number"
              onChange={(e) => {
              this.setState({ pin: e.target.value })
            }} />
          </FormGroup>
          <PrimaryBtn onClick={() => {
            this.props.tryJoinRoomWithPin(this.state.pin)
          }}>
            JOIN
          </PrimaryBtn>
        </FormSection>
        <PageSection flex="1" />
        <PageSection>
          <BorderlessBtn onClick={() => {
            this.props.navigateToCreateRoomPage()
          }} style={{
            fontSize: '20px'
          }}>
            Create Room
          </BorderlessBtn>
        </PageSection>
      </PageContainer>
    );
  }

  render() {
    return (
      <div>
        {this.renderRequestPin()}
      </div>
    )
  }
}

export default connect(
  (state) => ({
    room: AppSelectors.getRoom(state)
  }),
  (dispatch) => bindActionCreators(LandingPageActions, dispatch)
)(LandingPage);
