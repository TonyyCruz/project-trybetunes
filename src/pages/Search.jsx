import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from './Load';
// import Album from './Album';
import './style.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      findArtist: '',
      artistName: '',
      findButtonDisable: true,
      isLoading: false,
      albums: [],
    };
  }

  ChangeState = ({ target }) => {
    const three = 2;
    const { value, name } = target;
    if (name === 'findArtist') { this.setState({ findArtist: value }); }
    const btnCheck = value.length < three;
    this.setState({ findButtonDisable: btnCheck });
  }

  SearchArtist = async () => {
    const { findArtist } = this.state;
    this.setState({ isLoading: true });
    this.setState({ artistName: findArtist });

    const artists = await searchAlbumsAPI(findArtist);
    this.setState({ albums: artists });
    this.setState({ findArtist: '' });// ultima <=
    this.setState({ findButtonDisable: true });
    this.setState({ isLoading: false });
  }

  //  -------------------------------------------------------------------------------
  render() {
    const { findArtist, findButtonDisable, isLoading, artistName, albums } = this.state;

    return (
      isLoading ? (<Load /> // condicional do loading
      ) : (
        <div data-testid="page-search">
          <h2>Search</h2>
          <Header />
          { isLoading ? ( // condicional para esconder botao e input
            <p> </p>
          ) : (
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
          )}
          {artistName && (
            <p>
              Resultado de álbuns de:
              { ` ${artistName}` }
            </p>)}

          <section className="album-contain">
            { albums.length === 0 ? (<h3>Nenhum álbum foi encontrado</h3>
            ) : (
              albums.map((alb) => (
                <div key={ alb.collectionId } className="album-box">
                  <img src={ alb.artworkUrl100 } alt={ alb.collectionName } />
                  <p>{ alb.collectionName }</p>
                  <p>{ alb.artistName }</p>
                  <Link
                    to={ `/album/${alb.collectionId}` }
                    data-testid={ `link-to-album-${alb.collectionId}` }
                  >
                    Detalhes
                  </Link>
                </div>
              ))
            )}

          </section>
        </div>)
    );
  }
}

export default Search;
