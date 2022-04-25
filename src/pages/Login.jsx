import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Load from './Load';
import { createUser } from '../services/userAPI';
import './style.css';
import CreateInput from '../components/CreateInput';
import CreateTextarea from '../components/CreateTextarea';
import CreateImage from '../components/CreateImage';
import CreateButton from '../components/CreateButton';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
      loginButtonDisable: true,
      isLoading: false,
    };
  }

  ChangeState = ({ target }) => {
    const { value, name } = target;
    this.setState({ [name]: value }, () => {
      const { userName } = this.state;
      const buttonActive = userName.length > 2;
      this.setState({ loginButtonDisable: !buttonActive });
    });
  }

  logIn = async () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });

    const user = {
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    };

    await createUser(user);
    history.push('/search');
  }

  render() {
    const { loginButtonDisable, userName, userEmail, userImage,
      userDescription, isLoading } = this.state;
    return (

      isLoading ? (
        <Load />
      ) : (

        <div data-testid="page-login">
          <h1>Login</h1>
          <form action="">

            <CreateInput
              type="text"
              test="login-name-input"
              value={ userName }
              name="userName"
              funct={ this.ChangeState }
              description="Nome do Usuario"
            />

            <CreateInput
              name="userEmail"
              type="email"
              description="E-Mail"
              funct={ this.ChangeState }
              // test="edit-input-email"
              value={ userEmail }
            />

            <CreateTextarea
              name="userDescription"
              description="Descrição"
              funct={ this.ChangeState }
              // test="edit-input-description"
              value={ userDescription }
            />

            <CreateImage
              name="userImage"
              type="text"
              description="Imagem"
              funct={ this.ChangeState }
              // test="edit-input-image"
              value={ userImage }
            />

            <CreateButton
              name="btnLogin"
              description="Entrar"
              funct={ this.logIn }
              test="login-submit-button"
              btnDisable={ loginButtonDisable }
            />

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
