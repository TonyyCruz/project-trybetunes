import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';
import Header from '../components/Header';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <h2>Profile</h2>
        <Header />
        <Route path="/profile/edit" component={ ProfileEdit } />
      </div>
    );
  }
}

export default Profile;
