import './style.css';

import React, {Component} from 'react';

import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import PageContainer from '../PageContainer';
import PageSection from '../PageSection';
import {partial,debounce} from 'lodash';
import searchIcon from './images/search.png';

const RestaurantSearchListItem = ({restaurantName, onSelect}) => (
  <div className="restuarant-search-item">
    <span className="title">{restaurantName}</span>
    <span className="button" onClick={onSelect}>+</span>
    <div className="clear"></div>
  </div>
);

class RestaurantSearchInput extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired
  }
  onSelect = () => {
    this
      .props
      .onSelect({name: this.input.value, imageUrl: null});
  }
  render() {
    return (
      <div className="search-input">
        <div className="icon">
          <img src={searchIcon}/>
        </div>
        <input
          type="text"
          className="text-input"
          value={this.props.keyword}
          onChange={(e) => this.props.onChange(e.target.value)}
          ref={input => this.input = input}/>
        <span className="button" onClick={this.onSelect}>+</span>
        <div className="clear"></div>
      </div>
    )
  }
}

class RestaurantSearchAPI {
  searchByKeyword(keyword) {
     if (!navigator.geolocation) {
       return this.callSearchApi(keyword);
    } else {
       return this.getCurrentPosition()
        .then(partial(this.callSearchApi.bind(this), keyword));
    } 
  }
  getCurrentPosition() {
    return new Promise(function (resolve) {
      navigator.geolocation.getCurrentPosition(resolve);
    })
  }
  callSearchApi(keyword, position) {
    // position.coords.latitude + "," + position.coords.longitude
    let location, radius;

    if (position) {
      location = new global.google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      radius = 10e3;
    }

    return new Promise((resolve, reject) => {
      global
        .placesService
        .textSearch({
          query: keyword,
          type: 'restaurant',
          location,
          radius
        }, resolve)
    }).then(result => result ? result.map(p => this.googlePlaceToRestaurant(p)) : []);
  }
  googlePlaceToRestaurant(place) {
    const imageUrl = place.photos && place.photos.length > 0
      ? place
        .photos[0]
        .getUrl({maxWidth: '400px'})
        .replace(/(.+)\//, '$1')
      : null;

    return {
      name: place.name,
      imageUrl: imageUrl
    };
  }
}

export const RestaurantSearchBox = ({onSelect, onChange, keyword, restaurants}) => (
  <PageContainer center={false}>
    <PageSection>
      <RestaurantSearchInput
        keyword={keyword}
        onChange={onChange}
        onSelect={onSelect}/>
    </PageSection>
    <PageSection flex="1" scroll>
      {restaurants.map((r, i) => <RestaurantSearchListItem
        key={i}
        restaurantName={r.name}
        onSelect={() => onSelect(r)}/>)}
    </PageSection>
  </PageContainer>
);

export default class RestaurantSearchBoxContainer extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.api = new RestaurantSearchAPI();
    this.state = {
      keyword: '',
      restaurants: []
    };
    this.searchRestaurant = debounce(this.searchRestaurant.bind(this), 1000);
  }
  searchRestaurant(keyword) {
    this
      .api
      .searchByKeyword(keyword)
      .then(restuarants => this.setState({
        restaurants: restuarants || []
      }))
  }
  onChange = (keyword) => {
    if (!keyword) {
      return this.setState({
        keyword,
        restaurants: []
      })
    }

    this.setState({
      keyword
    });

    this.searchRestaurant(keyword);
  }
  onSelect = (r) => {
    this.setState({
      keyword: '',
      restaurants: []
    });
    this.props.onSelect(r);
  }
  render() {
    return (<RestaurantSearchBox
      keyword={this.state.keyword}
      onChange={this.onChange}
      onSelect={this.onSelect}
      restaurants={this.state.restaurants}/>);
  }
};
