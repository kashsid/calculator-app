import React, { Component } from 'react';
import Calculator from '../Calculator/Calculator';
import './App.css';

//basic set up to call the calculator component and give the page a header
const App = () => (
  <div className="App">
    <header>
      <h1>Code Challenge Calculator</h1>
    </header>
    <Calculator />
  </div>
);

export default App;
