import React, { useState } from 'react';
import CustomModels from './CustomModels';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../fetures/usersDetails';
import { useNavigate } from 'react-router-dom';
import Update from './Update';

function ReadCard({ data }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [view, setView] = useState(false);
  const [edit, setEdit] = useState(false);

  const handelViewClick = () => {
    setView(true);
  };

  const closeModel = () => {
    setView(false);
    setEdit(false);
  };

  const handelDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handelEditClick = (id) => {
    console.log("Edit Click", id);
    setEdit(true); // Set edit to true to render Update component
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg px-4 py-3 flex items-center justify-between my-4">
        {/* User Info */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">{data.name}</h1>
            <p className="text-gray-500">{data.email}</p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-gray-600">Gender:</h2>
            <p className="text-gray-700">{data.gender}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
            onClick={() => handelEditClick(data.id)} // Clicking Edit sets edit to true
          >
            Edit
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md text-sm hover:bg-green-600 transition"
            onClick={handelViewClick} // Clicking View sets view to true
          >
            View
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition"
            onClick={() => handelDelete(data.id)} // Clicking Delete deletes the user
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modals for View/Edit */}
      {view && <CustomModels data={data} closeModel={closeModel} />}
        {edit && <Update data={data?.id} closeModel={closeModel} />}
    </div>
  );
}

export default ReadCard;
