import React, { Component } from 'react';
import Load from './Load';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      favoriteMusics: '',
    };
  }

  async componentDidMount() {
    const favoriteMusics = await getFavoriteSongs();
    this.setState({
      favoriteMusics,
    }, () => this.setState({ isLoading: false }));
    console.log(favoriteMusics);
  }

  RemoveFavorite = async ({ target: { name } }) => {
    const { favoriteMusics } = this.state;
    this.setState({ isLoading: true });
    await removeSong({ trackId: name });

    const newFavorite = favoriteMusics.filter((msc) => (
      msc.trackId !== Number(name)));

    this.setState({
      favoriteMusics: newFavorite,
    }, () => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading, favoriteMusics } = this.state;

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
              myFavorites={ favoriteMusics }
            />
          ))
        )}
      </div>
    );
  }
}

export default Favorites;
