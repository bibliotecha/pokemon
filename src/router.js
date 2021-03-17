import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import App from './App';
import LoginPage from './LoginPage';
<<<<<<< HEAD
import Auth from './Auth';
=======
import SignupPage from './SignupPage';
>>>>>>> aaa19af624c3ef4e296fbd7b21fc682e5c15cd8e

class Router extends React.Component {
  render() {
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
            <Auth />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Router;
