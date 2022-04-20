import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      findArtist: '',
      findButtonDisable: true,
    };
  }

  ChangeState = ({ target }) => {
    const three = 2;
    const { value, name } = target;
    if (name === 'findArtist') { this.setState({ findArtist: value }); }
    const btnCheck = value.length < three;
    this.setState({ findButtonDisable: btnCheck });
  }

  SearchArtist = () => {}

  render() {
    const { findArtist, findButtonDisable } = this.state;
    return (
      <div data-testid="page-search">
        <h2>Search</h2>
        <Header />
        <form action="">

          <input
            type="text"
            data-testid="search-artist-input"
            value={ findArtist }
            name="findArtist"
            onChange={ this.ChangeState }
            placeholder="Nome do Artista"
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ findButtonDisable }
            onClick={ this.SearchArtist }
          >
            Procurar
          </button>

        </form>
      </div>
    );
  }
}

export default Search;
