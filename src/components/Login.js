import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Login() {

  const [credentials, SetCredentials] = useState({'email' : '', 'password' : ''})
  let history = useNavigate() ;

  const handleSubmit = async (e) => {
    
    e.preventDefault() ;
    const url = 'http://127.0.0.1:7789/api/auth/login'
    let reqdata = {'email' : credentials.email, 'password' : credentials.password}
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqdata) 
    });
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      localStorage.setItem('token', json.authToken)
      history("/");

    } else {
      alert("Invalid Credentials || Please try again")
    }
  }

  const onChange = (e) => {
    SetCredentials({...credentials, [e.target.name]: e.target.value})

  }

  return (
    <div className='container'>
    <form>
  <div className="form-group my-5">
    <label htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" style={{width: "30rem"}} value={credentials.email} onChange={onChange}  />
  </div>
  <div className="form-group my-5">
    <label htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" name='password' placeholder="Password" style={{width: "30rem"}} value={credentials.password} onChange={onChange} />
  </div>
  <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
</form>
    </div>
  )
}

export default Login