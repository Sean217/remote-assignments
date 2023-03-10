import './App.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast } from "react-toastify";

const hostname = 'http://46.51.243.131'
function App() {

  const [info, setInfo] = useState('');

  const handleSubmit = (name, email, password) => {
    console.log(name, email, password);
    const date = Date()
    console.log(date);
    axios.post(`${hostname}/api/users` ,{
      "name": name,
      "email": email,
      "password": password,
    }, {headers: {
      "Request-Date": date
    }})
  .then(res => {
    console.log(res);
    const {email, id, name} = res.data.data.user;
    setInfo(`{"id": ${id}, "name": ${name}, "email": ${email}}`);
  })
  .catch( (error) => {
      if (error.response)
          toast.error(error.response.data.error);
      else toast.error(error);
  })
  }

  return (
    <div className="App">
      <div className="inputBox">
        <div className='box'>
        <div className="input">
          <p className='text'>name: </p>
          <input id="name" type="text"></input>
        </div>
        <div className="input">
          <p className='text'>email: </p>
          <input id="email" type="text"></input>
        </div>
        <div className="input">
          <p className='text'>password: </p>
          <input id="password" type="password"></input>
        </div>
        <button id="signup" onClick={() => handleSubmit(
          document.getElementById('name').value,
          document.getElementById('email').value,
          document.getElementById('password').value
        )}>Signup</button>
        </div>
        <div className='info'>{info}</div>
      </div>
    </div>
  );
}

export default App;
