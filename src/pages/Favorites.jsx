import React, { Component } from 'react';
import Load from './Load';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favoriteMusicsId: '',
      favoriteMusics: '',
    };
  }

  async componentDidMount() {
    await this.FavoriteControl();
    this.setState({ isLoading: false });
  }

  FavoriteControl = async () => {
    const favoriteMusicsId = await getFavoriteSongs();

    // Promise.all espera um grupo de promisses.
    const favoriteMusics = await Promise.all(
      favoriteMusicsId.map(async (m) => {
        const music = await getMusics(m.trackId);
        return music[0];
      }),
    );

    this.setState({ favoriteMusicsId });
    this.setState({ favoriteMusics });
  }

  RemoveFavorite = ({ target: { name } }) => {
    this.setState({ isLoading: true });
    const { favoriteMusicsId, favoriteMusics } = this.state;

    const newFavoritId = favoriteMusicsId.filter((ids) => (
      ids.trackId !== name));
    const newFavoritMusics = favoriteMusics.filter((msc) => (
      msc.trackId !== name));

    this.setState({
      favoriteMusicsId: newFavoritId,
      favoriteMusics: newFavoritMusics,
    });
    removeSong({ trackId: name });
    this.FavoriteControl(); // não deveria precisar...
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, favoriteMusics, favoriteMusicsId } = this.state;

    return (
      <div data-testid="page-favorites">
        { isLoading ? (<Load />
        ) : (
          favoriteMusics.map((music, i) => (
            <MusicCard
              key={ i }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              favoriteFunction={ this.RemoveFavorite }
              trackId={ music.trackId }
              myFavorites={ favoriteMusicsId }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
