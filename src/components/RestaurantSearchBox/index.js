import React, {Component} from 'react';
import TextInput from '../TextInput';
import searchIcon from './images/search.png';
import './style.css';

const RestaurantSearchListItem = ({restaurantName, onSelect}) => (
  <div className="restuarant-search-item">
    <span className="title">{restaurantName}</span>
    <span className="button" onClick={onSelect}>+</span>
    <div className="clear"></div>
  </div>
);

const RestaurantSearchInput = ({ onChange }) => (
  <div className="search-input">
    <div className="icon">
      <img src={searchIcon} />
    </div>
    <TextInput onChange={onChange} />
    <span className="button">+</span>
    <div className="clear"></div>
  </div>
);

class RestaurantSearchBox extends Component {
  onChange(searchKeyword) {
    console.log(searchKeyword)
  }
  render() {
    const restuarants = new Array(10).fill({
      name: 'Baan Ice'
    });

    return (
      <div>
          <div>
            <RestaurantSearchInput onChange={this.onChange}/>
          </div>
          <div>
            {restuarants.map((r,i) => <RestaurantSearchListItem key={i} restaurantName={r.name}  onSelect={() => this.props.onSelect(r)}/>)}
          </div>
      </div>
    );
  }
};

export default RestaurantSearchBox;