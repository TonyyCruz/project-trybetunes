import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ProfileEdit from './ProfileEdit';

class Profile extends Component {
  render() {
    return (
      <div data-testid="page-profile">
        <h2>Profile</h2>
        <Route path="/profile/edit" component={ ProfileEdit } />
      </div>
    );
  }
}

export default Profile;
