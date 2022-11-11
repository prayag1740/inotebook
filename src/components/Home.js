import React from 'react'

export default function Home() {
  return (
    <div>
    <div className='container my-3'>
    <h2>Add a note</h2>
    <form className='my-3'>
    <div className="mb-3">
    <label className='my-2' htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
   </div>
   <div className="form-group">
    <label htmlFor="exampleInputPassword1" className='my-2'>Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
   </div>
  <button type="submit" className="btn btn-primary my-3">Submit</button>
  </form>
  </div>
  <div className='container my-3'>
    <h2>Your notes</h2>
  </div>
    </div>
  )
}
