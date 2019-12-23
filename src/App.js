import React, {Component} from 'react';
import PostList from './posts/PostList';
import logo from './logo.svg';
import './App.css';
import search from './posts/SearchComponent';

class App extends Component {
  render() {
    return (
      <div className="App">
      {/* <form>
        <input type = "text"/>
      </form> */}
      <PostList/>
    </div>
    )
  }
}

export default App;