import React from 'react';
import { firestore } from './firebase';

class Home extends React.Component {
  state = {
    documents: [],
    inputValue1: '',
    inputValue2: '',
  };

  // データを取り出す
  getData = () => {
    let result = [];
    firestore
      .collection('users')
      .get()
      .then((snapshots) => {
        // [] for (let i = 0;)
        snapshots.forEach((snapshot) => {
          // resultの配列に抽出したデータを詰め込みたい
          const document = snapshot.data(); // documentのなかみ　{"firstname": "Ken", ...etc}
          result.push(document);
        });
        // resultの中にはドキュメントの情報が含まれている
        this.setState({ documents: result });
      });
  };

  // データを一つだけ取り出す
  getOneData = () => {
    firestore
      .collection('users')
      .doc('EnDdwHIvTgJsywqmh8xc')
      .get()
      .then((snapshot) => {
        const document = snapshot.data();
        console.log('getOneData document', document);
      });
  };

  // データを追加する
  addData = () => {
    firestore.collection('users').add({
      firstname: this.state.inputValue1,
      lastname: this.state.inputValue2,
    });
    alert('データを追加しました');
  };

  render() {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <div>
          {this.state.documents.map((document) => (
            <div>
              <h1>
                {document.firstname} {document.lastname}
              </h1>
            </div>
          ))}
        </div>
        <button className="p-3 bg-green-500 rounded" onClick={this.getData}>
          クリック
        </button>

        <div className="flex">
          <div className="border">
            <input
              value={this.state.inputValue1}
              onChange={(e) =>
                this.setState({ ...this.state, inputValue1: e.target.value })
              }
              placeholder="firstname"
            />
          </div>
          <div className="border">
            <input
              value={this.state.inputValue2}
              onChange={(e) =>
                this.setState({ ...this.state, inputValue2: e.target.value })
              }
              placeholder="lastname"
            />
          </div>
          <div>
            <button className="p-3 bg-blue-500 rounded" onClick={this.addData}>
              追加する
            </button>
          </div>
        </div>
        <div>
          <button
            className="p-3 bg-red-500 rounded text-white"
            onClick={this.getOneData}
          >
            get one
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
