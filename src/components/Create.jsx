import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../fetures/usersDetails';
import { useNavigate } from 'react-router-dom';

function Userinfo() {
    const [userInfo,setUserInfo] = useState({
        name:'',
        email:'',
        phone:'',
        gender:''
        
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handelChange=(e)=>{
        
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value

        })
    }

    const handelSubmit =(e)=>{
        e.preventDefault();
        dispatch(createUser(userInfo));
        console.log(userInfo);
        
        setUserInfo({
            name:'',
            email:'',
            phone:"",
            gender:""
        })

        navigate('/read')
    }

    
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-lg space-y-4 w-96" onSubmit={handelSubmit}>
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
            onChange={handelChange}
            value={userInfo.name}
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
            onChange={handelChange}
            value={userInfo.email}
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
            onChange={handelChange}
            value={userInfo.phone}
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
                onChange={handelChange}
                 
              />
              Male
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                className="mr-2"
                onChange={handelChange}
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
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Userinfo;
