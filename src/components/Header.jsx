import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Load from '../pages/Load';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      loggedUser: '',
    };
  }

  async componentDidMount() {
    // const {} = this.state;
    const user = await getUser();
    this.setState({ loggedUser: user });
  }

  render() {
    const { loggedUser } = this.state;
    return (
      !loggedUser ? (<Load />
      ) : (
        <header data-testid="header-component">
          <h3 data-testid="header-user-name">{ loggedUser.name }</h3>
          <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favoritas</Link>
          <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
        </header>
      )
    );
  }
}

export default Header;
