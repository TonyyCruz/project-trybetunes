import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../pages/style.css';

class MusicCard extends Component {
  render() {
    const { musicName, previewUrl, favorite, trackId } = this.props;
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
            onChange={ favorite }
          />
        </label>

      </div>

    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  favorite: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
