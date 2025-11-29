import React from 'react';

const UserProfile = ({ user = {} }) => {
  const { name = 'John Doe', email = 'john@example.com', avatar = 'https://via.placeholder.com/150' } = user;

  return (
    <div className="max-w-sm mx-auto my-4 sm:my-10 md:my-20 rounded-lg shadow-lg bg-white">
      <div className="bg-gray-100 p-4 sm:p-6 md:p-8 rounded-t-lg">
        <div className="text-center">
          <img 
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-full mx-auto border-4 border-white"
            src={avatar} 
            alt={`${name}'s avatar`}
          />
        </div>
      </div>
      <div className="p-4 sm:p-6 md:p-8 text-center">
        <h2 className="text-lg sm:text-xl font-bold text-blue-800 my-4">{name}</h2>
        <p className="text-base text-gray-600 my-4">{email}</p>
        <div className="my-4">
          <button className="text-sm sm:text-base bg-blue-800 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-blue-900">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;