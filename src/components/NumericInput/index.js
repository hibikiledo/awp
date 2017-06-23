import './style.css'

import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class TextInput extends Component {
  static propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func
  }
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || 0
    };
    this.increase = this.increase.bind(this);
    this.decrease = this.decrease.bind(this);
  }
  increase() {
    this.setState({
      value: this.state.value + 1
    });
  }
  decrease() {
    this.setState({
      value: this.state.value - 1
    });
  }
  componentDidUpdate() {
    this.props.onChange(this.state.value);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.value !== nextState.value;
  }
  render() {
    const {
      onChange,
      value,
      ...props
    } = this.props;

    return (
      <div className="numeric-input">
        <span className="button" onClick={this.decrease}>-</span>
        <input
          type="text"
          className="text"
          value={this.state.value}
          readOnly
          {...props}/>
        <span className="button" onClick={this.increase}>+</span>
      </div>
    );
  }
}