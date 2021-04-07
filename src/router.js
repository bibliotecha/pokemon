import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import App from './App';
import LoginPage from './LoginPage';
import Auth from './Auth';
import SignupPage from './SignupPage';
import { auth, googleAuth } from './firebase';

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
            <App />
          </Route>
          <Route path="/auth">
            {loggedIn ? (
              <Redirect to="/zukan" />
            ) : (
              <Auth email={this.state.email} hello={googleLogin} />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
