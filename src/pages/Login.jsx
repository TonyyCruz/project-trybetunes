import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Load from './Load';
import { createUser } from '../services/userAPI';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loginButtonDisable: true,
      isLoading: false,
    };
  }

  ChangeState = ({ target }) => {
    const three = 3;
    const { value, name } = target;
    if (name === 'userName') { this.setState({ userName: value }); }
    const btnCheck = value.length < three;
    this.setState({ loginButtonDisable: btnCheck });
  }

  logIn = async () => {
    const { userName } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });
    await createUser({ name: userName });
    this.setState({ isLoading: false });
    history.push('/search');
  }

  render() {
    const { loginButtonDisable, userName, isLoading } = this.state;
    return (

      isLoading ? (
        <Load />
      ) : (

        <div data-testid="page-login">
          <h1>Login</h1>
          <form action="">

            <input
              type="text"
              data-testid="login-name-input"
              value={ userName }
              name="userName"
              onChange={ this.ChangeState }
              placeholder="Nome do Usuario"
            />
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ loginButtonDisable }
              onClick={ this.logIn }
            >
              Entrar
            </button>

          </form>
        </div>
      )

    );
  }
}

Login.propTypes = {
  history: PropTypes.objectOf(Object).isRequired,
};

export default Login;
