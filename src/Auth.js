import React from 'react';
import { auth, googleAuth } from './firebase';

class Auth extends React.Component {
  login() {
    // firebaseを使ってgoogleの認証を行う
  }

  render() {
    return (
      <div>
        <button onClick={this.login}>ログイン</button>
      </div>
    );
  }
}

export default Auth;
