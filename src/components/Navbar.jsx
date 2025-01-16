import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setSearchTerm } from '../fetures/usersDetails';

function Navbar() {
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

 

  const count = useSelector(state=>state.app.users)
  const naviagete = useNavigate();
  
  return (
    <header className="flex justify-between items-center p-4 bg-blue-400 text-white">
      {/* Logo */}
      <div className="flex items-center space-x-6">
        <h1 className="text-lg font-bold">Redux API Data Fetch</h1>

        {/* Navigation Options */}
        <div className="flex space-x-4">
          <h2 onClick={()=>naviagete("/")} className='cursor-pointer'>new post</h2>
           <h2 onClick={()=>naviagete("/read")} className='cursor-pointer'>All post({count.length})</h2>   
          
        </div>
      </div>

      {/* Input Field */}
      <div>
        <input
          type="text"
          placeholder="Search by name or email..."
          className="px-4 py-2 rounded text-black"
          onChange={handleSearch}
        />
      </div>

      
         
     
    </header>
  );
}

export default Navbar;
