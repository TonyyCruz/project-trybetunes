import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  render() {
    return (
      <div data-testid="page-search">
        <h2>Search</h2>
        <Header />
      </div>
    );
  }
}

export default Search;
