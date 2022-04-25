import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from './Load';
import './style.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      userInfo: '',
    };
  }

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({ userInfo });
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading, userInfo } = this.state;
    return (
      isLoading ? (<Load />
      ) : (
        <div data-testid="page-profile">
          <h2>Profile</h2>

          <div className="profile">

            <img
              data-testid="profile-image"
              src={ userInfo.image }
              alt={ `Foto de ${userInfo.name}` }
            />
          </div>

          <div>
            <h3>Nome</h3>
            <p>{ userInfo.name }</p>
          </div>

          <div>
            <h3>E-Mail</h3>
            <p>{ userInfo.email }</p>
          </div>

          <div>
            <h3>Descrição</h3>
            <p>{ userInfo.description }</p>
          </div>

          <Link className="link" to="/profile/edit">Editar perfil</Link>

        </div>
      )
    );
  }
}

export default Profile;
