import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../pages/style.css';

class MusicCard extends Component {
  FavoriteCheck = () => {
    const { myFavorites, trackId } = this.props;
    const isFavorite = myFavorites.some((music) => Number(music) === trackId);
    return isFavorite;
  }

  render() {
    const { musicName, previewUrl, favoriteAdd, trackId } = this.props;
    return (

      <div className="preview-box">

        <p>{ musicName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>

        <label htmlFor="favotire">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            name={ trackId }
            type="checkbox"
            onChange={ favoriteAdd }
            checked={ this.FavoriteCheck() }
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
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  favoriteAdd: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
  myFavorites: PropTypes.arrayOf(String),
};

export default MusicCard;
