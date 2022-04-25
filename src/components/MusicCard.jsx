import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../pages/style.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      isChecked: '',
    };
  }

  componentDidMount() {
    const check = this.FavoriteCheck();
    this.setState({ isChecked: check });
  }

  FavoriteCheck = () => {
    const { myFavorites, trackId } = this.props;

    const isFavorite = myFavorites.some((music) => Number(music.trackId) === trackId);
    return isFavorite;
  }

  render() {
    const { trackName, previewUrl, favoriteFunction, trackId } = this.props;
    const { isChecked } = this.state;

    return (

      <div className="preview-box">

        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

        <label htmlFor={ trackId }>
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            name={ trackId }
            type="checkbox"
            onChange={ favoriteFunction }
            checked={ isChecked }
          />
        </label>

      </div>

    );
  }
}

MusicCard.defaultProps = {
  myFavorites: [],
};

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  favoriteFunction: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  myFavorites: PropTypes.arrayOf(String),
};

export default MusicCard;
