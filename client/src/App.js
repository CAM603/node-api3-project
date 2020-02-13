import React, { useState, useEffect} from 'react';
import axios from 'axios';

import './App.css';

function App() {

  const getUsers = () => {
    axios.get(`http://localhost:9000/api/users`)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUsers()
  })

  return (
    <div className="App">
      <h1>Lord of the Rings Chat</h1>
    </div>
  );
}

export default App;
