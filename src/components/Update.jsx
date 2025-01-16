import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { updateUser } from '../fetures/usersDetails';

function Update() {
  const { id } = useParams();
  const { users } = useSelector((state) => state.app);  // Retrieve users from the store
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Find the user to be updated based on the URL parameter
  const selectedUser = users.find((user) => user.id === id);

  console.log("Selected user:", selectedUser);

  // Local state for form inputs
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: ''
  });

  useEffect(() => {
    if (selectedUser) {
      setUserData({
        name: selectedUser.name,
        email: selectedUser.email,
        phone: selectedUser.phone,
        gender: selectedUser.gender
      });
    }
  }, [selectedUser]);

  const handleEditChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser({ 
      id: id,
      ...userData 
    })).then((result) => {
      if (!result.error) {
        navigate('/'); // Redirect to home page after successful update
      }
    });
  };

  if (!selectedUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleEditSubmit} className="bg-white p-6 rounded shadow-lg space-y-4 w-96">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleEditChange}
            value={userData.name}  
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleEditChange}
            value={userData.email} 
          />
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Enter your phone number"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleEditChange}
            value={userData.phone}  
          />
        </div>

        {/* Gender Field */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                className="mr-2"
                onChange={handleEditChange}
                checked={userData.gender === 'male'}  
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                className="mr-2"
                onChange={handleEditChange}
                checked={userData.gender === 'female'}  
              />
              Female
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;
