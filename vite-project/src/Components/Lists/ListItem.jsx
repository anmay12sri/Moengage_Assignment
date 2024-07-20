import React from 'react';

const ListItem = ({ list, onSelect, onDelete }) => {
  return (
    <div className="p-4 border rounded mb-2">
      <h2 className="text-lg font-bold">{list.name}</h2>
      <button
        onClick={() => onSelect(list.name)}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        View
      </button>
      <button
        onClick={() => onDelete(list.name)}
        className="mt-2 ml-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};

export default ListItem;
