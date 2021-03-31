import React from 'react';

class Auth extends React.Component {
  render() {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <button
          className="bg-blue-500 text-white p-5 rounded"
          onClick={this.props.hello}
        >
          ログイン
        </button>
      </div>
    );
  }
}

export default Auth;
