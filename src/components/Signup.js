import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Signup(props) {

  const [credentials, SetCredentials] = useState({'email' : '', 'password' : '', 'name' : '', 'cpassword' : ''})
  let history = useNavigate() ;

  const handleSubmit = async (e) => { 

    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Password do not match", "danger")
      return ;
    }

    e.preventDefault() ;
    const url = 'http://127.0.0.1:7789/api/auth/createuser'
    let reqdata = {'email' : credentials.email, 'password' : credentials.password, 'name' : credentials.name}
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
      props.showAlert("Account created successfully", "success")

    } else {
      props.showAlert("Invalid Credentials || Please try again", "danger")
    }
  }

  const onChange = (e) => {
    SetCredentials({...credentials, [e.target.name]: e.target.value})

  }

  return (
    <div className='container'>
      <form>
      <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={onChange} name="password" value={credentials.password} />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword" onChange={onChange} name="cpassword" value={credentials.cpassword} />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          </form>
    </div>
  )
}

export default Signup