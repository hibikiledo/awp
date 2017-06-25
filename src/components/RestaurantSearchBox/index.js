import './style.css';

import React, {Component} from 'react';

import PropTypes from 'prop-types';
import PageContainer from '../PageContainer';
import PageSection from '../PageSection';
import SquareImage from '../SquareImage';
import {partial,debounce} from 'lodash';
import searchIcon from './images/search.png';

const RestaurantSearchListItem = ({imageUrl, restaurantName, onSelect}) => (
  <div className="restuarant-search-item">
    <div className="image">
      <SquareImage imageUrl={imageUrl} />
    </div>
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
  searchNearBy() {
    if (!navigator.geolocation) {
       return Promise.reject(new Error('Geolocation feature not found'));
    }

    return this.getCurrentPosition()
        .then(partial(this.callSearchApi.bind(this), null));
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

    if (location && !keyword) {
      const request = {
        location,
        type: 'restaurant',
        rankBy: global.google.maps.places.RankBy.DISTANCE
      };

      return new Promise((resolve, reject) => {
        global
          .placesService
          .nearbySearch(request, resolve)
      }).then(result => result ? result.map(p => this.googlePlaceToRestaurant(p)) : []);
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

export const RestaurantSearchBox = ({onSelect, onChange, keyword, restaurants, nearbyRestaurants}) => (
  <PageContainer center={false}>
    <PageSection>
      <RestaurantSearchInput
        keyword={keyword}
        onChange={onChange}
        onSelect={onSelect}/>
    </PageSection>
    <PageSection flex="1" scroll>
      {!keyword && <h3 className={"nearby-search-heading"}>Nearby Restaurants</h3>}
      {!keyword && nearbyRestaurants.slice(0, 5).map((r, i) => <RestaurantSearchListItem
        key={i}
        restaurantName={r.name}
        imageUrl={r.imageUrl}
        onSelect={() => onSelect(r)}/>)}
      {keyword && restaurants.map((r, i) => <RestaurantSearchListItem
        key={i}
        restaurantName={r.name}
        imageUrl={r.imageUrl}
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
      restaurants: [],
      nearbyRestaurants: []
    };
  }
  searchRestaurant = debounce((keyword) => {
    this
      .api
      .searchByKeyword(keyword)
      .then(restuarants => this.setState({
        restaurants: restuarants || []
      }))
  }, 1000)
  searchNearbyRestaurant = () => {
    this.api.searchNearBy()
      .then(restaurants => this.setState({
        nearbyRestaurants: restaurants || []
      }));
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
  componentDidMount() {
    this.searchNearbyRestaurant();
  }
  render() {
    return (<RestaurantSearchBox
      keyword={this.state.keyword}
      onChange={this.onChange}
      onSelect={this.onSelect}
      restaurants={this.state.restaurants}
      nearbyRestaurants={this.state.nearbyRestaurants}/>);
  }
};
