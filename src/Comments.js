import React, { useEffect, useState } from 'react';
import { firestore } from './firebase';

class CommentsPage extends React.Component {
  state = {
    comments: [],
    title: '',
    content: '',
    selected: null,
  };

  componentDidMount() {
    this.readCommentsRealTime(); // またはthis.readComments()
  }

  createComment = () => {
    firestore.collection('comments').add({
      title: this.state.title,
      content: this.state.content,
    });
  };

  readComments = () => {
    firestore
      .collection('comments')
      .get()
      .then((snapshots) => {
        const data = [];
        snapshots.forEach((snapshot) =>
          data.push({ id: snapshot.id, ...snapshot.data() })
        );

        this.setState({ comments: data });
      });
  };

  readCommentsRealTime = () => {
    firestore.collection('comments').onSnapshot((snapshots) => {
      const data = [];
      snapshots.forEach((snapshot) =>
        data.push({ id: snapshot.id, ...snapshot.data() })
      );

      this.setState({ comments: data });
    });
  };

  deleteComment = () => {
    if (this.state.selected) {
      firestore.collection('comments').doc(this.state.selected.id).delete();
    }
  };

  updateComment = () => {
    if (this.state.selected) {
      firestore.collection('comments').doc(this.state.selected.id).update({
        title: this.state.title,
        content: this.state.content,
      });
    }
  };

  selectComment = (comment) => {
    if (!this.state.selected) {
      this.setState({ selected: comment });
    } else {
      if (this.state.selected.id === comment.id) {
        this.setState({ selected: null });
      } else {
        this.setState({ selected: comment });
      }
    }
  };

  render() {
    return (
      <div className="h-screen w-screen p-8">
        <div className="mb-24 flex justify-between">
          <div>
            <div className="mb-5">
              <h1>何かコメントを残してみましょう</h1>
            </div>
            <div className="mb-5">
              <label htmlFor="title">タイトル</label>
              <div className="border-bottom border-gray-300 mb-5">
                <input
                  id="title"
                  type="text"
                  style={{ width: 500 }}
                  className="outline-none bg-transparent p-3 text-lg border-b focus:border-gray-400 transition duration-200"
                  value={this.comment}
                  onChange={(e) => this.setState({ title: e.target.value })}
                />
              </div>
            </div>
            <div className="mb-5">
              <label htmlFor="content">内容</label>
              <div className="border-bottom border-gray-300 mb-5">
                <input
                  id="content"
                  type="text"
                  style={{ width: 500 }}
                  className="outline-none bg-transparent p-3 text-lg border-b focus:border-gray-400 transition duration-200"
                  value={this.comment}
                  onChange={(e) => this.setState({ content: e.target.value })}
                />
              </div>
            </div>
            <div>
              <button
                className="bg-red-400 p-3 rounded-lg text-white font-bold"
                onClick={this.createComment}
              >
                コメントする
              </button>
            </div>
          </div>
          <div style={{ maxWidth: 300 }} className="w-full">
            <button
              className="mb-5 py-6 w-full block bg-green-500 rounded-lg text-white font-bold"
              onClick={this.updateComment}
            >
              更新する
            </button>
            <button
              className="mb-5 py-6 w-full block bg-yellow-500 rounded-lg text-white font-bold"
              onClick={this.deleteComment}
            >
              削除する
            </button>
          </div>
        </div>
        <div className="flex flex-wrap">
          {this.state.comments.length > 0
            ? this.state.comments.map((comment, index) => {
                return (
                  <button
                    onClick={() => this.selectComment(comment)}
                    style={{ minWidth: 150 }}
                    className={`text-left p-5 shadow-lg rounded-lg mr-4 border-2 ${
                      this.state.selected &&
                      this.state.selected.id === comment.id
                        ? 'border-blue-400'
                        : 'border-transparent'
                    }`}
                    key={index}
                  >
                    <div className="mb-3">
                      <h3 className="text-lg">{comment.title}</h3>
                    </div>
                    <div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </button>
                );
              })
            : null}
        </div>
      </div>
    );
  }
}

export default CommentsPage;
