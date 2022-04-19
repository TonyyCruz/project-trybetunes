import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import { createUser } from './services/userAPI';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loginButtonDisable: true,
      isLogin: false,
    };
  }

  ChangeState = ({ target }) => {
    const three = 3;
    const { value, name } = target;
    if (name === 'userName') { this.setState({ userName: value }); }
    const btnCheck = value.length < three;
    this.setState({ loginButtonDisable: btnCheck });
  }

  User = () => {
    const { userName } = this.state;
    createUser({ name: userName });
    this.setState({ isLogin: true });
    // isLogin ? (<Redirect to="/search" />) : (<Login />);
  }

  //--------------------------------------------------------------------------------
  render() {
    const { loginButtonDisable, userName, isLogin } = this.state;
    return (
      <div>
        <p>TrybeTunes!</p>
        <BrowserRouter>
          <Switch>
            { isLogin && <Redirect to="/search" /> }
            <Route
              exact
              path="/"
              render={ () => (<Login
                buttonDisabled={ loginButtonDisable }
                value={ userName }
                funct={ this.ChangeState }
                name="userName"
                btnFunct={ this.User }
              />) }
            />

            <Route path="/search" component={ Search } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/profile" component={ Profile } />
            <Route path="/album/:id" render={ (props) => <Album { ...props } /> } />
            <Route path="/*" component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
