import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginWithEmailPassword } from '../Services/AuthServices';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await loginWithEmailPassword(email, password);
      navigate('/profile', { replace: true });
    } catch (error) {
      console.error('Login error:', error);
      setError(getErrorMessage(error.message));
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (errorCode) => {
    switch (errorCode) {
      case 'EMAIL_NOT_FOUND':
        return 'Aucun utilisateur trouvé avec cet email';
      case 'INVALID_PASSWORD':
        return 'Mot de passe incorrect';
      case 'USER_DISABLED':
        return 'Ce compte a été désactivé';
      default:
        return 'Une erreur est survenue lors de la connexion';
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Connexion</h2>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-200 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-3 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-3 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-t-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                Connexion en cours...
              </div>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Pas encore de compte ?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Inscrivez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
