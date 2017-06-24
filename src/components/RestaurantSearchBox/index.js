import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TextInput from '../TextInput';
import searchIcon from './images/search.png';
import {debounce} from 'lodash';
import './style.css';

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
  constructor(props) {
    super(props);
    this.state = {
      value: null
    };
  }
  onChange = (e) => {
    const value = e.target.value;

    this.setState({value});

    this
      .props
      .onChange(value);
  }
  onSelect = () => {
    if (!this.state.value) {
      return;
    }

    this.props.onSelect({name: this.state.value, imageUrl: null});
    this.props.onChange({
      target: {
        value: null
      }
    })
    this.setState({value: null});
    this.input.value = null;
  }
  render() {
    return (
      <div className="search-input">
        <div className="icon">
          <img src={searchIcon}/>
        </div>
        <input type="text" className="text-input" onChange={this.onChange} ref={input => this.input = input}/>
        <span className="button" onClick={this.onSelect}>+</span>
        <div className="clear"></div>
      </div>
    )
  }
}

class RestaurantSearchAPI {
  searchByKeyword(keyword) {

    return new Promise((resolve, reject) => {
      window
        .placesService
        .textSearch({
          query: keyword,
          type: 'restaurant'
        }, resolve)
    }).then(result => result.map(p => this.googlePlaceToRestaurant(p)));
  }
  googlePlaceToRestaurant(place) {
    const imageUrl = place.photos.length > 0
      ? place
        .photos[0]
        .getUrl({maxWidth: '400px'})
      : null;

    return {
      name: place.name,
      imageUrl: imageUrl.replace(/(.+)\//, '$1')
    };
  }
}

export const RestaurantSearchBox = ({onSelect, onChange, restaurants}) => (
  <div>
    <div>
      <RestaurantSearchInput onChange={onChange} onSelect={onSelect}/>
    </div>
    <div>
      {restaurants.map((r, i) => <RestaurantSearchListItem
        key={i}
        restaurantName={r.name}
        onSelect={() => onSelect(r)}/>)}
    </div>
  </div>
);

export default class RestaurantSearchBoxContainer extends Component {
  static propTypes = {
    onSelect: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    this.api = new RestaurantSearchAPI();
    this.state = {
      restaurants: []
    };
  }
  onChange = debounce((keyword) => {
    if (!keyword.length) {
      this.setState({restaurants: []});
      return;
    }

    this
      .api
      .searchByKeyword(keyword)
      .then(restuarants => this.setState({
        restaurants: restuarants || []
      }))
  }, 400)
  render() {
    return (<RestaurantSearchBox
      onChange={this.onChange}
      onSelect={this.props.onSelect}
      restaurants={this.state.restaurants}/>);
  }
};