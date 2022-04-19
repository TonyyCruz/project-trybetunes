import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { createUser } from '../services/userAPI';

class Login extends Component {
  // UserUpdate = () => );

  render() {
    const { buttonDisabled, value, name, funct, btnFunct } = this.props;
    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        <form action="">

          <input
            type="text"
            data-testid="login-name-input"
            value={ value }
            name={ name }
            onChange={ funct }
          />
          <button
            type="button"
            data-testid="login-submit-button"
            disabled={ buttonDisabled }
            // onClick={ () => createUser({ name: value }) }
            onClick={ btnFunct }
          >
            Entrar
          </button>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  buttonDisabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  funct: PropTypes.func.isRequired,
  btnFunct: PropTypes.func.isRequired,
};

export default Login;
