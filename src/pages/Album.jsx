import React, { Component } from 'react';
import Header from '../components/Header';

class Album extends Component {
  render() {
    return (
      <div data-testid="page-album">
        <h2>Album</h2>
        <Header />
      </div>
    );
  }
}

export default Album;
