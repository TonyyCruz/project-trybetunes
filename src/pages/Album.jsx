import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Load from './Load';
import './style.css';
import MusicCard from '../components/MusicCard';
import { addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musics: '',
      display: '',
      // favorits: '',
      isLoading: false,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const allMusics = await getMusics(id);
    const musics = allMusics.filter((m, i) => i > 0);

    this.setState({ musics });
    this.setState({ display: allMusics[0] });
    console.log('music', musics);
  }

  favoriteMusic = async ({ target: { name } }) => {
    this.setState({ isLoading: true });
    await addSong(name);
    this.setState({ isLoading: false });
  }

  render() {
    const { musics, display, isLoading } = this.state;

    return (

      <div data-testid="page-album">
        <h2>Album</h2>
        <Header />
        { !musics ? (
          <Load />
        ) : (
          <section className="album-contain">
            <div className="album-view">
              <img src={ display.artworkUrl100 } alt={ display.collectionName } />
              <p data-testid="album-name">{ display.collectionName }</p>
              <p data-testid="artist-name">{ display.artistName }</p>
            </div>

            { isLoading ? (
              <Load />
            ) : (
              <div className="music-contain">
                {musics.map((music, i) => (
                  <MusicCard
                    key={ i }
                    musicName={ music.trackName }
                    previewUrl={ music.previewUrl }
                    favorite={ this.favoriteMusic }
                    trackId={ music.trackId }
                  />
                ))}
              </div>
            )}
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
