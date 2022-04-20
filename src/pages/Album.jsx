import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
// import getMusics from '../services/musicsAPI';
import './style.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      album: '',
    };
  }

  async componentDidMount() {
    // const { match: { params: { id } } } = this.props;
    // const find = id.split('-');
    // const albums = await getMusics(id);
    // const album = albums.find((alb) => alb.collectionId === Number(find[1]));
    // this.setState({ album });
  }

  render() {
    const { album } = this.state;
    return (
      <div data-testid="page-album">
        <h2>Album</h2>
        <Header />
        <section className="album-view">
          <img src={ album.artworkUrl100 } alt={ album.collectionName } />
          <p>{ album.collectionName }</p>
          <p>{ album.artistName }</p>
          <Link
            to="/search"
          >
            Voltar
          </Link>
        </section>
      </div>
    );
  }
}

// Album.propTypes = {
//   match: PropTypes.objectOf(Object).isRequired,
// };

export default Album;
