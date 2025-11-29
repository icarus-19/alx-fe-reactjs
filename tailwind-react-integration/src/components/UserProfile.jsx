import React from 'react';

const UserProfile = ({ user = {} }) => {
  const { name = 'John Doe', email = 'john@example.com', avatar = 'https://via.placeholder.com/150' } = user;

  return (
    <div className="max-w-sm mx-auto my-20 bg-white rounded-lg shadow-lg">
      <div className="bg-gray-100 p-8 rounded-t-lg">
        <div className="text-center">
          <img 
            className="w-36 h-36 rounded-full mx-auto border-4 border-white"
            src={avatar} 
            alt={`${name}'s avatar`}
          />
        </div>
      </div>
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-blue-800 my-4">{name}</h2>
        <p className="text-gray-600 my-4">{email}</p>
        <div className="my-4">
          <button className="bg-blue-800 text-white px-6 py-2 rounded-lg hover:bg-blue-900">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;