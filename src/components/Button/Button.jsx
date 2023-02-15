import { Component } from 'react';
import { LoadMoreBtn } from './Button.styled';
import PropTypes from 'prop-types';

export class Button extends Component {
  static propTypes = {
    onClickBtn: PropTypes.func.isRequired,
  };

  render() {
    return (
      <LoadMoreBtn type="button" onClick={this.props.onClickBtn}>
        {this.props.children}
      </LoadMoreBtn>
    );
  }
}
