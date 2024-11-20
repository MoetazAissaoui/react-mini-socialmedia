import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart, FaRegHeart, FaComment } from 'react-icons/fa';
import {
  fetchPostsStart,
  fetchPostsSuccess,
  fetchPostsFailure,
  updatePost as updatePostAction,
} from '../store/slices/postSlice';
import { getPosts, likePost, addComment as addCommentService } from '../Services/PostService';
import Comments from './Comments';

function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const [expandedPost, setExpandedPost] = React.useState(null);
  const [likingPosts, setLikingPosts] = React.useState(new Set());
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchPosts();
  }, [dispatch]);

  const fetchPosts = async () => {
    try {
      dispatch(fetchPostsStart());
      const allPosts = await getPosts();

      const filteredPosts = allPosts.filter(
        (post) =>
          currentUser?.following?.includes(post.userId) || post.userId === currentUser?.localId
      );

      console.log('Fetched followed posts:', filteredPosts);
      dispatch(fetchPostsSuccess(filteredPosts));
    } catch (error) {
      console.error('Error fetching posts:', error);
      dispatch(fetchPostsFailure('Failed to fetch posts'));
    }
  };

  const handleLikePost = async (postId) => {
    if (likingPosts.has(postId)) return;

    try {
      setLikingPosts((prev) => new Set([...prev, postId]));
      const updatedPost = await likePost(postId);
      dispatch(updatePostAction(updatedPost));
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setLikingPosts((prev) => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  };

  const handleAddComment = async (postId, commentText) => {
    try {
      const updatedPost = await addCommentService(postId, commentText);
      dispatch(updatePostAction(updatedPost));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container mx-auto mt-5 px-4">
      {loading ? (
        <div className="text-center">
          <div className="spinner-border animate-spin h-6 w-6 border-4 rounded-full border-blue-500 border-t-transparent" />
        </div>
      ) : (
        <div className="grid gap-6">
          {Array.isArray(posts) &&
            posts.map(
              (post) =>
                post && (
                  <div key={post?.id || Math.random()} className="bg-white shadow-md rounded-lg p-4">
                    {/* Post Header */}
                    <div className="flex items-center mb-3">
                      {post?.authorPhoto ? (
                        <img
                          src={post.authorPhoto}
                          alt={post.authorName || 'Anonymous'}
                          className="rounded-full w-10 h-10 object-cover mr-3"
                        />
                      ) : (
                        <div className="flex items-center justify-center rounded-full bg-gray-300 w-10 h-10 mr-3">
                          <span className="text-white font-bold">
                            {(post.authorName || 'A')[0]}
                          </span>
                        </div>
                      )}
                      <div>
                        <h6 className="font-semibold">{post.authorName || 'Anonymous'}</h6>
                        <small className="text-gray-500">
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString()
                            : 'Unknown date'}
                        </small>
                      </div>
                    </div>

                    {/* Post Content */}
                    <h5 className="text-lg font-bold mb-2">{post.title || 'Untitled'}</h5>
                    <p className="text-gray-700 mb-4">{post.content || 'No content'}</p>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between">
                      <button
                        className={`flex items-center px-3 py-1 rounded ${
                          post.likes?.includes(currentUser?.localId)
                            ? 'text-red-500'
                            : 'text-gray-500'
                        }`}
                        onClick={() => handleLikePost(post.id)}
                        disabled={likingPosts.has(post.id)}
                      >
                        {likingPosts.has(post.id) ? (
                          <div className="spinner-border animate-spin h-4 w-4 border-2 rounded-full border-red-500 border-t-transparent mr-1" />
                        ) : post.likes?.includes(currentUser?.localId) ? (
                          <>
                            <FaHeart className="mr-2" /> {post.likes?.length || 0}
                          </>
                        ) : (
                          <>
                            <FaRegHeart className="mr-2" /> {post.likes?.length || 0}
                          </>
                        )}
                      </button>

                      <button
                        className="flex items-center px-3 py-1 rounded text-gray-500 hover:text-blue-500"
                        onClick={() =>
                          setExpandedPost(expandedPost === post.id ? null : post.id)
                        }
                      >
                        <FaComment className="mr-2" />
                        {post.comments?.length || 0}
                      </button>
                    </div>

                    {/* Comments Section */}
                    {expandedPost === post.id && (
                      <div className="mt-4">
                        <Comments
                          postId={post.id}
                          comments={post.comments || []}
                          onAddComment={handleAddComment}
                        />
                      </div>
                    )}
                  </div>
                )
            )}
        </div>
      )}
    </div>
  );
}

export default Home;
