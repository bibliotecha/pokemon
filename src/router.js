import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import LoginPage from './LoginPage';
import Auth from './Auth';
import SignupPage from './SignupPage';
import { auth, googleAuth } from './firebase';
import Home from './Home';
import CommentsPage from './Comments';

class Router extends React.Component {
  state = {
    email: null,
  };
  render() {
    const googleLogin = async () => {
      try {
        const response = await auth.signInWithPopup(googleAuth);
        console.log(response.user.email); // kenichikona@gmail.com

        this.setState({
          email: response.user.email,
        });
      } catch (err) {
        console.log('err: ', err);
      }
    };

    const loggedIn = this.state.email;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignupPage />
          </Route>
          <Route path="/zukan">
            {loggedIn ? (
              <Redirect to="/zukan" />
            ) : (
              <Auth email={this.state.email} hello={googleLogin} />
            )}
          </Route>
          <Route path="/auth">
            <Auth email={this.state.email} hello={googleLogin} />
          </Route>
          <Route path="/comments">
            <CommentsPage />
          </Route>
          {/* <Route path="/">
            {loggedIn ? (
              <Home />
            ) : (
              <Auth email={this.state.email} hello={googleLogin} />
            )}
          </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
