import React, { createContext, useContext, useState, useEffect } from 'react';
import logo from './logo.svg';

import './App.scss';
import Quote from './features/quote/Quote';
import MyComponent from './features/test/AppTest';


function App() {

  return (
    <div className="vh-100 vw-100">
      <Quote />

    </div>
  );
}

export default App;
