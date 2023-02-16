import { useState } from 'react';
import {
  Searchcomponent,
  SearchForm,
  SearchFormButtonLabel,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

export const Searchbar = ({ addSearchQuery }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = ({ target }) => {
    setSearchQuery(target.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }
    addSearchQuery(searchQuery);
    setSearchQuery('');
  };

  return (
    <Searchcomponent>
      <SearchForm onSubmit={handleSubmit}>
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
          value={searchQuery}
          onChange={handleInputChange}
        />
      </SearchForm>
    </Searchcomponent>
  );
};

Searchbar.propTypes = {
  addSearchQuery: PropTypes.func.isRequired,
};
