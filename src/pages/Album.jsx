import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Load from './Load';
import './style.css';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      albums: '',
      display: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    const allMusics = await getMusics(id);
    const albums = allMusics.filter((m, i) => i > 0);

    this.setState({ albums });
    this.setState({ display: allMusics[0] });
    console.log('music', albums);
  }

  render() {
    const { albums, display } = this.state;

    return (

      <div data-testid="page-album">
        <h2>Album</h2>
        <Header />
        { !albums ? (
          <Load />
        ) : (
          <section className="album-contain">
            <div className="album-view">
              <img src={ display.artworkUrl100 } alt={ display.collectionName } />
              <p data-testid="album-name">{ display.collectionName }</p>
              <p data-testid="artist-name">{ display.artistName }</p>
            </div>
            {albums.map((music, i) => (
              <MusicCard
                key={ i }
                musicName={ music.trackName }
                previewUrl={ music.previewUrl }
              />
            ))}
            <Link to="/search">Voltar</Link>
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
