import React from 'react';

const UserProfile = ({ user = {} }) => {
  const { 
    name = 'John Doe', 
    email = 'john@example.com', 
    avatar = 'https://via.placeholder.com/150',
    bio = 'Software developer passionate about creating amazing user experiences.'
  } = user;

  return (
    <div className="max-w-sm mx-auto my-20 rounded-lg shadow-lg bg-white">
      <div className="bg-gray-100 sm:p-4 p-8 rounded-t-lg">
        <div className="text-center">
          <img 
            className="w-36 h-36 rounded-full mx-auto border-4 border-white shadow-md"
            src={avatar} 
            alt={`${name}'s avatar`}
          />
        </div>
      </div>
      
      <div className="sm:p-4 p-8">
        <h2 className="text-xl font-bold text-blue-800 text-center mb-2">{name}</h2>
        <p className="text-base text-gray-600 text-center my-4">{email}</p>
        <p className="text-base text-gray-500 text-center mb-6">{bio}</p>
        
        <div className="flex justify-between space-x-4">
          <button className="text-base flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200">
            Message
          </button>
          <button className="text-base flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg transition duration-200">
            Follow
          </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex justify-between text-base text-gray-500">
            <span>Posts</span>
            <span className="font-medium text-gray-700">142</span>
          </div>
          <div className="flex justify-between text-base text-gray-500 mt-2">
            <span>Following</span>
            <span className="font-medium text-gray-700">356</span>
          </div>
          <div className="flex justify-between text-base text-gray-500 mt-2">
            <span>Followers</span>
            <span className="font-medium text-gray-700">1.2K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;