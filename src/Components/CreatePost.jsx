import React, { useState } from 'react';

const CreatePost = ({ onCreatePost, loading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreatePost(title, content);
    setTitle('');
    setContent('');
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            placeholder="Post Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
