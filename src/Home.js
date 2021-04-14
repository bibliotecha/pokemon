import React from 'react';
import { firestore } from './firebase';

class Home extends React.Component {
  getData = () => {
    firestore
      .collection('users')
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
        } else {
          console.log('ドキュメントがありません');
        }
        // let user = []; //
        // data.forEach((doc) => {
        //   console.log('ユーザー単体', doc.data());
        // });
      });
  };

  render() {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <button className="p-3 bg-green-500 rounded" onClick={this.getData}>
          クリック
        </button>
      </div>
    );
  }
}

export default Home;
