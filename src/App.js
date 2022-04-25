import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ProfileEdit from './pages/ProfileEdit';
import Header from './components/Header';

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes!</p>
        <BrowserRouter>
          <Header />
          <Switch>

            <Route exact path="/" component={ Login } />
            <Route path="/search" component={ Search } />
            <Route exact path="/profile" component={ Profile } />
            <Route path="/favorites" component={ Favorites } />
            <Route path="/profile/edit" component={ ProfileEdit } />

            <Route
              path="/album/:id"
              render={ (props) => <Album { ...props } /> }
            />

            <Route path="*" component={ NotFound } />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
