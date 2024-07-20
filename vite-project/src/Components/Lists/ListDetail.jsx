import React from 'react';

function ListDetail({ list, onEdit, onDeleteCode }) {
  return (
    <div className="p-4 border rounded shadow-sm">
      <h2 className="text-xl mb-4">{list.name}</h2>
      <ul className="space-y-2">
        {list.codes.map(code => (
          <li key={code} className="flex justify-between items-center">
            <span>{code}</span>
            <button onClick={() => onDeleteCode(code)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={onEdit} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Edit</button>
    </div>
  );
}

export default ListDetail;
