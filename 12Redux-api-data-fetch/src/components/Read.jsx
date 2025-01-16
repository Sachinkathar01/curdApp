import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showUsersData } from '../fetures/usersDetails';
import ReadCard from './ReadCard';

function Read() {
  const dispatch = useDispatch();
  const { users, loading, error, searchTerm } = useSelector(state => state.app);

  useEffect(() => {
    dispatch(showUsersData());
  }, [dispatch]);

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const searchTermLower = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTermLower) ||
      user.email.toLowerCase().includes(searchTermLower)
    );
  });

  return (
    <div>
      {loading && <p className='text-center'>Loading...</p>}
      {error && <p>Error: {error}</p>}
      
      <ul>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <li key={user.id}>
              <ReadCard data={user} />
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500">
            {searchTerm ? 'No matching results found' : 'No users available'}
          </p>
        )}
      </ul>
    </div>
  );
}

export default Read;
