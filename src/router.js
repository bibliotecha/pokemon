import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import App from './App';
import LoginPage from './LoginPage';
import Auth from './Auth';
import SignupPage from './SignupPage';
import { auth, googleAuth, twitterAuth } from './firebase';

class Router extends React.Component {
  state = {
    email: null,
  };
  render() {
    const googleLogin = async () => {
      try {
        const response = await auth.signInWithPopup(twitterAuth);
        console.log(response.user.email); // kenichikona@gmail.com

        this.setState({
          email: response.user.email,
        });
      } catch (err) {
        console.log('err: ', err);
      }
    };

    // const displayPage = () => {
    //   if (loggedIn === true) {
    //     return <Redirect to="/zukan" />;
    //   }
    //   return <Auth email={this.state.email} hello={login} />;
    // };

    const loggedIn = this.state.email;

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginPage />
            <div>
              <Link to="/signup">新規会員登録</Link>
            </div>
          </Route>
          <Route path="/signup">
            <SignupPage />
            <div>
              <Link to="/login">ログインページへ</Link>
            </div>
          </Route>
          <Route path="/zukan">
            <App />
          </Route>
          <Route path="/auth">
            {/* {displayPage()} */}
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
