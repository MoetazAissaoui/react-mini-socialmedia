import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from './store';

import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import Posts from './Components/Posts';
import Comments from './Components/Comments';
import Navbar from './Components/Navbar'; // Update Navbar to use Tailwind classes
import Users from './Components/Users';
import Home from './Components/Home';
import ContactUs from './Components/ContactUs';

import './App.css'; // Remove this if unnecessary after Tailwind setup

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  useEffect(() => {
    document.body.className = darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900';
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar setDarkMode={setDarkMode} darkMode={darkMode} /> {/* Pass props for dark mode toggle */}
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/comments" element={<Comments />} />
              <Route path="/users" element={<Users />} />
              <Route path="/contact" element={<ContactUs />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
