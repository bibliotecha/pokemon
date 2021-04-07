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
    // password: '',
    emailInput: '',
    passwordInput: '',
    error: '',
  };

  changeEmail = (event) => {
    this.setState({ emailInput: event.target.value });
  };

  changePassword = (event) => {
    this.setState({ passwordInput: event.target.value });
  };

  signup = () => {
    auth
      .createUserWithEmailAndPassword(
        this.state.emailInput,
        this.state.passwordInput
      )
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // user.email
        this.setState({
          email: user.email,
        });

        // ユーザーを別のページに飛ばしたい
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
        if (errorCode === 'auth/weak-password') {
          this.setState({
            error: 'パスワードが弱いです',
          });
        }
        // ..
      });
  };

  login = () => {
    auth
      .signInWithEmailAndPassword(
        this.state.emailInput,
        this.state.passwordInput
      )
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        this.setState({
          email: user.email,
        });
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message; // 'Password should be at least 6 characters'
        if (errorMessage === 'Password should be at least 6 characters') {
          this.setState({
            error: 'パスワードが６文字以上でないといけません！',
          });
        }

        console.log(errorCode, errorMessage);
      });
  };

  googleLogin = async () => {
    try {
      const response = await auth.signInWithPopup(googleAuth);
      console.log(response.user.email); // kenichikona@gmail.com

      this.setState({
        email: response.user.email,
      });
    } catch (error) {
      this.setState({ error: error.message });
    }
  };

  render() {
    const loggedIn = this.state.email;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            {loggedIn ? (
              <Redirect to="/zukan" />
            ) : (
              <LoginPage
                click={this.login}
                changeE={this.changeEmail}
                changeP={this.changePassword}
              />
            )}
          </Route>
          <Route path="/signup">
            {loggedIn ? (
              <Redirect to="/zukan" />
            ) : (
              <SignupPage
                click={this.signup}
                changeE={this.changeEmail}
                changeP={this.changePassword}
                signupErr={this.state.error}
              />
            )}
          </Route>
          <Route path="/zukan">
            <App />
          </Route>
          <Route path="/auth">
            {loggedIn ? (
              <Redirect to="/zukan" />
            ) : (
              <Auth email={this.state.email} hello={this.googleLogin} />
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
