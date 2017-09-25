import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SplitPane from 'react-split-pane';

class App extends Component {
  render() {
    return (
     
        <SplitPane split="vertical" minSize="50" defaultSize="100">
       <div></div>
       <div></div>
   </SplitPane>
       
    );
  }
}

export default App;
