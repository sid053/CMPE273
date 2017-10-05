import React, { Component } from 'react';
import './App.css';
import Calculator from './component/calc';

class App extends Component {
  render() {
    return (
      <div className="App">
       
       <div id="wrapper" center>
    <Calculator/>
  </div>
      </div>
    );
  }
}

export default App;

