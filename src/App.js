import axios from 'axios';
import React from 'react';

class App extends React.Component {
  state = {
    inputValue: '',
    data: null,
    error: '',
  };

  render() {
    console.log(this.state);
    // // class型のコンポーネントの時はconstはいらない
    const inputChange = (event) => {
      this.setState({
        inputValue: event.target.value,
      });
    };

    const search = async () => {
      // axios.getでリクエストが送られる
      try {
        const search =
          'https://pokeapi.co/api/v2/pokemon/' + this.state.inputValue;
        const response = await axios.get(search);
        const newData = response.data;

        // state を更新
        this.setState({
          data: newData,
        });
      } catch (error) {
        this.setState({
          error: 'ポケモンが存在しませんでした',
        });
        this.setState({
          data: null,
        });
      }
    };

    return (
      <div class="flex flex-col items-center">
        <div class="font-bold text-2xl text-gray-500 my-12">
          <h3>ポケモン図鑑</h3>
        </div>
        <div class="my-8 w-96">
          <div class="bg-blue-500 w-full">
            <input
              class="text-center w-full text-3xl p-3 border-b border-gray-100 outline-none font-sans text-gray-700"
              value={this.state.inputValue}
              onChange={(event) => inputChange(event)}
            />
          </div>
          <div class="my-8 flex justify-center">
            <button
              class={
                'mx-auto rounded-lg px-24 py-4 inline-block text-white font-bold bg-red-500'
              }
              onClick={search}
            >
              検索
            </button>
          </div>
        </div>
        <div>
          {this.state.data ? (
            <div>
              <div>体重：{this.state.data.weight}</div>
              <div>タイプ：{this.state.data.types[0].type.name}</div>
            </div>
          ) : (
            <div>{this.state.error}</div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
