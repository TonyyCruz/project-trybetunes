import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from '../pages/Load';
import '../pages/style.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loggedUser: '',
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ loggedUser: user });
  }

  render() {
    const { loggedUser } = this.state;
    return (
      <header data-testid="header-component">
        {!loggedUser ? (<Load />
        ) : (
          <h3 data-testid="header-user-name">{ loggedUser.name }</h3>
        )}

        <nav>
          <Link
            className="link"
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisar
          </Link>

          <Link
            className="link"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritas
          </Link>

          <Link
            className="link"
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </Link>
        </nav>

      </header>
    );
  }
}

export default Header;
