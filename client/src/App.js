import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';

import './App.css';
import Posts from './Posts';

function App() {
  const [users, setUsers] = useState([])
  const [newName, setNewName] = useState({
    name : ''
  })

  const getUsers = () => {
    axios.get(`http://localhost:9000/api/users`)
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getUsers()
  }, [])

  const handleChange = event => {
    setNewName({
      ...newName,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    axios.post(`http://localhost:9000/api/users`, newName)
      .then(res => {
        console.log(res)
        getUsers()
      })
      .catch(err => console.log(err))
      setNewName({name: ''})
  }

  return (
    <div className="App">
      <Route exact path="/">
        <h1>Lord of the Rings Chat</h1>
        <form onSubmit={handleSubmit}>
          <input
          type="text"
          value={newName.name}
          onChange={handleChange}
          name="name"
          />
          <button>Add</button>
        </form>
        {users.map(user => (
          <div key={user.id}>
            <Link to={`/${user.id}`}>
              <h2>{user.name}</h2>
            </Link>
          </div>
        ))}
      </Route>
      <Route exact path={`/:id`} component={Posts}/>
    </div>
  );
}

export default App;
