import React from 'react';
import { auth, googleAuth } from './firebase';

class Auth extends React.Component {
  state = {
    email: null,
  };

  async login() {
    try {
      const response = await auth.signInWithPopup(googleAuth);
      console.log('response: ', response);
    } catch (err) {
      console.log('err: ', err);
    }
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
