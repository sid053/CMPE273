import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calculator from './component/calc';

class App extends Component {
  render() {
    return (
      <div className="App">
       
       <div id="wrapper">
    <Calculator/>
  </div>
      </div>
    );
  }
}

export default App;

