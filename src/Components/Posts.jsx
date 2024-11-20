import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPost, getPosts, deletePost, likePost, updatePost, addComment } from '../Services/PostService';
import { fetchPostsStart, fetchPostsSuccess, fetchPostsFailure, addPost, updatePost as updatePostAction, deletePost as deletePostAction } from '../store/slices/postSlice';
import PostCard from './PostCard';
import CreatePost from './CreatePost';

const Posts = () => {
  const dispatch = useDispatch();
  const { posts = [], loading, error } = useSelector(state => state.posts);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      dispatch(fetchPostsStart());
      const postsData = await getPosts();
      dispatch(fetchPostsSuccess(postsData));
    } catch (error) {
      dispatch(fetchPostsFailure('Failed to fetch posts'));
    }
  };

  const handleCreatePost = async (title, content) => {
    try {
      const newPost = await createPost({ title, content });
      dispatch(addPost(newPost));
    } catch (error) {
      dispatch(fetchPostsFailure(error.message));
    }
  };

  const handleUpdatePost = async (postId, updatedData) => {
    try {
      const updatedPost = await updatePost(postId, updatedData);
      dispatch(updatePostAction(updatedPost));
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      dispatch(deletePostAction(postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      const updatedPost = await likePost(postId);
      dispatch(updatePostAction(updatedPost));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId, commentText) => {
    try {
      const updatedPost = await addComment(postId, commentText);
      dispatch(updatePostAction(updatedPost));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}
      <CreatePost onCreatePost={handleCreatePost} loading={loading} />
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              user={user}
              onUpdatePost={handleUpdatePost}
              onDeletePost={handleDeletePost}
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Posts;
