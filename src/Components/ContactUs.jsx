import React, { useState } from 'react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Simulate a request to send the form data (you can replace this with an actual API call)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen from-teal-400 to-blue-500 flex items-center justify-center">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Contactez-nous</h2>

        {error && (
          <div className="p-4 mb-4 text-sm text-red-800 bg-red-200 rounded-lg">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 mb-4 text-sm text-green-800 bg-green-200 rounded-lg">
            Votre message a été envoyé avec succès !
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-4 py-3 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              className="w-full px-4 py-3 mt-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-t-2 border-t-transparent rounded-full animate-spin mr-2"></div>
                Envoi...
              </div>
            ) : (
              'Envoyer'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
