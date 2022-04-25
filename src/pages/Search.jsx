import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Load from './Load';
import './style.css';
import CreateInput from '../components/CreateInput';
import CreateButton from '../components/CreateButton';

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
          { isLoading ? ( // condicional para esconder botao e input
            <p> </p>
          ) : (
            <form action="">

              <CreateInput
                type="text"
                test="search-artist-input"
                value={ findArtist }
                name="findArtist"
                funct={ this.ChangeState }
                description="Nome do Artista"
              />

              <CreateButton
                name="btnFind"
                funct={ this.SearchArtist }
                test="search-artist-button"
                btnDisable={ findButtonDisable }
                description="Procurar"
              />

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
