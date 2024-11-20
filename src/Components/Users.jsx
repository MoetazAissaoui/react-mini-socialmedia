import React, { useState, useEffect } from 'react';
import { getAllUsers, followUser, unfollowUser } from '../Services/AuthServices';
import { Link } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const usersData = await getAllUsers();
      
      const filteredUsers = usersData
        .filter(user => user.id !== currentUser?.localId)
        .map(user => ({
          ...user,
          isFollowing: currentUser?.following?.includes(user.id) || false
        }));
      
      setUsers(filteredUsers);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId) => {
    try {
      await followUser(userId);
      await fetchUsers(); // Refresh the list to update followers count
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUnfollow = async (userId) => {
    try {
      await unfollowUser(userId);
      await fetchUsers(); // Refresh the list to update followers count
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-5">
        <div className="alert alert-danger">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-5">
      <h2 className="text-3xl font-semibold mb-4">Utilisateurs</h2>
      {users.length === 0 ? (
        <div className="alert alert-info">Aucun utilisateur trouvé</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.map(user => (
            <div key={user.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4 flex items-center space-x-4">
                {user?.photoUrl ? (
                  <img
                    src={user.photoUrl}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center border-2 border-gray-200">
                    <i className="bi bi-person-fill text-white text-2xl"></i>
                  </div>
                )}
                <div>
                  <h5 className="font-semibold text-lg">
                    <p to={`/profile/${user.id}`} className="text-blue-600 hover:underline">
                      {user.displayName || `${user.firstName || ''} ${user.lastName || ''}`}
                    </p>
                  </h5>
                  <p className="text-sm text-gray-500">
                    {Array.isArray(user.followers) ? user.followers.length : 0} followers
                  </p>
                </div>
              </div>
              <div className="px-4 py-2">
                {user.isFollowing ? (
                  <button
                    className="w-full py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                    onClick={() => handleUnfollow(user.id)}
                  >
                    Ne plus suivre
                  </button>
                ) : (
                  <button
                    className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    onClick={() => handleFollow(user.id)}
                  >
                    Suivre
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;
