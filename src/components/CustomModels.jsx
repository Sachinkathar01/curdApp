import React from 'react';

function CustomModal({ data, closeModel }) {
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
        closeModel();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      onClick={handleBackgroundClick}
    >
      <div className="bg-white p-6 rounded-lg w-80">
        <h1 className="text-2xl font-bold text-gray-800">{data.name}</h1>
        <p className="text-gray-500">{data.email}</p>
        <p className="text-gray-700">Phone: {data.phone}</p>
        
        <p className="text-gray-700">Gender: {data.gender}</p>
        <div className="mt-4">
          <button onClick={closeModel} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
