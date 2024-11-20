import React, { useState } from 'react';

const Comments = ({ postId, comments = [], onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(postId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="mt-3">
      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-3 flex items-center gap-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Comment
        </button>
      </form>

      {/* Comments List */}
      <div className="comments-list space-y-4">
        {comments.map((comment, index) => (
          <div
            key={index}
            className="comment border-b pb-4"
          >
            <div className="flex items-center mb-2">
              {comment.authorPhoto ? (
                <img
                  src={comment.authorPhoto}
                  alt={comment.authorName}
                  className="rounded-full w-6 h-6 object-cover mr-2"
                />
              ) : (
                <div
                  className="rounded-full bg-gray-500 text-white flex items-center justify-center w-6 h-6 mr-2"
                >
                  <span className="text-sm">
                    {comment.authorName.charAt(0)}
                  </span>
                </div>
              )}
              <strong className="mr-2">{comment.authorName}</strong>
              <small className="text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </small>
            </div>
            <p className="ml-8 text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
