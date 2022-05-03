import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Load from './Load';
import './style.css';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: '',
      display: '',
      myFavorites: [],
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const myFavorites = await getFavoriteSongs();
    const allMusics = await getMusics(id);
    const musics = allMusics.filter((m, i) => i > 0); // As musicas estão a partir do index 1.
    this.setState({ musics });
    this.setState({ display: allMusics[0] }); // O index 0 Contem as informações.
    this.setState({ myFavorites });
    this.setState({ isLoading: false });
  }

  FavoriteControl = async ({ target: { name, checked } }) => {
    this.setState({ isLoading: true });
    const { myFavorites, musics } = this.state;

    if (checked) {
      const newMusic = musics.find((m) => m.trackId === Number(name));
      this.setState((state) => ({
        myFavorites: [...state.myFavorites, { ...newMusic }] }));
      await addSong({ ...newMusic });
      this.setState({ isLoading: false });
    }

    if (!checked) {
      const newFavorites = myFavorites.filter((f) => f.trackId !== Number(name));
      this.setState({ myFavorites: newFavorites });
      await removeSong({ trackId: name });
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { musics, display, isLoading, myFavorites } = this.state;
    return (

      <div data-testid="page-album">
        <h2>Album</h2>
        { isLoading ? (
          <Load />
        ) : (
          <section className="album-contain">
            <div className="album-view">
              <img src={ display.artworkUrl100 } alt={ display.collectionName } />
              <p data-testid="album-name">{ display.collectionName }</p>
              <p data-testid="artist-name">{ display.artistName }</p>
            </div>

            <div className="music-contain">
              {musics.map((music, i) => (
                <MusicCard
                  key={ i }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  favoriteFunction={ this.FavoriteControl }
                  trackId={ music.trackId }
                  myFavorites={ myFavorites }
                />
              ))}

            </div>
            <Link to="/search" className="btn-back">Voltar</Link>
          </section>
        )}

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(Object).isRequired,
};

export default Album;
