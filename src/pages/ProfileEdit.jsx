import React, { Component } from 'react';
import PropTipes from 'prop-types';
import Load from './Load';
import { getUser, updateUser } from '../services/userAPI';
import CreateInput from '../components/CreateInput';
import CreateTextarea from '../components/CreateTextarea';
import './style.css';
import CreateImage from '../components/CreateImage';
import CreateButton from '../components/CreateButton';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      btnDisable: true,
      userName: '',
      userEmail: '',
      userImage: '',
      userDescription: '',
    };
  }

  async componentDidMount() {
    const userInfo = await getUser();
    this.setState({ userName: userInfo.name });
    this.setState({ userEmail: userInfo.email });
    this.setState({ userImage: userInfo.image });
    this.setState({ userDescription: userInfo.description });
    this.setState({ isLoading: false });
  }

  EditState = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      const { userName, userEmail, userImage, userDescription } = this.state;
      const data = [userName, userEmail, userImage, userDescription];
      const lengthChk = data.every((d) => d.length > 2);
      const emailChk = userEmail.includes('@');
      const buttonActive = lengthChk && emailChk;
      this.setState({ btnDisable: !buttonActive });
    });
  }

  EditBtn = async () => {
    const { userName, userEmail, userImage, userDescription } = this.state;
    const { history } = this.props;
    this.setState({ isLoading: true });

    const userAtt = {
      name: userName,
      email: userEmail,
      image: userImage,
      description: userDescription,
    };

    await updateUser(userAtt);
    history.push('/profile');
  }

  render() {
    const { isLoading, userName, userEmail, userImage, userDescription,
      btnDisable } = this.state;
    return (
      isLoading ? (<Load />
      ) : (
        <div data-testid="page-profile-edit">
          <h2>ProfileEdit</h2>

          <form className="edite-profile">
            <CreateInput
              name="userName"
              type="text"
              description="Nome"
              funct={ this.EditState }
              test="edit-input-name"
              value={ userName }
            />

            <CreateInput
              name="userEmail"
              type="email"
              description="E-Mail"
              funct={ this.EditState }
              test="edit-input-email"
              value={ userEmail }
            />

            <CreateTextarea
              name="userDescription"
              description="Descrição"
              funct={ this.EditState }
              test="edit-input-description"
              value={ userDescription }
            />

            <CreateImage
              name="userImage"
              type="text"
              description="Imagem"
              funct={ this.EditState }
              test="edit-input-image"
              value={ userImage }
            />

            <CreateButton
              name="btnEdite"
              description="Editar"
              funct={ this.EditBtn }
              test="edit-button-save"
              btnDisable={ btnDisable }
            />

          </form>

        </div>
      )
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTipes.objectOf(Object).isRequired,
};

export default ProfileEdit;
