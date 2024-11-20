import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../Services/AuthServices';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5000000) { // 5MB limit
        setError("La photo ne doit pas dépasser 5MB");
        return;
      }
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      if (photo) {
        formData.append('photo', photo);
      }

      const response = await register(formData);
      navigate('/login');
    } catch (error) {
      if (error.message.includes('API key not valid')) {
        setError("Erreur de configuration. Veuillez contacter l'administrateur.");
      } else {
        switch (error.message) {
          case 'EMAIL_EXISTS':
            setError("Cette adresse email est déjà associée à un compte.");
            break;
          case 'INVALID_EMAIL':
            setError("L'adresse email n'est pas valide.");
            break;
          case 'OPERATION_NOT_ALLOWED':
            setError("La création de compte est désactivée.");
            break;
          case 'WEAK_PASSWORD':
            setError("Le mot de passe est trop faible.");
            break;
          default:
            setError(`Erreur lors de l'inscription: ${error.message}`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">S'inscrire</h2>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          {/* Photo Upload */}
          <div className="mb-6 text-center">
            <div className="relative inline-block">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Preview"
                  className="rounded-full w-24 h-24 object-cover mx-auto"
                />
              ) : (
                <div className="rounded-full w-24 h-24 bg-gray-200 flex items-center justify-center mx-auto">
                  <i className="bi bi-person-fill text-3xl text-gray-500"></i>
                </div>
              )}
              <label
                htmlFor="photo"
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition"
              >
                <i className="bi bi-camera-fill"></i>
              </label>
              <input
                type="file"
                id="photo"
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </div>
          </div>

          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="firstName" className="text-gray-700">Prénom</label>
              <input
                type="text"
                id="firstName"
                className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Prénom"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="text-gray-700">Nom</label>
              <input
                type="text"
                id="lastName"
                className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Nom"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Votre mot de passe"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="text-gray-700">Confirmer le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                Inscription en cours...
              </span>
            ) : (
              "S'inscrire"
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p className="text-gray-600">
            Déjà inscrit ?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Connectez-vous
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
