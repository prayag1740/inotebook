import './App.css';
import Navbar from './components/Navbar';

import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import About from './components/About'


import NoteState from './context/notes/noteState';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import UserProfile from './components/UserProfile';



function App() {

  const [alert, setAlert] = useState(null);
  const [userProfile, setUserProfile] = useState({'name' : '' , 'email' : ''});

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 500) ; //alert remains only for 1.5 secs
  }


  return (
    <>
    <NoteState>
    <Router>
    <Navbar setUserProfile={setUserProfile} />
    <Alert alert={alert}></Alert>
    <div className='container'>
    <Routes>
      <Route exact path="/" element={<Home showAlert={showAlert} />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login showAlert={showAlert} />} />
      <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />
      <Route exact path="/profile" element={<UserProfile userProfile={userProfile} setUserProfile={setUserProfile} />} />
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>

  );
}

export default App;
