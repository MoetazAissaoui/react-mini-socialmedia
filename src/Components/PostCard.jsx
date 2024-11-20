import React, { useState } from 'react';
import { FaHeart, FaRegHeart, FaComment, FaTrash } from 'react-icons/fa';
import Comments from './Comments';

const PostCard = ({ post, user, onUpdatePost, onDeletePost, onLikePost, onAddComment }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-lg shadow-lg mb-6 p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>
        {post.authorId === user?.id && (
          <button
            className="text-red-600 hover:text-red-800 transition duration-200"
            onClick={() => onDeletePost(post.id)}
          >
            <FaTrash />
          </button>
        )}
      </div>
      <p className="text-gray-700 mb-4">{post.content}</p>
      <div className="flex items-center justify-between space-x-4">
        <button
          className="flex items-center text-gray-600 hover:text-red-600 transition duration-200"
          onClick={() => onLikePost(post.id)}
        >
          {post.likes.includes(user.id) ? <FaHeart className="text-red-600" /> : <FaRegHeart />}
          <span className="ml-2">{post.likes.length}</span>
        </button>
        <button
          className="flex items-center text-gray-600 hover:text-blue-600 transition duration-200"
          onClick={() => setExpanded(!expanded)}
        >
          <FaComment />
          <span className="ml-2">{post.comments.length}</span>
        </button>
      </div>
      {expanded && (
        <div className="mt-4">
          <Comments comments={post.comments} postId={post.id} onAddComment={onAddComment} />
        </div>
      )}
    </div>
  );
};

export default PostCard;
