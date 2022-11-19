import React, { useEffect } from 'react'

function UserProfile(props) {

    const fetchUserDetails  = async () => {
      const  url = 'http://127.0.0.1:7789/api/auth/getUser'
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            'auth_token' : localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        props.setUserProfile({'name' : json.user.name , 'email' : json.user.email})
    }

useEffect(() => {
    fetchUserDetails()
}, []) ;
  return (
    <div className='container' style={{marginTop: "100px", marginLeft: "50px"}}>
        <h2>Name : {props.userProfile.name}</h2>
        <h2>Email : {props.userProfile.email}</h2> 
    </div>
  )
}

export default UserProfile