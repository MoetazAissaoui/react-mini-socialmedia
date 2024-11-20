import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-semibold text-white hover:text-indigo-200 transition-colors duration-200">
          Mini Social Media React App - TEKUP
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden block text-white focus:outline-none"
          onClick={() => {
            const navMenu = document.getElementById('navbarNav');
            navMenu.classList.toggle('hidden');
          }}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div id="navbarNav" className="hidden lg:flex space-x-8">
          <ul className="flex items-center space-x-8">
            {user ? (
              <>
                <li>
                  <Link to="/profile" className="flex items-center text-white hover:text-indigo-200 transition-colors duration-200">
                    <img
                      src={user.photoUrl}
                      alt="Profile"
                      className="w-9 h-9 rounded-full object-cover mr-2 border-2 border-white shadow-sm"
                    />
                    <span className="font-medium">{user.firstName}</span>
                  </Link>
                </li>
                <li>
                  <Link to="/posts" className="text-white hover:text-indigo-200 flex items-center transition-colors duration-200">
                    <i className="bi bi-file-earmark-post mr-2"></i>
                    Posts
                  </Link>
                </li>
                <li>
                  <Link to="/users" className="text-white hover:text-indigo-200 flex items-center transition-colors duration-200">
                    <i className="bi bi-people-fill mr-2"></i>
                    Utilisateurs
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-white hover:text-red-400 flex items-center transition-colors duration-200"
                  >
                    <i className="bi bi-box-arrow-right mr-1"></i>
                    Déconnexion
                  </button>
                </li>
                <li>
                <Link to="/contact" className="text-white hover:text-blue-200">Contact Us</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="text-white hover:text-indigo-200 transition-colors duration-200">
                    Connexion
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-white hover:text-indigo-200 transition-colors duration-200">
                    Inscription
                  </Link>
                </li>
                <li>
                <Link to="/contact" className="text-white hover:text-blue-200">Contact Us</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
