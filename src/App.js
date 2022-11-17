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

function App() {
  return (
    <>
    <NoteState>
    <Router>
    <Navbar />
    <div className='container'>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/about" element={<About />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/signup" element={<Signup />} />
    </Routes>
    </div>
    </Router>
    </NoteState>
    </>

  );
}

export default App;
