import { Component } from 'react';
import {
  Searchcomponent,
  SearchForm,
  SearchFormButtonLabel,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  static propTypes = {
    addSearchQuery: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleInputChange = ({ target }) => {
    this.setState({
      searchQuery: target.value.toLowerCase(),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchQuery.trim() === '') {
      return;
    }
    this.props.addSearchQuery(this.state.searchQuery);

    this.setState({
      searchQuery: '',
    });
  };

  render() {
    return (
      <Searchcomponent>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <SearchFormButtonLabel>Search</SearchFormButtonLabel>
            <FaSearch width="48" height="48" />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
            value={this.state.searchQuery}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </Searchcomponent>
    );
  }
}
